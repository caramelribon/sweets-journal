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
  const dbFav = firebase.firestore().collection('favorites').where('user_id', '==', userId);
  const dbPlace = firebase.firestore().collection('places');
  const favoriteData = [];
  await dbFav
    .orderBy('create_at', 'desc')
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
  const dbBm = firebase.firestore().collection('bookmarks').where('user_id', '==', userId);
  const dbPlace = firebase.firestore().collection('places');
  const bookmarkData = [];
  await dbBm
    .orderBy('create_at', 'desc')
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
  const dbAct = firebase.firestore().collection('activities').doc();
  const dbActCount = firebase.firestore().collection('activityCount').doc('count');
  // activitiesに登録
  await dbAct.set({
    user_id: userId,
    place_id: placeId,
    action: 'favorite',
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
  // activityCountを+1して更新
  await dbActCount.get().then((doc) => {
    const actCount = doc.data().activityCount + 1;
    dbActCount.update({
      activityCount: actCount,
    });
  });
};

export const delFavActivity = async (placeId, userId) => {
  const dbAct = firebase.firestore().collection('activities');
  const dbActCount = firebase.firestore().collection('activityCount').doc('count');
  // activityを削除
  await dbAct
    .where('user_id', '==', userId)
    .where('place_id', '==', placeId)
    .where('action', '==', 'favorite')
    .get()
    .then((snapShot) => {
      snapShot.forEach(async (doc) => {
        if (doc.exists) {
          await doc.ref.delete();
          console.log('Cancel activity of favorite!');
        } else {
          console.log('Not data!');
        }
      });
    });
  // activityCountを-1して更新
  await dbActCount.get().then((doc) => {
    const actCount = doc.data().activityCount - 1;
    dbActCount.update({
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
          const docRef = dbPlace.doc(placeId);
          docRef.get().then((placeDoc) => {
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
  await delFavActivity(placeId, userId);
  return userLikedPlaceIdRenew;
};

export const postBmActivity = async (placeId, userId) => {
  const dbAct = firebase.firestore().collection('activities').doc();
  const dbActCount = firebase.firestore().collection('activityCount').doc('count');
  // activitiesに登録
  await dbAct.set({
    user_id: userId,
    place_id: placeId,
    action: 'mark',
    create_at: firebase.firestore.FieldValue.serverTimestamp(),
  });
  // activityCountを+1して更新
  await dbActCount.get().then((doc) => {
    const actCount = doc.data().activityCount + 1;
    dbActCount.update({
      activityCount: actCount,
    });
  });
};

export const delBmActivity = async (placeId, userId) => {
  const dbAct = firebase.firestore().collection('activities');
  const dbActCount = firebase.firestore().collection('activityCount').doc('count');
  // activityを削除
  await dbAct
    .where('user_id', '==', userId)
    .where('place_id', '==', placeId)
    .where('action', '==', 'mark')
    .get()
    .then((snapShot) => {
      snapShot.forEach(async (doc) => {
        if (doc.exists) {
          await doc.ref.delete();
          console.log('Cancel activity of favorite!');
        } else {
          console.log('Not data!');
        }
      });
    });
  // activityCountを-1して更新
  await dbActCount.get().then((doc) => {
    const actCount = doc.data().activityCount - 1;
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
              const bmCount = placeDoc.data().bookmark_count - 1;
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
  await delBmActivity(placeId, userId);
  return userBookmarkPlaceIdRenew;
};

export const postPlaceCount = async () => {
  const dbplaceCount = firebase.firestore().collection('placeCount').doc('count');
  // placeCountを+1して更新
  await dbplaceCount.get().then((doc) => {
    const plaCount = doc.data().placeCount + 1;
    dbplaceCount.update({
      placeCount: plaCount,
    });
  });
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
  const userInfo = await dbUser.doc(userid).get();

  // 取得したplace_idからplaceの情報を取得
  const placeInfo = await dbPlace.doc(placeid).get();

  if (!placeInfo.data() || !userInfo.data()) {
    return null;
  }

  return {
    action: useraction,
    created_at: createdate,
    userName: userInfo.data().username,
    id: placeInfo.data().id,
    name: placeInfo.data().name,
    address: placeInfo.data().address,
    access: placeInfo.data().access,
    average: placeInfo.data().average,
    catchcopy: placeInfo.data().catchcopy,
    open: placeInfo.data().open,
    photo: placeInfo.data().photo,
    url: placeInfo.data().url,
    favorite_count: placeInfo.data().favorite_count,
    bookmark_count: placeInfo.data().bookmark_count,
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

export async function getPlaces(limit, pagingToken) {
  const dbPlace = firebase.firestore().collection('places');
  return new Promise((resolve, reject) => {
    let query = dbPlace.orderBy('create_at', 'desc').limit(limit);

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
        const infoPromises = [];
        for (let i = 0; i < snapshot.docs.length; i += 1) {
          const doc = snapshot.docs[i];
          infoPromises.push(doc.data());
        }
        // 全ての詳細データが取得するまで待つ
        const infos = await Promise.all(infoPromises);

        // console.log(infos, nextToken);
        resolve({ BuffData: infos, nextPageToken: nextToken });
      })
      .catch((err) => {
        console.log('Error firebase', err);
        reject(new Error('Error firebase'));
      });
  });
}

/*
export async function getRankingFavorited(limit, pagingToken) {
  const dbPlace = firebase.firestore().collection('places');
  return new Promise((resolve, reject) => {
    let query = dbPlace.orderBy('favorite_count', 'desc').limit(limit);

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
        const infoPromises = [];
        for (let i = 0; i < snapshot.docs.length; i += 1) {
          const doc = snapshot.docs[i];
          infoPromises.push(doc.data());
        }
        // 全ての詳細データが取得するまで待つ
        const infos = await Promise.all(infoPromises);

        // console.log(infos, nextToken);
        resolve({ BuffData: infos, nextPageToken: nextToken });
      })
      .catch((err) => {
        console.log('Error firebase', err);
        reject(new Error('Error firebase'));
      });
  });
}
*/
