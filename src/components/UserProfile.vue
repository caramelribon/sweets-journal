<template>
  <div
    class="user-profile
           lightblue-bg"
  >
    <!-- username -->
    <div class="p-10">
      <p
        class="text-center
               text-6xl
               sm:text-6xl
               md:text-7xl
               lg:text-8xl
               xl:text-9xl
               2xl:text-9xl
               user-name"
      >
        {{ userName }}
      </p>
      <div
        class="animate__animated
               animate__fadeInUp
               mt-24
               mb-2"
      >
        <p
          class="text-beige
                 text-center
                 kaisei-medium
                 sm:text-base
                 md:text-2xl
                 lg:text-2xl
                 xl:text-2xl
                 2xl:text-2xl"
        >
          あなたが気になる・お気に入りしたお店です
        </p>
      </div>
    </div>
    <!-- tab -->
    <ul
      class="tabs-menu
             flex
             justify-center
             items-center"
    >
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
    <section
      class="tabs-content
             p-5"
    >
      <section v-show="activeTab === 'favorite'">
        <div
          class="flex
                 items-start
                 justify-center
                 flex-row
                 flex-wrap
                 p-5"
        >
          <div
            v-for="favorite in favorites"
            :key="favorite.id"
          >
            <!-- shop layout -->
            <div
              class="m-4
                     card
                     animate__animated
                     animate__fadeInUp"
            >
              <!-- shop image -->
              <div class="card-header">
                <img
                  :src="favorite.photo"
                  width="300"
                  height="300"
                  class="card-image"
                >
              </div>
              <!-- shop description and button(favorite and mark) -->
              <section class="card-body">
                <div class="shop-description">
                  <!-- shop name -->
                  <div
                    class="place-info
                           m-2
                           text-center"
                  >
                    <div class="my-1">
                      <p
                        class="text-navyblue
                               text-center
                               kaisei-medium"
                      >
                        {{ favorite.name }}
                      </p>
                      <p
                        class="text-navyblue
                               text-center
                               kaisei-medium
                               text-xs
                               my-2"
                      >
                        {{ favorite.catchcopy }}
                      </p>
                    </div>
                    <p
                      class="text-navyblue
                             kaisei-medium
                             text-xs
                             my-2"
                    >
                      {{ favorite.access }}
                    </p>
                  </div>
                  <!-- button (favorite and mark) -->
                  <div
                    class="flex
                           justify-end
                           items-center"
                  >
                    <!-- favorite button -->
                    <div class="p-2">
                      <button
                        @click="onFavorite(favorite)"
                        v-if="userLikedPlaceId.indexOf(favorite.id) === -1"
                      >
                          <i class="far fa-heart fa-lg"></i>
                      </button>
                      <button
                        @click="offFavorite(favorite)"
                        v-else
                      >
                          <i class="fas fa-heart fa-lg liked"></i>
                      </button>
                    </div>
                    <!-- mark button -->
                    <div class="p-2">
                      <button
                        @click="onBookmark(favorite)"
                        v-if="userBookmarkPlaceId.indexOf(favorite.id) === -1"
                      >
                        <i class="far fa-bookmark fa-lg"></i>
                      </button>
                      <button
                        @click="offBookmark(favorite)"
                        v-else
                      >
                        <i class="fas fa-bookmark fa-lg bookmarked"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <ul class="card-information">
                  <li
                    class="text-navyblue
                           kaisei-medium
                           text-xs"
                  >
                    {{ favorite.address }}
                  </li>
                  <li
                    class="text-navyblue
                           kaisei-medium
                           text-xs"
                  >
                    予算:{{ favorite.average }}
                  </li>
                  <li
                    class="text-navyblue
                           kaisei-medium
                           text-xs"
                  >
                    Open:{{ favorite.open }}
                  </li>
                  <li
                    class="text-navyblue
                           kaisei-medium
                           text-xs"
                  >
                    <a
                      :href="favorite.url"
                      target="_blank"
                    >
                      さらに詳しい情報こちら <i class="fas fa-external-link-alt icon-color-blue"></i>
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
      <section v-show="activeTab === 'bookmark'">
        <div
          class="flex
                 items-start
                 justify-center
                 flex-row
                 flex-wrap
                 p-5"
        >
          <div
            v-for="bookmark in bookmarks"
            :key="bookmark.id"
          >
            <!-- shop layout -->
            <div
              class="m-4
                     card
                     animate__animated
                     animate__fadeInUp"
            >
              <!-- shop image -->
              <div class="card-header">
                <img
                  :src="bookmark.photo"
                  width="300"
                  height="300"
                  class="card-image"
                >
              </div>
              <!-- shop description and button(favorite and mark) -->
              <section class="card-body">
                <div class="shop-description">
                  <!-- shop name -->
                  <div
                    class="place-info
                           m-2
                           text-center"
                  >
                    <div class="my-1">
                      <p class="text-navyblue
                                text-center
                                kaisei-medium"
                      >
                        {{ bookmark.name }}
                      </p>
                      <p
                        class="text-navyblue
                               text-center
                               kaisei-medium
                               text-xs
                               my-2"
                      >
                        {{ bookmark.catchcopy }}
                      </p>
                    </div>
                    <p
                      class="text-navyblue
                             kaisei-medium
                             text-xs
                             my-2"
                    >
                      {{ bookmark.access }}
                    </p>
                  </div>
                  <!-- button (favorite and mark) -->
                  <div
                    class="flex
                           justify-end
                           items-center"
                  >
                    <!-- favorite button -->
                    <div class="p-2">
                      <button
                        @click="onFavorite(bookmark)"
                        v-if="userLikedPlaceId.indexOf(bookmark.id) === -1"
                      >
                          <i class="far fa-heart fa-lg"></i>
                      </button>
                      <button
                        @click="offFavorite(bookmark)"
                        v-else
                      >
                          <i class="fas fa-heart fa-lg liked"></i>
                      </button>
                    </div>
                    <!-- mark button -->
                    <div class="p-2">
                      <button
                        @click="onBookmark(bookmark)"
                        v-if="userBookmarkPlaceId.indexOf(bookmark.id) === -1"
                      >
                        <i class="far fa-bookmark fa-lg"></i>
                      </button>
                      <button
                        @click="offBookmark(bookmark)"
                        v-else
                      >
                        <i class="fas fa-bookmark fa-lg bookmarked"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <ul class="card-information">
                  <li
                    class="text-navyblue
                           kaisei-medium
                           text-sm"
                  >
                    {{ bookmark.address }}
                  </li>
                  <li
                    class="text-navyblue
                           kaisei-medium
                           text-sm"
                  >
                    予算:{{ bookmark.average }}
                  </li>
                  <li
                    class="text-navyblue
                           kaisei-medium
                           text-sm"
                  >
                    Open:{{ bookmark.open }}
                  </li>
                  <li
                    class="text-navyblue
                           kaisei-medium"
                  >
                    <a
                      :href="bookmark.url"
                      target="_blank"
                    >
                      さらに詳しい情報こちら <i class="fas fa-external-link-alt icon-color-blue"></i>
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
      <p
        class="text-beige
               text-center
               p-5
               lora"
      >
        <i class="far fa-copyright copyright"></i>
        2022 Wakana T
      </p>
    </footer>
    <!-- top page -->
    <a
      href="#"
      class="page-top
             lora"
      @click.prevent="pageTop"
    >
      Top
    </a>
  </div>
</template>

<script>
import $ from 'jquery';
import firebase from 'firebase/app';
import {
  getBookmark,
  getFavorite,
  getBmPlaceId,
  getFavPlaceId,
  delBookmark,
  postBmActivity,
  delFavorite,
  postFavActivity,
} from '@/services/firebaseService';

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData(); // 初期化処理
      next();
    });
  },
  data() {
    return {
      activeTab: 'favorite',
      bookmarks: [],
      favorites: [],
      userBookmarkPlaceId: [],
      userLikedPlaceId: [],
      userName: this.$route.query.userName,
      userUID: this.$route.query.userUID,
    };
  },
  mounted() {
    this.updateButton();
  },
  methods: {
    // login userのdataを取得
    async getData() {
      // login userがfavoriteしたplaceのidを取得
      this.userLikedPlaceId = await getFavPlaceId(this.userUID).catch((err) => {
        console.log('Can not catch place_id login user favorited', err);
      });
      // login userがbookmarkしたplaceのidを取得
      this.userBookmarkPlaceId = await getBmPlaceId(this.userUID).catch((err) => {
        console.log('Can not catch place_id login user bookmarked', err);
      });
      // login userがfavoriteしたお店の情報を取得
      this.favorites = await getFavorite(this.userUID).catch((err) => {
        console.log('Can not catch favorite data!', err);
      });
      // login userがbookmarkしたお店の情報を取得
      this.bookmarks = await getBookmark(this.userUID).catch((err) => {
        console.log('Can not catch bookmark data!', err);
      });
    },
    // お気に入り機能
    async onFavorite(place) {
      // favoritesにplaceを追加
      this.favorites.push(place);
      // userLikedPlaceIdにplace.idを追加
      this.userLikedPlaceId.push(place.id);
      // このお店がfavorites→user.uid&place.idにあるか検索
      const dbFav = firebase.firestore().collection('favorites');
      await dbFav
        .where('user_id', '==', this.userUID)
        .where('place_id', '==', place.id)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            // Yes:お気に入り解除
            this.userLikedPlaceId = await delFavorite(
              place.id,
              this.userUID,
              this.userLikedPlaceId,
            ).catch((err) => {
              console.log('Can not delete favorited place!', err);
            });
          } else {
            // No:お気に入り登録
            dbFav.doc().set({
              user_id: this.userUID,
              place_id: place.id,
              create_at: firebase.firestore.FieldValue.serverTimestamp(),
            });
            // No:アクティビティ登録
            await postFavActivity(place.id, this.userUID, this.userName).catch((err) => {
              console.log('Can not register activities!', err);
            });
          }
        })
        .catch((error) => {
          console.log('Can not register favorite shop!', error);
        });
    },
    // お気に入り解除機能
    async offFavorite(place) {
      this.favorites = this.favorites.filter((data) => data !== place);
      this.userLikedPlaceId = await delFavorite(
        place.id,
        this.userUID,
        this.userLikedPlaceId,
      ).catch((err) => {
        console.log('Can not delete favorited place!', err);
      });
    },
    // 気になる機能
    async onBookmark(place) {
      // bookmarksにplaceを追加
      this.bookmarks.push(place);
      // userBookmarkPlaceIdにplace.idを追加
      this.userBookmarkPlaceId.push(place.id);
      // このお店がbookmarks→user.uid&place.idにあるか検索
      const dbBm = firebase.firestore().collection('bookmarks');
      await dbBm
        .where('user_id', '==', this.userUID)
        .where('place_id', '==', place.id)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            // Yes:気になる解除
            this.userBookmarkPlaceId = await delBookmark(
              place.id,
              this.userUID,
              this.userBookmarkPlaceId,
            ).catch((err) => {
              console.log('Can not delete bookmarked place!', err);
            });
          } else {
            // No:気になる登録
            dbBm.doc().set({
              user_id: this.userUID,
              place_id: place.id,
              create_at: firebase.firestore.FieldValue.serverTimestamp(),
            });
            // No:アクティビティ登録
            await postBmActivity(place.id, this.userUID, this.userName).catch((err) => {
              console.log('Can not register activities!', err);
            });
          }
        })
        .catch((error) => {
          console.log('Can not register bookmark shop!', error);
        });
    },
    // 気になる解除機能
    async offBookmark(place) {
      this.bookmarks = this.bookmarks.filter((data) => data !== place);
      this.userBookmarkPlaceId = await delBookmark(
        place.id,
        this.userUID,
        this.userBookmarkPlaceId,
      ).catch((err) => {
        console.log('Can not delete bookmarked place!', err);
      });
    },
    // pagetop button
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
  height: auto;
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
  background-color: #9e9a95;
  height: 200px;
  margin: -20px -20px 5px -20px;
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
  height: 180px;
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
  width: 300px;
  -moz-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -webkit-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -ms-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
}
.place-name {
  width: 300px;
  height: auto;
}
.place-info {
  width: auto;
  height: auto;
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
footer {
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
