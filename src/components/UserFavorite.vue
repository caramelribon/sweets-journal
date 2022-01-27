<template>
  <div class="favorites">
    <ul class="tab flex justify-center items-center">
      <li><a href=#favorite>Favorites</a></li>
      <li><a href=#mark>Marks</a></li>
    </ul>
    <div id=favorite class="area">
      <div class="py-16">
        <p class="shop-text text-4xl text-center">Favorite Places</p>
      </div>
      <div class="flex p-5 items-start justify-center flex-row flex-wrap">
        <div v-for="favorite in favorites" :key="favorite.id">
          <!-- shop layout -->
          <div class="m-4">
            <!-- shop image -->
            <div class="shop-image">
              <a @click="openShopInfo(favorite)" class="cursor-pointer">
                <img v-bind:src="favorite.photo_1" width="300" height="300">
              </a>
              <rinfo-modal @close="closeShopInfo" v-if="infomodal" :val="shopInfos"></rinfo-modal>
            </div>
            <!-- shop description and button(favorite and mark) -->
            <div class="shop-description">
              <!-- shop name -->
              <div class="shop-name flex justify-center items-center p-1">
                <p class="shop-text text-center">{{ favorite.name }}</p>
              </div>
              <!-- button-area-gap -->
              <div class="button-area-gap"></div>
              <!-- button (favorite and mark) -->
              <div class="button-area grid grid-cols-6">
                <div class="col-span-4"></div>
                <!-- favorite button -->
                <div class="flex justify-center items-center">
                  <button
                    @click="onFavorite(favorite)"
                    :disabled="isActive"
                    v-if="userLikedPlaceId.indexOf(place.id) === -1">
                      <i class="far fa-heart fa-lg"></i>
                  </button>
                  <button
                    @click="offFavorite(favorite)"
                    :disabled="isActive"
                    v-else>
                      <i class="fas fa-heart fa-lg liked"></i>
                  </button>
                </div>
                <!-- mark button -->
                <div class="flex justify-center items-center">
                  <button
                    @click="onBookmark(favorite)"
                    v-if="userBookmarkPlaceId.indexOf(place.id) === -1">
                    <i class="far fa-bookmark fa-lg"></i>
                  </button>
                  <button
                    @click="offBookmark(favorite)"
                    v-else>
                    <i class="far fa-bookmark fa-lg bookmarked"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="mark" class="area">
      <div class="py-16">
        <p class="shop-text text-4xl text-center">Mark Places</p>
      </div>
      <div class="flex p-5 items-start justify-center flex-row flex-wrap">
        <div v-for="mark in bookmarks" :key="mark.id">
          <!-- shop layout -->
          <div class="m-4">
            <!-- shop image -->
            <div class="shop-image">
              <a @click="openShopInfo(mark)" class="cursor-pointer">
                <img v-bind:src="mark.photo_1" width="300" height="300">
              </a>
              <rinfo-modal @close="closeShopInfo" v-if="infomodal" :val="shopInfos"></rinfo-modal>
            </div>
            <!-- shop description and button(favorite and mark) -->
            <div class="shop-description">
              <!-- shop name -->
              <div class="shop-name flex justify-center items-center p-1">
                <p class="shop-text text-center">{{ mark.name }}</p>
              </div>
              <!-- button-area-gap -->
              <div class="button-area-gap"></div>
              <!-- button (favorite and mark) -->
              <div class="button-area grid grid-cols-6">
                <div class="col-span-4"></div>
                <!-- favorite button -->
                <div class="flex justify-center items-center">
                  <button
                    @click="onFavorite(mark)"
                    v-if="userLikedPlaceId.indexOf(place.id) === -1">
                      <i class="far fa-heart fa-lg"></i>
                  </button>
                  <button
                    @click="offFavorite(mark)"
                    v-else>
                      <i class="fas fa-heart fa-lg liked"></i>
                  </button>
                </div>
                <!-- mark button -->
                <div class="flex justify-center items-center">
                  <button
                    @click="onBookmark(mark)"
                    v-if="userBookmarkPlaceId.indexOf(place.id) === -1">
                    <i class="far fa-bookmark fa-lg"></i>
                  </button>
                  <button
                    @click="offBookmark(mark)"
                    v-else>
                    <i class="far fa-bookmark fa-lg bookmarked"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import firebase from 'firebase/app';
import $ from 'jquery';
import RinfoModal from '@/components/RinfoModal.vue';
import { getFavorite } from '@/services/firebaseService';
import { getBookmark } from '@/services/firebaseService';

export default {
  components: { RinfoModal },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData(); // 初期化処理
      next();
    });
  },
  data() {
    return {
      username: '',
      favorites: [],
      bookmarks: [],
      infomodal: false,
    };
  },
  mounted() {
    // ページが読み込まれたときの動作
    $(window).on('load', function () {
      $('.tab li:first-of-type').addClass("active");
      $('.area:first-of-type').addClass("is-active");
      var hashName = location.hash;
      this.getHashID (hashName);
    });
    // タブをclickしたときの動作
    $('.tab a').on('click', function() {
      const idName = $(this).attr('href');  
      this.getHashID(idName);
      return false;
    });
  },
  methods: {
    async getData() {
      // ログインしているユーザのuidを取得
      const user = firebase.auth().currentUser;
      const userUID = user.uid;
      // ログインユーザがお気に入りしたお店の情報を取得
      this.favorites = await getFavorite(userUID).catch((err) => {
        console.log('Can not catch favorite data!', err);
      });
      this.favorites = await getBookmark(userUID).catch((err) => {
        console.log('Can not catch bookmark data!', err);
      });
    },
    onFavorite(place) {
      // userLikedPlaceIdにplace.idを追加する
      // this.userLikedPlaceId.push(place.id);
      // このお店がfavorites→user.uid&place.idにあるかどうか調べる
      const db = firebase.firestore();
      db.collection('favorites')
        .where('user_id', '==', this.currentUID)
        .where('place_id', '==', place.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // あったら、offFavorite()に進む
            this.offFavorite(place);
          } else {
            // なかったら、お気に入り登録とアクティビティ登録
            // お気に入り登録
            db.collection('favorites').doc().set({
              user_id: this.currentUID,
              place_id: place.id,
            });
            // activityに登録
            this.onFavActivity(place.id, this.currentUID);
            // place_idのお店が登録してあるか確認
            // this.confirmFavShopData(place.id);
          }
        })
        .catch((error) => {
          console.log('Can not register favorite shop!', error);
        });
    },
    onFavActivity(placeId, userId) {
      const db = firebase.firestore();
      // activitiesに登録
      const docRef = db
        .collection('activities')
        .doc();
      docRef.set({
        user_id: userId,
        place_id: placeId,
        action: 'favorite',
        create_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // activityCountを+1して更新
      const actRef = db
        .collection('activityCount')
        .doc('count');
      actRef.get().then((doc) => {
        const actCount = doc.data().activityCount + 1;
        actRef.update({
          activityCount: actCount,
        });
      });
    },
    offFavorite(place) {
      // userLikedPlaceIdから削除する
      // this.userLikedPlaceId = this.userLikedPlaceId.filter((id) => id !== place.id);
      // favoritesのコレクションから削除する
      firebase.firestore().collection('favorites')
        .where('user_id', '==', this.currentUID)
        .where('place_id', '==', place.id)
        .get()
        .then((snapShot) => {
          snapShot.forEach(async (doc) => {
            if (doc.exists) {
              // あったら、そのお店のお気に入りを解除し、favorite_countに-1する
              // favorites→user.uid→place.idを削除
              await doc.ref.delete();
              console.log('Cancel favorite place!');
              // shops→shop.id→favorite_countを-1にする
              const placeDocRef = firebase.firestore().collection('places').doc(place.id);
              placeDocRef.get().then((doc) => {
                if (doc.exists) {
                  const favcount = doc.data().favorite_count - 1;
                  placeDocRef.update({
                    favorite_count: favcount,
                  });
                }
              })
                .catch((error) => {
                  console.log('favorite_count error!', error);
                });
            } else {
              console.log('Not data!');
            }
          });
        })
        .catch((error) => {
          console.log('Can not cancel favorite place!', error);
        });
    },
    onBookmark(place) {
      // userBookmarkPlaceIdにplace.idを追加する
      // this.userBookmarkPlaceId.push(place.id);
      // このお店がbookmarks→user.uid&place.idにあるかどうか調べる
      const db = firebase.firestore();
      db.collection('bookmarks')
        .where('user_id', '==', this.currentUID)
        .where('place_id', '==', place.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // あったら、offBookmark()に進む
            this.offBookmark(place);
          } else {
            // なかったら、気になる登録とアクティビティ登録
            // 気になる登録
            db.collection('bookmarks').doc().set({
              user_id: this.currentUID,
              place_id: place.id,
            });
            // activityに登録
            this.onBmActivity(place.id, this.currentUID);
            // place_idのお店が登録してあるか確認
            this.confirmBmShopData(place.id);
          }
        })
        .catch((error) => {
          console.log('Can not register bookmark shop!', error);
        });
    },
    onBmActivity(placeId, userId) {
      const db = firebase.firestore();
      // activitiesに登録
      const docRef = db
        .collection('activities')
        .doc();
      docRef.set({
        user_id: userId,
        place_id: placeId,
        action: 'mark',
        create_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // activityCountを+1して更新
      const actRef = db
        .collection('activityCount')
        .doc('count');
      actRef.get().then((doc) => {
        const actCount = doc.data().activityCount + 1;
        actRef.update({
          activityCount: actCount,
        });
      });
    },
    offBookmark(place) {
      // userBookmarkPlaceIdから削除する
      // this.userBookmarkPlaceId = this.userBookmarkPlaceId.filter((id) => id !== place.id);
      // bookmarksのコレクションから削除する
      firebase.firestore().collection('bookmarks')
        .where('user_id', '==', this.currentUID)
        .where('place_id', '==', place.id)
        .get()
        .then((snapShot) => {
          snapShot.forEach(async (doc) => {
            if (doc.exists) {
              // あったら、そのお店の気になる登録を解除し、bookmark_countに-1する
              // favorites→user.uid→place.idを削除
              await doc.ref.delete();
              console.log('Cancel bookmark place');
              // shops→shop.id→bookmark_countを-1にする
              const bmDocRef = firebase.firestore().collection('places').doc(place.id);
              bmDocRef.get().then((doc) => {
                if (doc.exists) {
                  const bookmarkCount = doc.data().favorite_count - 1;
                  bmDocRef.update({
                    bookmark_count: bookmarkCount,
                  });
                }
              })
                .catch((error) => {
                  console.log('bookmark_count error', error);
                });
            } else {
              console.log('No data!');
            }
          });
        })
        .catch((error) => {
          console.log('Can not cancel bookmark place!', error);
        });
    },
    getHashID(hashIDName) {
      if(hashIDName){
        $('.tab li').find('a').each(function() {
          const idName = $(this).attr('href');
          if(idName == hashIDName){
            const parentElm = $(this).parent();
            $('.tab li').removeClass("active");
            $(parentElm).addClass("active");
            $(".area").removeClass("is-active");
            $(hashIDName).addClass("is-active");
          }
        });
      }
    },
    openShopInfo(info) {
      this.infomodal = true;
      this.shopInfos = info;
    },
    closeShopInfo() {
      this.infomodal = false;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');
.shop-name {
  width: 300px;
  height: 60px;
}
.shop-vicinity {
  width: 300px;
  height: 30px;
}
.button-area-gap {
  width: 300px;
  height: 5px;
}
.button-area {
  width: 300px;
  height: 40px;
}
.shopphoto {
  -webkit-box-shadow: 0 5px 6px 1px #888;
  -moz-box-shadow:0 5px 6px 1px #888;
  box-shadow: 0 5px 6px 1px #888;
}
.shop-text {
  font-family: 'Hachi Maru Pop', cursive;
}
.add-size {
  font-size: 5px;
}
.button-size {
  font-size: 1.5em;
}
.liked {
  color: #ff8882;
}
.bookmarked {
  color: #efdc71;
}
ul {
  list-style:none;
}
a{
  color:#333;
  text-decoration: none;
}
.tab li a{
  display: block;
  background:#ddd;
  margin:0 2px;
  padding:10px 20px;
}
.tab li.active a{
  background:#fff;
}
.area {
  display: none;/*はじめは非表示*/
  opacity: 0;/*透過0*/
}
.area.is-active {
  display: block;/*表示*/
  animation-name: displayAnime;/*ふわっと表示させるためのアニメーション*/
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
@keyframes displayAnime{
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
