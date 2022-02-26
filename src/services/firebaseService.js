import firebase from 'firebase/app';

// eslint-disable-next-line
export const getRankingFavorited = async () => {
  const dbPlace = firebase.firestore().collection('places');
  const rankingData = [];
  await dbPlace
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

export const getRankingMarked = async () => {
  const dbPlace = firebase.firestore().collection('places');
  const rankingData = [];
  await dbPlace
    .orderBy('bookmark_count', 'desc')
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

export const getFavorite = async (userId) => {
  const dbFav = firebase.firestore().collection('favorites');
  const dbPlace = firebase.firestore().collection('places');
  const favoriteData = [];
  await dbFav
    .where('user_id', '==', userId)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        const placeId = doc.data().place_id;
        dbPlace.doc(placeId).get()
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

export const getBookmark = async (userId) => {
  const dbBm = firebase.firestore().collection('bookmarks');
  const dbPlace = firebase.firestore().collection('places');
  const bookmarkData = [];
  await dbBm
    .where('user_id', '==', userId)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        const placeId = doc.data().place_id;
        dbPlace.doc(placeId).get()
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

export const getFavPlaceId = async (userId) => {
  const dbFav = firebase.firestore().collection('favorites');
  const favPlaceId = [];
  await dbFav
    .where('user_id', '==', userId)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        if (!doc.data()) {
          return;
        }
        favPlaceId.push(doc.data().place_id);
      });
    });
  return favPlaceId;
};

export const getBmPlaceId = async (userId) => {
  const dbBm = firebase.firestore().collection('bookmarks');
  const bmPlaceId = [];
  await dbBm
    .where('user_id', '==', userId)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        if (!doc.data()) {
          return;
        }
        bmPlaceId.push(doc.data().place_id);
      });
    });
  return bmPlaceId;
};

export const postFavActivity = async (placeId, userId) => {
  const dbAct = firebase.firestore().collection('activities');
  const dbActCount = firebase.firestore().collection('activityCount');
  // activitiesに登録
  dbAct.doc().set({
    user_id: userId,
    place_id: placeId,
    action: 'favorite',
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
  // activityCountを+1して更新
  dbActCount.doc('count').get().then((doc) => {
    const actCount = doc.data().activityCount + 1;
    dbActCount.doc('count').update({
      activityCount: actCount,
    });
  });
};

export const delFavorite = async (placeId, userId, userLikedPlaceId) => {
  const dbFav = firebase.firestore().collection('favorites');
  const dbPlace = firebase.firestore().collection('places');
  let userLikedPlaceIdRenew = '';
  // userLikedPlaceIdから削除する
  userLikedPlaceIdRenew = userLikedPlaceId.filter((id) => id !== placeId);
  // favoritesのコレクションから削除する
  await dbFav
    .where('user_id', '==', userId)
    .where('place_id', '==', placeId)
    .get()
    .then((snapShot) => {
      snapShot.forEach(async (doc) => {
        if (doc.exists) {
          // 見つけたdataを削除
          await doc.ref.delete();
          console.log('Cancel favorite!');
          // favorite_countを-1
          const docRef = dbPlace.doc(placeId).get();
          docRef.then((placeDoc) => {
            if (placeDoc.exists) {
              const favCount = placeDoc.data().favorite_count - 1;
              docRef.update({
                favorite_count: favCount,
              });
            }
          })
            .catch((error) => {
              console.log('Can not delete favorited place!', error);
            });
        } else {
          console.log('Not data!');
        }
      });
    });
  return userLikedPlaceIdRenew;
};

export const postBmActivity = async (placeId, userId) => {
  const dbAct = firebase.firestore().collection('activities');
  const dbActCount = firebase.firestore().collection('activityCount');
  // activitiesに登録
  dbAct.doc().set({
    user_id: userId,
    place_id: placeId,
    action: 'mark',
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
  // activityCountを+1して更新
  dbActCount.doc('count').get().then((doc) => {
    const actCount = doc.data().activityCount + 1;
    dbActCount.update({
      activityCount: actCount,
    });
  });
};

export const delBookmark = async (placeId, userId, userBookmarkPlaceId) => {
  const dbBm = firebase.firestore().collection('bookmarks');
  const dbPlace = firebase.firestore().collection('places');
  let userBookmarkPlaceIdRenew = '';
  // userBookmarkPlaceIdから削除する
  userBookmarkPlaceIdRenew = userBookmarkPlaceId.filter((id) => id !== placeId);
  // bookmarksのコレクションから削除する
  await dbBm
    .where('user_id', '==', userId)
    .where('place_id', '==', placeId)
    .get()
    .then((snapShot) => {
      snapShot.forEach(async (doc) => {
        if (doc.exists) {
          // 見つけたdataを削除
          await doc.ref.delete();
          console.log('Cancel bookmark!');
          // bookmark_countを-1
          const docRef = dbPlace.doc(placeId);
          docRef.get().then((placeDoc) => {
            if (placeDoc.exists) {
              const bmCount = doc.data().bookmark_count - 1;
              docRef.update({
                bookmark_count: bmCount,
              });
            }
          })
            .catch((error) => {
              console.log('Can not delete bookmarked place!', error);
            });
        } else {
          console.log('Not data!');
        }
      });
    });
  return userBookmarkPlaceIdRenew;
};

const getActivityDetailData = async (doc) => {
  const dbUser = firebase.firestore().collection('users');
  const dbPlace = firebase.firestore().collection('places');
  const userid = doc.data().user_id;
  const placeid = doc.data().place_id;
  const useraction = doc.data().action;

  const createtime = doc.data().create_at.toDate();
  const createdate = `${createtime.getFullYear()}/${createtime.getMonth() + 1}/${createtime.getDate()} ${createtime.getHours()}:${createtime.getMinutes()}:${createtime.getSeconds()}`;

  // 取得したuser_idからusernameを取得
  const userinfo = await dbUser.doc(userid).get();

  // 取得したplace_idからplaceの情報を取得
  const placeinfo = await dbPlace.doc(placeid).get();

  if (!placeinfo.data() || !userinfo.data()) {
    return null;
  }

  return {
    action: useraction,
    created_at: createdate,
    userName: userinfo.data().username,
    placeId: placeinfo.data().id,
    placeName: placeinfo.data().name,
    placeAdd: placeinfo.data().add_short,
    placePhoto: placeinfo.data().photo_1,
    placeWebsite: placeinfo.data().website,
    placeRating: placeinfo.data().all_rating,
    placeFavCount: placeinfo.data().favorite_count,
    placeBmCount: placeinfo.data().bookmark_count,
  };
};

export async function getActivity(limit, pagingToken) {
  const dbAct = firebase.firestore().collection('activities');
  return new Promise((resolve, reject) => {
    let query = dbAct.orderBy('create_at', 'desc').limit(limit);

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
