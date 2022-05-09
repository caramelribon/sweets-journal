import firebase from 'firebase/app';

// eslint-disable-next-line
export const getRankingFavoritedTop = async () => {
  const dbPlace = firebase.firestore().collection('places');
  const rankingData = [];
  await dbPlace
    .orderBy('favorite_count', 'desc')
    .orderBy('create_at', 'desc')
    .limit(7)
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

// eslint-disable-next-line
export const getRankingBookmarkedTop = async () => {
  const dbPlace = firebase.firestore().collection('places');
  const rankingData = [];
  await dbPlace
    .orderBy('bookmark_count', 'desc')
    .orderBy('create_at', 'desc')
    .limit(7)
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

// eslint-disable-next-line
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

// eslint-disable-next-line
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

// eslint-disable-next-line
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

// eslint-disable-next-line
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

// eslint-disable-next-line
export const postFavActivity = async (placeId, userId, userName) => {
  const dbAct = firebase.firestore().collection('activities').doc();
  const dbActCount = firebase.firestore().collection('activityCount').doc('count');
  // activitiesに登録
  await dbAct.set({
    user_id: userId,
    username: userName,
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

// eslint-disable-next-line
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

// eslint-disable-next-line
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

// eslint-disable-next-line
export const postBmActivity = async (placeId, userId, userName) => {
  const dbAct = firebase.firestore().collection('activities').doc();
  const dbActCount = firebase.firestore().collection('activityCount').doc('count');
  // activitiesに登録
  await dbAct.set({
    user_id: userId,
    place_id: placeId,
    username: userName,
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

// eslint-disable-next-line
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

// eslint-disable-next-line
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

// eslint-disable-next-line
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

// eslint-disable-next-line
const getActivityDetailData = async (doc) => {
  const placeid = doc.data().place_id;
  console.log(placeid);
  const username = doc.data().username;
  const useraction = doc.data().action;
  const createtime = doc.data().create_at.toDate();
  const createdate = `${createtime.getFullYear()}/${createtime.getMonth() + 1}/${createtime.getDate()} ${createtime.getHours()}:${createtime.getMinutes()}:${createtime.getSeconds()}`;
  let placeData = null;
  let placeId = null;
  let placeName = null;
  let placeAddress = null;
  let placeAccess = null;
  let placeAverage = null;
  let placeCatchcopy = null;
  let placeOpen = null;
  let placePhoto = null;
  let placeUrl = null;
  await firebase.firestore()
    .collection('places')
    .doc(placeid)
    .get()
    .then((docRef) => {
      if (docRef !== null) {
        placeData = docRef.data();
        placeId = placeData.id;
        placeName = placeData.name;
        placeAddress = placeData.address;
        placeAccess = placeData.access;
        placeAverage = placeData.average;
        placeCatchcopy = placeData.catchcopy;
        placeOpen = placeData.open;
        placePhoto = placeData.photo;
        placeUrl = placeData.url;
      }
    });

  return {
    action: useraction,
    create_at: createdate,
    userName: username,
    id: placeId,
    name: placeName,
    address: placeAddress,
    access: placeAccess,
    average: placeAverage,
    catchcopy: placeCatchcopy,
    open: placeOpen,
    photo: placePhoto,
    url: placeUrl,
  };
};

// eslint-disable-next-line
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
        const infoPromises = [];
        for (let i = 0; i < snapshot.docs.length; i += 1) {
          const doc = snapshot.docs[i];
          infoPromises.push(getActivityDetailData(doc));
          console.log(infoPromises);
        }
        // 全ての詳細データが取得するまで待つ
        const infos = await Promise.all(infoPromises);

        console.log(infos, nextToken);
        resolve({ BuffData: infos, nextPageToken: nextToken });
      })
      .catch((err) => {
        console.log('エラーが発見されました：データ取得時', err);
        reject(new Error('firebaseからのデータ取得エラー'));
      });
  });
}

// eslint-disable-next-line
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

// eslint-disable-next-line
export async function getRankingFavorited(limit) {
  const dbPlace = firebase.firestore().collection('places');
  return new Promise((resolve, reject) => {
    const query = dbPlace
      .orderBy('favorite_count', 'desc')
      .orderBy('create_at', 'desc')
      .limit(limit);
    query.get()
      .then(async (snapshot) => {
        const infoPromises = [];
        for (let i = 0; i < snapshot.docs.length; i += 1) {
          const doc = snapshot.docs[i];
          infoPromises.push(doc.data());
        }
        // 全ての詳細データが取得するまで待つ
        const favoriteData = await Promise.all(infoPromises);

        // console.log(infos, nextToken);
        resolve({ Data: favoriteData });
      })
      .catch((err) => {
        console.log('Error firebase', err);
        reject(new Error('Error firebase'));
      });
  });
}

// eslint-disable-next-line
export async function getRankingBookmarked(limit) {
  const dbPlace = firebase.firestore().collection('places');
  return new Promise((resolve, reject) => {
    const query = dbPlace
      .orderBy('bookmark_count', 'desc')
      .orderBy('create_at', 'desc')
      .limit(limit);
    query.get()
      .then(async (snapshot) => {
        const infoPromises = [];
        for (let i = 0; i < snapshot.docs.length; i += 1) {
          const doc = snapshot.docs[i];
          infoPromises.push(doc.data());
        }
        // 全ての詳細データが取得するまで待つ
        const bookmarkData = await Promise.all(infoPromises);

        // console.log(infos, nextToken);
        resolve({ Data: bookmarkData });
      })
      .catch((err) => {
        console.log('Error firebase', err);
        reject(new Error('Error firebase'));
      });
  });
}
