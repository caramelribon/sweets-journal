import firebase from 'firebase/app';

// eslint-disable-next-line
export const getRanking = async () => {
  const rankingData = [];
  await firebase.firestore()
    .collection('places')
    .orderBy('favorite_count', 'desc')
    .limit(3)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        if (!doc.data()) {
          return;
        }
        rankingData.push(doc.data());
      });
    });
  return rankingData;
};

export const getFavorite = async (userID) => {
  const favoriteData = [];
  const db = firebase.firestore();
  db
    .collection('favorites')
    .where('user_id', '==', userID)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        const placeId = doc.data().place_id;
        db.collection('places').doc(placeId).get()
          .then((info) => {
            if (!info.data()) {
              return;
            }
            favoriteData.push(info.data());
          });
      });
    });
  return favoriteData;
};

export const getBookmark = async (userID) => {
  const bookmarkData = [];
  const db = firebase.firestore();
  db
    .collection('bookmarks')
    .where('user_id', '==', userID)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        const placeId = doc.data().place_id;
        db.collection('places').doc(placeId).get()
          .then((info) => {
            if (!info.data()) {
              return;
            }
            bookmarkData.push(info.data());
          });
      });
    });
  return bookmarkData;
};

const getActivityDetailData = async (doc) => {
  const db = firebase.firestore();

  const userid = doc.data().user_id;
  const placeid = doc.data().place_id;
  const useraction = doc.data().action;

  const createtime = doc.data().create_at.toDate();
  const createdate = `${createtime.getFullYear()}/${createtime.getMonth() + 1}/${createtime.getDate()} ${createtime.getHours()}:${createtime.getMinutes()}:${createtime.getSeconds()}`;

  // 取得したuser_idからusernameを取得
  const userinfo = await db.collection('users').doc(userid).get();

  // 取得したplace_idからplaceの情報を取得
  const placeinfo = await db.collection('places').doc(placeid).get();

  if (!placeinfo.data() || !userinfo.data()) {
    return null;
  }

  return {
    action: useraction,
    createat: createdate,
    username: userinfo.data().username,
    placename: placeinfo.data().name,
    addS: placeinfo.data().add_short,
    photo1: placeinfo.data().photo_1,
    photo2: placeinfo.data().photo_2,
    photo3: placeinfo.data().photo_3,
    photo4: placeinfo.data().photo_4,
    photo5: placeinfo.data().photo_5,
    website: placeinfo.data().website,
    rating: placeinfo.data().all_rating,
    review1: placeinfo.data().review_1,
    review2: placeinfo.data().review_2,
    review3: placeinfo.data().review_3,
  };
};

export async function getActivity(limit, pagingToken) {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    let query = db.collection('activities').orderBy('create_at', 'desc').limit(limit);

    if (pagingToken !== null) {
      const [seconds, nanoseconds] = pagingToken.split(':');
      const timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
      query = query.startAfter(timestamp);
    }

    query.get()
      .then(async (snapshot) => {
        // limitよりも多い件数データがあるならnextTokenを作成しておく
        let nextToken = null;
        if (snapshot.docs.length >= limit) {
          const last = snapshot.docs[snapshot.docs.length - 1];
          const lastData = last.data();
          const time = lastData.create_at;
          nextToken = `${time.seconds}:${time.nanoseconds}`;
        }

        // これだとNG。foreachの引数は関数で非同期関数をこちらで呼び出して時間がかかっているにもかかわらず、先に、resolveを実行してしまう。
        // snapshot.forEach(async (doc) => {
        //   const info = await getActivityDetailData(doc);
        //   if (info) {
        //     infos.push(info);
        //     console.log('activity pushed');
        //   }
        // });

        // 複数の非同期を並列で投げて一気に待つ方法
        // https://runebook.dev/ja/docs/eslint/rules/no-await-in-loop
        const infoPromises = [];
        for (let i = 0; i < snapshot.docs.length; i += 1) {
          const doc = snapshot.docs[i];
          infoPromises.push(getActivityDetailData(doc));
        }
        // 全ての詳細データが取得するまで待つ
        const infos = await Promise.all(infoPromises);

        // console.log(infos, nextToken);
        resolve({ BuffData: infos, nextPageToken: nextToken });
      })
      .catch((err) => {
        console.log('エラーが発見されました：データ取得時', err);
        reject(new Error('firebaseからのデータ取得エラー'));
      });
  });
}
