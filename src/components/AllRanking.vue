<template>
  <div
    class="user-profile
           navyblue-bg"
  >
    <!-- username -->
    <div class="p-10">
      <p  class="text-center
                 text-6xl
                 sm:text-6xl
                 md:text-7xl
                 lg:text-8xl
                 xl:text-9xl
                 2xl:text-9xl
                 title"
      >
        Ranking
      </p>
      <div
        class="animate__animated
               animate__fadeInUp
               mt-24
               mb-2"
      >
        <p  class="text-beige
                   text-center
                   kaisei-medium
                   sm:text-base
                   md:text-2xl
                   lg:text-2xl
                   xl:text-2xl
                   2xl:text-2xl"
        >
          「お気に入り」・「お気に入り」されたお店のランキングです
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
            v-for="(favorite, index) in favorites"
            :key="index"
          >
            <div
              class="ranking-fav
                     mt-10"
            >
              <div
                class="ranking-no
                       animate__animated
                       animate__fadeInUp"
              >
                <p
                  class="parisienne
                         text-center
                         text-navypink
                         text-5xl"
                >
                  No.{{ favorite.no }}
                </p>
              </div>
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
        </div>
      </section>
      <section v-show="activeTab === 'bookmark'">
        <div
          class="flex
                 p-5
                 items-start
                 justify-center
                 flex-row flex-wrap"
        >
          <div
            v-for="(bookmark, index) in bookmarks"
            :key="index"
          >
            <div
              class="ranking-bm
                     mt-10"
            >
              <div
                class="ranking-no
                       animate__animated
                       animate__fadeInUp"
              >
                <p
                  class="parisienne
                         text-center
                         text-navypink
                         text-5xl"
                >
                  No.{{ bookmark.no }}
                </p>
              </div>
              <!-- shop layout -->
              <div
                class="m-4
                       card
                       animate__animated
                       animate__fadeInUp">
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
                        <p
                          class="text-navyblue
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
  getRankingBookmarked,
  getRankingFavorited,
  getFavPlaceId,
  getBmPlaceId,
  postFavActivity,
  delFavorite,
  postBmActivity,
  delBookmark,
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
      // Placesのデータの数
      dataBmCount: 1,
      dataFavCount: 1,
      favorites: [],
      lastFavCount: null,
      lastFavDate: null,
      lastBmCount: null,
      lastBmDate: null,
      // ロード中のアニメーション
      loadingFav: false,
      loadingBm: false,
      nextDataFavorite: [],
      nextDataBookmark: [],
      // データがあるかどうか
      noDataFav: false,
      noDataBm: false,
      // Intersection Obsever
      observerFav: null,
      observerBm: null,
      userLikedPlaceId: [],
      userBookmarkPlaceId: [],
      userName: this.$route.query.userName,
      userUID: this.$route.query.userUID,
    };
  },
  mounted() {
    this.updateButton();
  },
  methods: {
    // dataの取得
    async getData() {
      // データ数の取得
      const docRef = await firebase.firestore().collection('placeCount').doc('count');
      docRef.get().then((doc) => {
        console.log(doc.data().placeCount);
        this.dataFavCount = doc.data().placeCount + 1;
        this.dataBmCount = doc.data().placeCount + 1;
      });
      console.log(this.dataFavCount);
      console.log(this.dataBmCount);
      // login userがfavoriteしたplaceのidを取得
      this.userLikedPlaceId = await getFavPlaceId(this.userUID).catch((err) => {
        console.log('Can not catch place_id login user favorited', err);
      });
      // login userがbookmarkしたplaceのidを取得
      this.userBookmarkPlaceId = await getBmPlaceId(this.userUID).catch((err) => {
        console.log('Can not catch place_id login user bookmarked', err);
      });
      setTimeout(this.firstData, 300);
    },
    async firstData() {
      // 最初のfavoriteデータの取得
      const dataFavorite = await getRankingFavorited(100).catch((err) => {
        console.log('Can not get data of favorite ranking', err);
      });
      const rankingFav = dataFavorite.Data;
      for (let i = 0; i < rankingFav.length; i += 1) {
        const dataFav = rankingFav[i];
        const placeData = {
          id: dataFav.id,
          name: dataFav.name,
          address: dataFav.address,
          access: dataFav.access,
          average: dataFav.average,
          catchcopy: dataFav.catchcopy,
          open: dataFav.open,
          photo: dataFav.photo,
          url: dataFav.url,
          no: i + 1,
        };
        this.favorites.push(placeData);
      }
      // 最初のboookmarkデータの取得
      const dataBookmark = await getRankingBookmarked(100).catch((err) => {
        console.log('Can not get data of bookmark ranking', err);
      });
      const rankingBm = dataBookmark.Data;
      for (let i = 0; i < rankingBm.length; i += 1) {
        const dataBm = rankingBm[i];
        const placeData = {
          id: dataBm.id,
          name: dataBm.name,
          address: dataBm.address,
          access: dataBm.access,
          average: dataBm.average,
          catchcopy: dataBm.catchcopy,
          open: dataBm.open,
          photo: dataBm.photo,
          url: dataBm.url,
          no: i + 1,
        };
        this.bookmarks.push(placeData);
      }
    },
    // お気に入り機能
    async onFavorite(place) {
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
@import url('https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&family=Parisienne&display=swap');
.kaisei-medium {
  font-family: 'Kaisei Decol', serif;
  font-weight: medium;
}
.user-activities {
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
.title {
  color: #f2ebe5;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-shadow: 0 1px #5f6571,
               0 2px #5d626e,
               0 3px #5a5f6b,
               0 4px #575c68,
               0 5px #545965,
               0 6px #515661,
               0 7px #4e535e,
               0 8px #4b505b,
               0 9px #454954,
               0 10px 8px #41454f;
}
.no-data {
  color: #6b717f;
  font-family: 'Lora', serif;
  font-weight: bold;
  font-size: 30px;
  text-shadow: 0 1px #5f6571,
               0 2px #5a5f6b,
               0 3px #545965,
               0 4px #4e535e,
               0 5px #454954,
               0 6px 5px #41454f;
}
.navyblue-bg {
  background-color: #5e636f;
  background: linear-gradient(to right, #636772, #5c626f, #4f5666);
}

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

.user-action {
  display: inline-block;
  transform-origin: left top;
  transform: rotate( 90deg );
}
.lora-bold {
  font-family: 'Lora', serif;
  font-weight: bold;
}
.lora {
  font-family: 'Lora', serif;
}
.user-name {
  text-shadow: 0 1px #5f6571,
               0 2px #5a5f6b,
               0 3px #545965,
               0 4px #515661,
               0 5px #4b505b,
               0 6px 5px #41454f;
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
  text-shadow: 0 1px #5f6571,
               0 2px #5d626e,
               0 3px #5a5f6b,
               0 4px #575c68,
               0 5px #545965,
               0 6px #515661,
               0 7px #4e535e,
               0 8px #4b505b,
               0 9px #454954,
               0 10px 8px #41454f;
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
.parisienne {
  font-family: 'Parisienne', cursive;
}
</style>
