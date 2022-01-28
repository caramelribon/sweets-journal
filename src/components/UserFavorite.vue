<template>
  <div class="user-profile lightblue-bg">
    <div class="p-10">
      <p class="text-center user-name">{{ userName }}</p>
    </div>
    <ul class="tabs-menu flex justify-center items-center">
      <li
        class="text-4xl px-3"
        :class="{active: activeTab === 'favorite'}"
        @click="activeTab = 'favorite'"
      >
        Favorites
      </li>
      <li
      class="sm:text-3xl md:text-4xl px-3"
        :class="{active: activeTab === 'bookmark'}"
        @click="activeTab = 'bookmark'"
      >
        Marks
      </li>
    </ul>
    <section class="tabs-content p-5">
      <section v-show="activeTab === 'favorite'">
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
                      v-if="userLikedPlaceId.indexOf(favorite.id) === -1">
                        <i class="far fa-heart fa-lg"></i>
                    </button>
                    <button
                      @click="offFavorite(favorite)"
                      v-else>
                        <i class="fas fa-heart fa-lg liked"></i>
                    </button>
                  </div>
                  <!-- mark button -->
                  <div class="flex justify-center items-center">
                    <button
                      @click="onBookmark(favorite)"
                      v-if="userBookmarkPlaceId.indexOf(favorite.id) === -1">
                      <i class="far fa-bookmark fa-lg"></i>
                    </button>
                    <button
                      @click="offBookmark(favorite)"
                      v-else>
                      <i class="fas fa-bookmark fa-lg bookmarked"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-show="activeTab === 'bookmark'">
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
                      v-if="userLikedPlaceId.indexOf(mark.id) === -1">
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
                      v-if="userBookmarkPlaceId.indexOf(mark.id) === -1">
                      <i class="far fa-bookmark fa-lg"></i>
                    </button>
                    <button
                      @click="offBookmark(mark)"
                      v-else>
                      <i class="fas fa-bookmark fa-lg bookmarked"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <!-- CopyRight -->
    <footer>
      <p class="text-beige text-center p-5 lora">
        <i class="far fa-copyright copyright"></i>
        2022 Wakana T
      </p>
    </footer>
    <a href="#" class="page-top" @click.prevent="pageTop">Top</a>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import $ from 'jquery';
import RinfoModal from '@/components/RinfoModal.vue';
import { getFavorite, getBookmark } from '@/services/firebaseService';

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
      favorites: [],
      bookmarks: [],
      infomodal: false,
      userLikedPlaceId: [],
      userBookmarkPlaceId: [],
      activeTab: 'favorite',
      userName: this.$route.query.userName,
      userUID: this.$route.query.userUID,
    };
  },
  mounted() {
    this.updateButton();
  },
  methods: {
    async getData() {
      // ログインしているユーザのuidを取得
      // const user = firebase.auth().currentUser;
      // this.userUID = user.uid;
      // this.userName = user.username;
      // console.log(this.userName);
      await firebase.firestore().collection('favorites').where('user_id', '==', this.userUID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((docPlaceId) => {
            this.userLikedPlaceId.push(docPlaceId.data().place_id);
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
      await firebase.firestore().collection('bookmarks').where('user_id', '==', this.userUID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((docPlaceId) => {
            this.userBookmarkPlaceId.push(docPlaceId.data().place_id);
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
      // ログインユーザがお気に入りしたお店の情報を取得
      this.favorites = await getFavorite(this.userUID).catch((err) => {
        console.log('Can not catch favorite data!', err);
      });
      this.bookmarks = await getBookmark(this.userUID).catch((err) => {
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
              placeDocRef.get().then((placeDoc) => {
                if (placeDoc.exists) {
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
              const placeDocRef = firebase.firestore().collection('places').doc(place.id);
              placeDocRef.get().then((placeDoc) => {
                if (placeDoc.exists) {
                  const bookmarkCount = doc.data().favorite_count - 1;
                  placeDocRef.update({
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
    openShopInfo(info) {
      this.infomodal = true;
      this.shopInfos = info;
    },
    closeShopInfo() {
      this.infomodal = false;
    },
    updateButton() {
      const pagetop = $('.page-top');
      pagetop.hide();
      $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
          pagetop.fadeIn();
        } else {
          pagetop.fadeOut();
        }
      });
    },
    pageTop() {
      // 600ミリ秒かけてトップに戻る
      $('html, body').animate({ scrollTop: 0 }, 600);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&display=swap');
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
.tabs-menu{
  list-style:none;
}
.tabs-menu li {
  display: block;
  float: left;
  color: #f2ebe5;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-shadow: 0 1px #6e7a7c,
               0 2px #6a7678,
               0 3px #687375,
               0 4px #667173,
               0 5px #626d6f,
               0 6px #5f6a6c,
               0 7px #5d6769,
               0 8px #596365,
               0 9px #566062,
               0 10px 8px #50595b;
  text-decoration: none;
  transition: .5s ease all;
}
/* タブにマウスを乗せたらカーソルの形を変える */
.tabs-menu li:hover {
  cursor: pointer;
  transform: translate(0px, 10px);
  text-shadow: none;
}
/* 非選択のタブにマウスを乗せたら色を変える */
.tabs-menu li:not(.active):hover {
  transform: translate(0px, 10px);
  text-shadow: none;
}
/* 選択中のタブ */
.tabs-menu .active {
  transform: translate(0px, 10px);
  text-shadow: none;
}
.lightblue-bg {
  background-color: #717d7f;
  background: linear-gradient(to right, #747e80, #697779, #5f7174);
}
.user-name {
  font-size: 100px;
  color: #f2ebe5;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-shadow: 0 1px #6e7a7c,
               0 2px #6a7678,
               0 3px #687375,
               0 4px #667173,
               0 5px #626d6f,
               0 6px #5f6a6c,
               0 7px #5d6769,
               0 8px #596365,
               0 9px #566062,
               0 10px 8px #50595b;
}
.page-top {
  position: fixed;
  right: -10px;
  bottom: 20px;
  height: 50px;
  text-decoration: none;
  font-weight: bold;
  transform: rotate(90deg);
  font-size: 90%;
  line-height: 4.5rem;
  color: #f2ebe5;
  padding: 0 0 0 35px;
  border-bottom: solid 1px;
}
.page-top::before {
  content: "";
  display: block;
  position: absolute;
  top: 49px;
  left: 0px;
  width: 15px;
  border-top: solid 1px;
  transform: rotate(-35deg);
  transform-origin: left top;
}
.user-profile {
  min-height: 100vh;
  position: relative;/*←相対位置*/
  padding-bottom: 60px;/*←footerの高さ*/
  box-sizing: border-box;
}
footer{
  width: 100%;
  position: absolute;/*←絶対位置*/
  text-align: center;
  bottom: 0; /*下に固定*/
}
</style>
