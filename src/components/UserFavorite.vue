<template>
  <div class="user-profile lightblue-bg">
    <!-- username -->
    <div class="p-10">
      <p  class="text-center
                 text-6xl
                 sm:text-6xl
                 md:text-7xl
                 lg:text-8xl
                 xl:text-9xl
                 2xl:text-9xl
                 user-name">
        {{ userName }}
      </p>
    </div>
    <!-- tab -->
    <ul class="tabs-menu flex justify-center items-center">
      <li
        class="text-4xl
               sm:text-4xl
               md:text-5xl
               lg:text-6xl
               xl:text-6xl
               2xl:text-6xl
               px-3"
        :class="{active: activeTab === 'favorite'}"
        @click="activeTab = 'favorite'"
      >
        Favorites
      </li>
      <li
        class="text-4xl
               sm:text-4xl
               md:text-5xl
               lg:text-6xl
               xl:text-6xl
               2xl:text-6xl
               px-10"
        :class="{active: activeTab === 'bookmark'}"
        @click="activeTab = 'bookmark'"
      >
        Marks
      </li>
    </ul>
    <!-- tab contents -->
    <section class="tabs-content p-5">
      <section v-show="activeTab === 'favorite'">
        <div class="flex p-5 items-start justify-center flex-row flex-wrap">
          <div v-for="favorite in favorites" :key="favorite.id">
            <!-- shop layout -->
            <div class="m-4 card">
              <!-- shop image -->
              <div class="card-header">
                <img :src="favorite.photo_1" width="300" height="300" class="card-image">
              </div>
              <!-- shop description and button(favorite and mark) -->
              <section class="card-body">
                <div class="shop-description">
                  <!-- shop name -->
                  <div class="place-name flex justify-center items-center p-1">
                    <p class="text-center text-navyblue kaisei-medium">{{ favorite.name }}</p>
                  </div>
                  <!-- button (favorite and mark) -->
                  <div class="flex justify-end items-center">
                    <!-- favorite button -->
                    <div class="p-2">
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
                    <div class="p-2">
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
                <ul class="card-information">
                  <li class="text-navyblue kaisei-medium">
                    {{ favorite.add_short }}
                  </li>
                  <li class="text-navyblue kaisei-medium">
                    <i class="fas fa-star icon-color-yellow"></i> {{ favorite.all_rating }}
                  </li>
                  <li class="text-navyblue kaisei-medium">
                    <div class="flex justify-start items-center">
                      <div class="favorited_users">
                        <i class="fas fa-heart liked"></i> {{ favorite.favorite_count }}
                        <i class="fas fa-users icon-color-blue"></i>
                      </div>
                      <div class="bookmarked_users mx-5">
                        <i class="fas fa-bookmark bookmarked"></i> {{ favorite.bookmark_count }}
                        <i class="fas fa-users icon-color-blue"></i>
                      </div>
                    </div>
                  </li>
                  <li class="text-navyblue kaisei-medium">
                    <a :href="favorite.website" target="_blank">
                      website <i class="fas fa-external-link-alt icon-color-blue"></i>
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
      <section v-show="activeTab === 'bookmark'">
        <div class="flex p-5 items-start justify-center flex-row flex-wrap">
          <div v-for="bookmark in bookmarks" :key="bookmark.id">
            <!-- shop layout -->
            <div class="m-4 card">
              <!-- shop image -->
              <div class="card-header">
                <img :src="bookmark.photo_1" width="300" height="300" class="card-image">
              </div>
              <!-- shop description and button(favorite and mark) -->
              <section class="card-body">
                <div class="shop-description">
                  <!-- shop name -->
                  <div class="place-name flex justify-center items-center p-1">
                    <p class="text-center text-navyblue kaisei-medium">{{ bookmark.name }}</p>
                  </div>
                  <!-- button (favorite and mark) -->
                  <div class="flex justify-end items-center">
                    <!-- favorite button -->
                    <div class="p-2">
                      <button
                        @click="onFavorite(bookmark)"
                        v-if="userLikedPlaceId.indexOf(bookmark.id) === -1">
                          <i class="far fa-heart fa-lg"></i>
                      </button>
                      <button
                        @click="offFavorite(bookmark)"
                        v-else>
                          <i class="fas fa-heart fa-lg liked"></i>
                      </button>
                    </div>
                    <!-- mark button -->
                    <div class="p-2">
                      <button
                        @click="onBookmark(bookmark)"
                        v-if="userBookmarkPlaceId.indexOf(bookmark.id) === -1">
                        <i class="far fa-bookmark fa-lg"></i>
                      </button>
                      <button
                        @click="offBookmark(bookmark)"
                        v-else>
                        <i class="fas fa-bookmark fa-lg bookmarked"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <ul class="card-information text-navyblue">
                  <li class="text-navyblue kaisei-medium">
                    {{ bookmark.add_short }}
                  </li>
                  <li class="text-navyblue kaisei-medium">
                    <i class="fas fa-star icon-color-yellow"></i> {{ bookmark.all_rating }}
                  </li>
                  <li class="text-navyblue kaisei-medium">
                    <div class="flex justify-start items-center">
                      <div class="favorited_users">
                        <i class="fas fa-heart liked"></i> {{ bookmark.favorite_count }}
                        <i class="fas fa-users icon-color-blue"></i>
                      </div>
                      <div class="bookmarked_users mx-5">
                        <i class="fas fa-bookmark bookmarked"></i> {{ bookmark.bookmark_count }}
                        <i class="fas fa-users icon-color-blue"></i>
                      </div>
                    </div>
                  </li>
                  <li class="text-navyblue kaisei-medium">
                    <a :href="bookmark.website" target="_blank">
                      website <i class="fas fa-external-link-alt icon-color-blue"></i>
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </section>
    <!-- footer -->
    <footer>
      <p class="text-beige text-center p-5 lora">
        <i class="far fa-copyright copyright"></i>
        2022 Wakana T
      </p>
    </footer>
    <!-- top page -->
    <a href="#" class="page-top" @click.prevent="pageTop">Top</a>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import $ from 'jquery';
import { getFavorite, getBookmark } from '@/services/firebaseService';

export default {
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
/* card layout */
.card {
  padding: 20px;
  width: 300px;
  background-color: #FFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.card:hover .card-header {
  height: 50px;
}
.card:hover .card-header .card-image {
  transform: translateX(-50%) translateY(-50%) scale(1.5);
}
.card:hover .card-body {
  height: 250px;
}
.card:hover .card-body .card-information li {
  transform: translateX(0);
  transition-timing-function: cubic-bezier(0, 1.5, 1, 1);
  transition-duration: 0.5s;
}
.card:hover .card-body .card-information li:nth-child(1) {
  transition-delay: 0.25s;
}
.card:hover .card-body .card-information li:nth-child(2) {
  transition-delay: 0.5s;
}
.card:hover .card-body .card-information li:nth-child(3) {
  transition-delay: 0.75s;
}
.card:hover .card-body .card-information li:nth-child(4) {
  transition-delay: 1s;
}
.card:hover .card-body .card-information li:nth-child(5) {
  transition-delay: 1.25s;
}
.card:hover .card-body .card-information li:nth-child(6) {
  transition-delay: 1.5s;
}
.card .card-header {
  position: relative;
  background-color: #eb6c3f;
  height: 200px;
  margin: -20px -20px 20px -20px;
  transition: height 0.5s;
  overflow: hidden;
}
.card .card-header .card-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  display: block;
  width: 300px;
  height: auto;
  transition: transform 0.5s;
}
.card .card-body {
  height: 100px;
  transition: height 0.5s;
  overflow: hidden;
}
.card .card-body .card-information {
  margin-top: 10px;
  color: #424242;
}
.card .card-body .card-information li {
  margin-top: 5px;
  transition-duration: 0;
  transition-delay: 0.5s;
  transform: translateX(-100%);
}

.place-image {
  -moz-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -webkit-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -ms-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
}
.place-name {
  width: 260px;
  height: 60px;
}

.kaisei-medium {
  font-family: 'Kaisei Decol', serif;
  font-weight: medium;
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
.icon-color-blue {
  color: #4f5666;
}
.icon-color-yellow {
  color: #efdc71;
}
</style>
