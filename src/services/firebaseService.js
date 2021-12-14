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
