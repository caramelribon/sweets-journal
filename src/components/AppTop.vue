<template>
  <div class="bg-beige">
    <!-- title -->
    <div class="h-auto navypink-bg relative w-full title">
      <div class="flex justify-center items-center pt-20">
        <p class="sweets">Food</p>
      </div>
      <div class="flex justify-center items-center pb-20">
        <p class="journal">Journal</p>
      </div>
      <div
        class="absolute
               text-beige
               kaisei-medium
               w-full
               text-center
               top-message
               sm:text-base
               md:text-2xl
               lg:text-3xl
               xl:text-4xl
               animate__animated animate__fadeInUp">
        <p>あなたが気に入った・気になる「お店」を伝えよう</p>
      </div>
      <div class="scrolldown lora"><span>Scroll</span></div>
    </div>
    <div class="contents">
      <!-- About -->
      <div class="beige-bg">
        <p class="small-title-beige text-center p-10">About</p>
        <div class="h-auto">
          <div class="bg-none animate__animated invisible">
            <p class="mt-3
                      mb-8
                      mx-20
                      text-nvybrown
                      text-2xl
                      sm:text-3xl
                      md:text-3xl
                      lg:text-4xl
                      xl:text-4xl
                      2xl:text-4xl
                      lora-bold
                      text-center">
              Welcome to the Food Journal
            </p>
            <div class="mx-20 sm:mx-20 md:mx-32 lg:mx-52 xl:mx-52 2xl:mx-52 pb-20">
              <p class="text-nvybrown
                        sm:text-base
                        md:text-2xl
                        lg:text-2xl
                        xl:text-2xl
                        2xl:text-2xl
                        kaisei-medium
                        mb-10">
                Food Journalでは、旅先で現在地周辺のカフェやレストランを見つけることができます。<br>
                また、会員登録をすると、<br>
                ・気に入ったお店や気になるお店を保存できる<br>
                ・全会員の保存したお店をリアルタイムでみることができる<br>
                ・お店のランキングをみることができる<br>
                といった機能がつきます!!<br>
                会員登録することで、他の会員がどんなお店に注目しているのかもわかりますよ♪<br>
                ぜひ、皆さんの旅先でお店を探したり、素敵なお店を保存したりしてみてください<br>
                会員登録は、右上の<i class="far fa-user user-button-color"></i>からできます
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Search -->
      <div class="navypink-bg h-auto">
        <p class="small-title-navypink text-center p-10">Search</p>
        <div class="h-auto animate__animated invisible">
          <p  class="text-beige
                     text-center
                     my-5
                     kaisei-medium
                     sm:text-base
                     md:text-2xl
                     lg:text-2xl
                     xl:text-2xl
                     2xl:text-2xl"
          >
            旅先で、現在地周辺のお店を探してみてください
          </p>
          <div class="bg-none pt-10 pb-24">
            <!-- search area (検索エリア) -->
            <div class="search-area">
              <div class="search-form">
                <form class="pt-16">
                  <div class="flex justify-center items-center">
                    <div class="flex justify-center items-center">
                      <div class="relative
                                  select
                                  sm:w-40
                                  md:w-56
                                  lg:w-72
                                  xl:w-72
                                  2xl:w-72
                                  w-40">
                        <select
                          v-model="genre"
                          class="sel-form
                                 select-text
                                 block appearance-none
                                 sm:w-40
                                 md:w-56
                                 lg:w-72
                                 xl:w-72
                                 2xl:w-72
                                 w-40
                                 leading-tight
                                 px-5 py-3
                                 focus:outline-none">
                          <option
                            value=""
                            class="kaisei-medium lora">
                            すべて
                          </option>
                          <option
                            value="G005"
                            class="kaisei-medium lora">洋食
                          </option>
                          <option
                            value="G004"
                            class="kaisei-medium lora">和食
                          </option>
                          <option
                            value="G007"
                            class="kaisei-medium lora">中華
                          </option>
                          <option
                            value="G006"
                            class="kaisei-medium lora">Italian&French
                          </option>
                          <option
                            value="G017"
                            class="kaisei-medium lora">韓国料理
                          </option>
                          <option
                            value="G009"
                            class="kaisei-medium lora">Asian&Ethnic
                          </option>
                          <option
                            value="G010"
                            class="kaisei-medium lora">各国料理
                          </option>
                          <option
                            value="G003"
                            class="kaisei-medium lora">創作料理
                          </option>
                          <option
                            value="G001"
                            class="kaisei-medium lora">居酒屋
                          </option>
                          <option
                            value="G002"
                            class="kaisei-medium lora">Bar
                          </option>
                          <option
                            value="G016"
                            class="kaisei-medium lora">お好み焼き
                          </option>
                          <option
                            value="G013"
                            class="kaisei-medium lora">ラーメン
                          </option>
                          <option
                            value="G014"
                            class="kaisei-medium lora">カフェ
                          </option>
                          <option
                            value="G015"
                            class="kaisei-medium lora">その他
                          </option>
                        </select>
                        <span class="select-highlight"></span>
                        <span class="select-bar
                                     sm:w-40
                                     md:w-56
                                     lg:w-72
                                     xl:w-72
                                     2xl:w-72
                                     w-40"></span>
                        <label class="select-label">Genre</label>
                      </div>
                    </div>
                    <div class="area
                                flex justify-center items-center px-10">
                      <div class="relative
                                  select
                                  sm:w-40
                                  md:w-56
                                  lg:w-72
                                  xl:w-72
                                  2xl:w-72
                                  w-40">
                        <select
                          v-model="radius"
                          class="select-text
                                 block appearance-none
                                 sm:w-40
                                 md:w-56
                                 lg:w-72
                                 xl:w-72
                                 2xl:w-72
                                 w-40
                                 leading-tight
                                 px-4 py-3
                                 rounded-l
                                 focus:outline-none">
                          <option
                            value=""
                            hidden disabled selected
                            class="kaisei-medium lora">
                          </option>
                          <option
                            value="2"
                            class="kaisei-medium lora">半径 500 m以内
                          </option>
                          <option
                            value="3"
                            class="kaisei-medium lora">半径 1 km以内
                          </option>
                          <option
                            value="5"
                            class="kaisei-medium lora">半径 3 km以内
                          </option>
                        </select>
                        <span class="select-highlight"></span>
                        <span class="select-bar
                                     sm:w-40
                                     md:w-56
                                     lg:w-72
                                     xl:w-72
                                     2xl:w-72
                                     w-40"></span>
                        <label class="select-label">Area</label>
                      </div>
                    </div>
                    <div class="flex justify-center items-center">
                      <button
                        type="submit"
                        @click.prevent="getCurrentLatLng"
                        class="search-button
                               rounded
                               bg-none
                               text-white
                               text-center
                               uppercase">
                        〇
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- fetching status -->
        <span v-show="currentState === 'IS_FETCHING'">
          <div class="py-12 text-center">
            <span class="material-icons md-48">
              loop
            </span>
          </div>
        </span>
        <!-- failed status -->
        <span v-show="currentState === 'IS_FAILED'">
          <p
            class="text-beige
                   text-center
                   py-12
                   kaisei-medium
                   sm:text-base
                   md:text-2xl
                   lg:text-2xl
                   xl:text-2xl
                   2xl:text-2xl">
            データの取得に失敗しました<br>categoryとareaの両方を選択しているか確認してください
          </p>
        </span>
      </div>
      <!-- Place Serch Results (検索結果)-->
      <div
        v-show="currentState === 'IS_FOUND'"
        class="navypink-bg h-auto">
        <p class="place-title text-center p-10">Places</p>
        <p class="animate__animated
                   invisible
                   text-beige
                   text-center
                   my-5
                   kaisei-medium
                   sm:text-base
                   md:text-2xl
                   lg:text-2xl
                   xl:text-2xl
                   2xl:text-2xl"
            v-show="resultState === 'GET_DATA'">
          現在地から{{ radiusShow }}にある{{ genreShow }}のお店一覧です
        </p>
        <p
          class="animate__animated
                 invisible
                 text-beige
                 text-center
                 my-5
                 kaisei-medium
                 sm:text-base
                 md:text-2xl
                 lg:text-2xl
                 xl:text-2xl
                 2xl:text-2xl"
          v-show="resultState === 'NO_DATA'">
          現在地から{{ radiusShow }}に{{ genreShow }}のお店はありませんでした
        </p>
        <div class="animate__animated invisible">
          <div
            id="shop"
            class="flex
                   justify-center
                   items-start
                   flex-row
                   flex-wrap
                   px-5
                   navypink-bg
                   h-auto">
            <div v-for="(place, index) in places" :key="index">
              <!-- shop layout -->
              <div class="m-4">
                <!-- shop image -->
                <div class="place-image text-center mx-3">
                  <img :src="place.photo" width="300" height="300" class="place-photo">
                </div>
                <!-- shop description and button(favorite and mark) -->
                <div class="place-description">
                  <!-- shop name -->
                  <div class="place-name m-3 text-center">
                    <p class="text-beige text-center kaisei-medium my-5">
                      {{ place.name }}
                    </p>
                    <p class="text-beige text-center kaisei-medium text-xs my-4">
                      {{ place.access }}
                    </p>
                  </div>
                  <!-- button-area-gap -->
                  <div class="button-area-gap"></div>
                  <!-- button (favorite and mark) -->
                  <div class="button-area grid grid-cols-6">
                    <div class="col-span-4"></div>
                    <!-- favorite button -->
                    <div class="flex justify-center items-center">
                      <button
                        @click="onFavorite(place)"
                        :disabled="isActive"
                        v-if="userLikedPlaceId.indexOf(place.id) === -1">
                        <i class="far fa-heart fa-lg"></i>
                      </button>
                      <button
                        @click="offFavorite(place)"
                        :disabled="isActive"
                        v-else>
                        <i class="fas fa-heart fa-lg liked"></i>
                      </button>
                    </div>
                    <!-- mark button -->
                    <div class="flex justify-center items-center">
                      <button
                        @click="onBookmark(place)"
                        :disabled="isActive"
                        v-if="userBookmarkPlaceId.indexOf(place.id) === -1">
                        <i class="far fa-bookmark fa-lg"></i>
                      </button>
                      <button
                        @click="offBookmark(place)"
                        :disabled="isActive"
                        v-else>
                        <i class="fas fa-bookmark fa-lg bookmarked"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Ranking (ランキング) -->
      <div
        class="beige-bg h-auto">
        <p class="small-title-beige text-center p-10">Ranking</p>
        <div class="animate__animated invisible">
          <div class="h-auto py-3">
            <div class="row-span-1">
              <p class="text-nvybrown
                        text-center
                        sm:text-base
                        md:text-2xl
                        lg:text-2xl
                        xl:text-2xl
                        2xl:text-2xl
                        my-5
                        kaisei-medium">
                お気に入りのお店ランキングと気になるお店ランキングの上位のお店です
              </p>
              <div class="flex justify-center" v-show="this.isActive === false">
                <div class="flex justify-end items-center
                            mt-5
                            sm:w-11/12
                            md:w-11/12
                            lg:w-4/5
                            xl:w-4/5
                            2xl:w-4/5
                            w-11/12">
                  <router-link
                    :to="{
                            name: 'Ranking',
                            query: { userName: userName,  userUID: currentUID},
                          }"
                    class="block lora-bold text-lightgray text-lg text-center"
                  >
                       AllRanking
                    <p class="text-xs text-nvybrown kaisei-medium">
                      お店のランキングはこちら
                    </p>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- Favorite -->
          <div class="ranking pb-10">
            <p class="ranking-title p-5 text-center">Favorited Places Ranking</p>
            <swiper :options="swiperOption">
              <swiper-slide
                v-for="(favorite, index) in favorites"
                :key="index">
                <div class="flex p-5 items-start justify-center flex-row flex-wrap">
                  <div class="ranking-fav">
                    <div class="ranking-no my-3">
                      <p class="parisienne text-center text-nvybrown text-5xl">
                        No.{{ favorite.no }}
                      </p>
                    </div>
                    <!-- shop layout -->
                    <div class="card">
                      <!-- shop image -->
                      <div class="card-header">
                        <img :src="favorite.photo" width="300" height="300" class="card-image">
                      </div>
                      <!-- shop description and button(favorite and mark) -->
                      <section class="card-body">
                        <div class="shop-description">
                          <!-- shop name -->
                          <div class="place-info m-2 text-center">
                            <div class="my-1">
                              <p class="text-navyblue text-center kaisei-medium">
                                {{ favorite.name }}
                              </p>
                              <p class="text-navyblue text-center kaisei-medium text-xs my-2">
                                {{ favorite.catchcopy }}
                              </p>
                            </div>
                            <p class="text-navyblue kaisei-medium text-xs my-2">
                              {{ favorite.access }}
                            </p>
                          </div>
                        </div>
                        <ul class="card-information">
                          <li class="text-navyblue kaisei-medium text-xs">
                            {{ favorite.address }}
                          </li>
                          <li class="text-navyblue kaisei-medium text-xs">
                            予算:{{ favorite.average }}
                          </li>
                          <li class="text-navyblue kaisei-medium text-xs">
                            Open:{{ favorite.open }}
                          </li>
                          <li class="text-navyblue kaisei-medium text-xs">
                            <a :href="favorite.url" target="_blank">
                              さらに詳しい情報こちら <i class="fas fa-external-link-alt icon-color-blue"></i>
                            </a>
                          </li>
                        </ul>
                      </section>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <!-- Bookmark -->
          <div class="ranking pb-10">
            <p class="ranking-title p-5 text-center">Marked Places Ranking</p>
            <swiper :options="swiperOption">
              <swiper-slide
                v-for="(bookmark, index) in bookmarks"
                :key="index">
                <div class="flex p-5 items-start justify-center flex-row flex-wrap">
                  <div class="ranking-bm">
                    <div class="ranking-no my-3">
                      <p class="parisienne text-center text-nvybrown text-5xl">
                        No.{{ bookmark.no }}
                      </p>
                    </div>
                    <!-- shop layout -->
                    <div class="card">
                      <!-- shop image -->
                      <div class="card-header">
                        <img :src="bookmark.photo" width="300" height="300" class="card-image">
                      </div>
                      <!-- shop description and button(favorite and mark) -->
                      <section class="card-body">
                        <div class="shop-description">
                          <!-- shop name -->
                          <div class="place-info m-2 text-center">
                            <div class="my-1">
                              <p class="text-navyblue text-center kaisei-medium">
                                {{ bookmark.name }}
                              </p>
                              <p class="text-navyblue text-center kaisei-medium text-xs my-2">
                                {{ bookmark.catchcopy }}
                              </p>
                            </div>
                            <p class="text-navyblue kaisei-medium text-xs my-2">
                              {{ bookmark.access }}
                            </p>
                          </div>
                        </div>
                        <ul class="card-information">
                          <li class="text-navyblue kaisei-medium text-sm">
                            {{ bookmark.address }}
                          </li>
                          <li class="text-navyblue kaisei-medium text-sm">
                            予算:{{ bookmark.average }}
                          </li>
                          <li class="text-navyblue kaisei-medium text-sm">
                            Open:{{ bookmark.open }}
                          </li>
                          <li class="text-navyblue kaisei-medium">
                            <a :href="bookmark.url" target="_blank">
                              さらに詳しい情報こちら <i class="fas fa-external-link-alt icon-color-blue"></i>
                            </a>
                          </li>
                        </ul>
                      </section>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <!-- footer -->
      <footer class="navypink-bg h-auto">
        <p class="text-beige text-center p-5 lora">
          <i class="far fa-copyright copyright"></i>
          2022 Wakana T
        </p>
      </footer>
    </div>
    <!-- top page icon -->
    <a href="#" class="page-top lora" @click.prevent="pageTop">Top</a>
  </div>
</template>

<script>
import $ from 'jquery';
// import axios from 'axios';
import firebase from 'firebase/app';
// import GoogleMapsApiLoader from 'google-maps-api-loader';
import {
  getRankingFavoritedTop,
  getRankingBookmarkedTop,
  getFavPlaceId,
  getBmPlaceId,
  postFavActivity,
  delFavorite,
  postBmActivity,
  delBookmark,
  postPlaceCount,
} from '@/services/firebaseService';

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.createRanking(); // 初期化処理
      next();
    });
  },
  data() {
    return {
      bookmarks: [],
      currentUID: null,
      favorites: [],
      // google: null,
      // google_shop: null,
      isActive: true,
      lat: '',
      lng: '',
      loginModal: false,
      radius: '',
      genre: '',
      radiusShow: '',
      genreShow: '',
      places: [],
      ranking: true,
      swiperOption: {
        speed: 1000,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      },
      userLikedPlaceId: [],
      userBookmarkPlaceId: [],
      currentState: 'IS_INITIALIZED',
      allDataNum: 1,
      startNum: 1,
      countNum: 0,
      DATA: [],
      resultState: '',
      userName: '',
    };
  },
  async mounted() {
    // ログイン状態の変化を監視する
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // ログイン中
        this.currentUID = user.uid;
        this.userName = user.name;
        this.isActive = false;
        // ログインユーザがfavoriteしたplaceのidを取得
        this.userLikedPlaceId = await getFavPlaceId(user.uid).catch((err) => {
          console.log('Can not catch place_id login user favorited', err);
        });
        // ログインユーザがbookmarkしたplaceのidを取得
        this.userBookmarkPlaceId = await getBmPlaceId(user.uid).catch((err) => {
          console.log('Can not catch place_id login user bookmarked', err);
        });
      } else {
        // ログアウト中
        this.isActive = true;
      }
    });
    /*
    // 検索用のgoogle
    this.google = await GoogleMapsApiLoader({
      libraries: ['places'],
      apiKey: process.env.VUE_APP_GOOGLEMAPS_APIKEY,
    });
    // shopの詳細データを取得する用のgoogle
    this.google_shop = await GoogleMapsApiLoader({
      apiKey: process.env.VUE_APP_GOOGLEMAPS_APIKEY,
    });
    */
    this.wayPoints();
    this.updateButton();
  },
  methods: {
    // animation fadein
    wayPoints() {
      const elem = this.$el.querySelectorAll('.animate__animated');
      elem.forEach((x) => {
        this.waypoint = new window.Waypoint({
          element: x,
          handler: () => {
            x.classList.remove('invisible');
            x.classList.add('visible');
            x.classList.add('animate__fadeInUp');
          },
          offset: '80%',
        });
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
    // 現在地の緯度と経度の取得
    async getCurrentLatLng() {
      /*
      // 検索用のgoogle
      this.google = await GoogleMapsApiLoader({
        libraries: ['places'],
        apiKey: process.env.VUE_APP_GOOGLEMAPS_APIKEY,
      });
      */
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    },
    // 検索に成功したとき
    success(position) {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.radiusCheck();
      this.genreCheck();
      this.searchPlace();
    },
    // 検索に失敗したとき
    error(err) {
      this.currentState = 'IS_FAILED';
      console.log(err.message);
    },
    radiusCheck() {
      this.radiusShow = '';
      if (this.radius === '2') {
        this.radiusShow = '半径500m以内';
      } else if (this.radius === '3') {
        this.radiusShow = '半径1km以内';
      } else if (this.radius === '5') {
        this.radiusShow = '半径3km以内';
      }
      console.log(this.radiusShow);
    },
    genreCheck() {
      this.genreShow = '';
      if (this.genre === 'G001') {
        this.genreShow = '居酒屋';
      } else if (this.genre === 'G004') {
        this.genreShow = '和食';
      } else if (this.genre === 'G005') {
        this.genreShow = '洋食';
      } else if (this.genre === 'G006') {
        this.genreShow = 'Italian&French';
      } else if (this.genre === 'G007') {
        this.genreShow = '中華';
      } else if (this.genre === 'G008') {
        this.genreShow = '焼肉';
      } else if (this.genre === 'G017') {
        this.genreShow = '韓国料理';
      } else if (this.genre === 'G003') {
        this.genreShow = '創作料理';
      } else if (this.genre === 'G002') {
        this.genreShow = 'Bar';
      } else if (this.genre === 'G009') {
        this.genreShow = 'Asian&Ethnic';
      } else if (this.genre === 'G010') {
        this.genreShow = '各国料理';
      } else if (this.genre === 'G013') {
        this.genreShow = 'ラーメン';
      } else if (this.genre === 'G016') {
        this.genreShow = 'お好み焼き系';
      } else if (this.genre === 'G014') {
        this.genreShow = 'カフェ';
      } else if (this.genre === 'G015') {
        this.genreShow = 'その他';
      } else if (this.genre === '') {
        this.genreShow = 'すべて';
      }
      console.log(this.genreShow);
    },
    // 現在地周辺の地図とお店の取得
    searchPlace() {
      this.currentState = 'IS_FETCHING';
      this.startNum = 1;
      this.allDataNum = 1;
      this.countNum = 0;
      this.places = [];
      $.ajax({
        url: `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.VUE_APP_HOTPEPPER_APIKEY}&lat=${this.lat}&lng=${this.lng}&range=${this.radius}&genre=${this.genre}&order=4&format=jsonp&start=${this.startNum}&count=5`,
        type: 'GET',
        dataType: 'jsonp',
        jsonpCallback: 'callback',
      }).done((res) => {
        this.currentState = 'IS_FOUND';
        console.log(res);
        const data = res.results.shop;
        for (let i = 0; i < data.length; i += 1) {
          const place = data[i];
          let placeAccess = '';
          let placeAddress = '';
          let placeAverage = '';
          let placeCatch = '';
          let placeId = '';
          let placeName = '';
          let placeOpen = '';
          let placePhoto = '';
          let placeUrl = '';
          if (place.access === null) {
            placeAccess = '';
          } else {
            placeAccess = place.access;
          }
          if (place.address === null) {
            placeAddress = '';
          } else {
            placeAddress = place.address;
          }
          if (place.budget.average === null) {
            placeAverage = '';
          } else {
            placeAverage = place.budget.average;
          }
          if (place.genre.catch === null) {
            placeCatch = '';
          } else {
            placeCatch = place.genre.catch;
          }
          if (place.id === null) {
            placeId = '';
          } else {
            placeId = place.id;
          }
          if (place.name === null) {
            placeName = '';
          } else {
            placeName = place.name;
          }
          if (place.open === null) {
            placeOpen = '';
          } else {
            placeOpen = place.open;
          }
          if (place.photo.pc.l === null) {
            placePhoto = '';
          } else {
            placePhoto = place.photo.pc.l;
          }
          if (place.urls.pc === null) {
            placeUrl = '';
          } else {
            placeUrl = place.urls.pc;
          }
          const placeData = {
            id: placeId,
            name: placeName,
            address: placeAddress,
            access: placeAccess,
            average: placeAverage,
            catchcopy: placeCatch,
            open: placeOpen,
            photo: placePhoto,
            url: placeUrl,
          };
          this.places.push(placeData);
        }
        this.allDataNum = res.results.results_available;
        const getDataNum = Number(res.results.results_returned);
        this.countNum += getDataNum;
        this.startNum = this.countNum + 1;
        console.log(this.allDataNum);
        console.log(this.countNum);
        console.log(this.startNum);
        if (this.allDataNum !== this.countNum) {
          this.getData();
        }
        if (this.allDataNum === 0) {
          this.resultState = 'NO_DATA';
        } else {
          this.resultState = 'GET_DATA';
        }
        console.log(this.resultState);
      }).fail(() => {
        console.log('エラー');
        this.currentState = 'IS_FAILED';
      });
    },
    getData() {
      $.ajax({
        url: `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.VUE_APP_HOTPEPPER_APIKEY}&lat=${this.lat}&lng=${this.lng}&range=${this.radius}&genre=${this.genre}&order=4&format=jsonp&start=${this.startNum}&count=5`,
        type: 'GET',
        dataType: 'jsonp',
        jsonpCallback: 'callback',
      }).done((res) => {
        console.log(res);
        const data = res.results.shop;
        for (let i = 0; i < data.length; i += 1) {
          const place = data[i];
          let placeAccess = '';
          let placeAddress = '';
          let placeAverage = '';
          let placeCatch = '';
          let placeId = '';
          let placeName = '';
          let placeOpen = '';
          let placePhoto = '';
          let placeUrl = '';
          if (place.access === null) {
            placeAccess = '';
          } else {
            placeAccess = place.access;
          }
          if (place.address === null) {
            placeAddress = '';
          } else {
            placeAddress = place.address;
          }
          if (place.budget.average === null) {
            placeAverage = '';
          } else {
            placeAverage = place.budget.average;
          }
          if (place.genre.catch === null) {
            placeCatch = '';
          } else {
            placeCatch = place.genre.catch;
          }
          if (place.id === null) {
            placeId = '';
          } else {
            placeId = place.id;
          }
          if (place.name === null) {
            placeName = '';
          } else {
            placeName = place.name;
          }
          if (place.open === null) {
            placeOpen = '';
          } else {
            placeOpen = place.open;
          }
          if (place.photo.pc.l === null) {
            placePhoto = '';
          } else {
            placePhoto = place.photo.pc.l;
          }
          if (place.urls.pc === null) {
            placeUrl = '';
          } else {
            placeUrl = place.urls.pc;
          }
          const placeData = {
            id: placeId,
            name: placeName,
            address: placeAddress,
            access: placeAccess,
            average: placeAverage,
            catchcopy: placeCatch,
            open: placeOpen,
            photo: placePhoto,
            url: placeUrl,
          };
          this.places.push(placeData);
        }
        this.allDataNum = res.results.results_available;
        const getDataNum = Number(res.results.results_returned);
        this.countNum += getDataNum;
        this.startNum = this.countNum + 1;
        console.log(this.allDataNum);
        console.log(this.countNum);
        console.log(this.startNum);
        if (this.allDataNum !== this.countNum) {
          setTimeout(this.getData, 1000);
        }
      }).fail(() => {
        console.log('エラー');
      });
      console.log(this.places);
    },
    // お気に入り機能
    async onFavorite(place) {
      // userLikedPlaceIdにplace.idを追加
      this.userLikedPlaceId.push(place.id);
      // このお店がfavorites→user.uid&place.idにあるか検索
      const dbFav = firebase.firestore().collection('favorites');
      await dbFav
        .where('user_id', '==', this.currentUID)
        .where('place_id', '==', place.id)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            // Yes:お気に入り解除
            this.userLikedPlaceId = await delFavorite(
              place.id,
              this.currentUID,
              this.userLikedPlaceId,
            ).catch((err) => {
              console.log('Can not delete favorited place!', err);
            });
          } else {
            // No:お気に入り登録
            dbFav.doc().set({
              user_id: this.currentUID,
              place_id: place.id,
              create_at: firebase.firestore.FieldValue.serverTimestamp(),
            });
            // No:アクティビティ登録
            await postFavActivity(place.id, this.currentUID).catch((err) => {
              console.log('Can not register activities!', err);
            });
            // place_idのお店が登録してあるか確認
            await this.searchFavPlace(place);
          }
        })
        .catch((error) => {
          console.log('Can not register favorite shop!', error);
        });
    },
    searchFavPlace(place) {
      const dbPlace = firebase.firestore().collection('places');
      const docRef = dbPlace.doc(place.id);
      docRef.get().then(async (doc) => {
        if (doc.exists) {
          // お店の情報がすでに登録されていたら、favorite_countを+1して更新
          const favCount = doc.data().favorite_count + 1;
          await docRef.update({
            favorite_count: favCount,
          });
        } else {
          // 登録されていなかったら、お店の情報を登録
          await this.getFavPlaceData(place);
          await postPlaceCount();
        }
      }).catch((err) => {
        console.log('Can not search favorited place!', err);
      });
    },
    getFavPlaceData(place) {
      const dbPlace = firebase.firestore().collection('places');
      // placesにデータを保存
      const docRef = dbPlace.doc(place.id);
      docRef.set({
        id: place.id,
        name: place.name,
        address: place.address,
        access: place.access,
        average: place.average,
        catchcopy: place.catchcopy,
        open: place.open,
        photo: place.photo,
        url: place.url,
        favorite_count: 1,
        bookmark_count: 0,
        create_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
    },
    // お気に入り解除機能
    async offFavorite(place) {
      this.userLikedPlaceId = await delFavorite(place.id, this.currentUID, this.userLikedPlaceId)
        .catch((err) => {
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
        .where('user_id', '==', this.currentUID)
        .where('place_id', '==', place.id)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            // Yes:気になる解除
            this.userBookmarkPlaceId = await delBookmark(
              place.id,
              this.currentUID,
              this.userBookmarkPlaceId,
            ).catch((err) => {
              console.log('Can not delete bookmarked place!', err);
            });
          } else {
            // No:気になる登録
            dbBm.doc().set({
              user_id: this.currentUID,
              place_id: place.id,
              create_at: firebase.firestore.FieldValue.serverTimestamp(),
            });
            // No:アクティビティ登録
            await postBmActivity(place.id, this.currentUID).catch((err) => {
              console.log('Can not register activities!', err);
            });
            // place_idのお店が登録してあるか確認
            await this.searchBmPlace(place);
          }
        })
        .catch((error) => {
          console.log('Can not register bookmark shop!', error);
        });
    },
    searchBmPlace(place) {
      const dbPlace = firebase.firestore().collection('places');
      const docRef = dbPlace.doc(place.id);
      docRef.get().then(async (doc) => {
        if (doc.exists) {
          // お店の情報がすでに登録されていたら、bookmark_countを+1して更新
          const bmCount = doc.data().bookmark_count + 1;
          await docRef.update({
            bookmark_count: bmCount,
          });
        } else {
          // 登録されていなかったら、お店の情報を登録
          await this.getBmPlaceData(place);
          await postPlaceCount();
        }
      }).catch((err) => {
        console.log('Can not search bookmarked place!', err);
      });
    },
    getBmPlaceData(place) {
      const dbPlace = firebase.firestore().collection('places');
      // placesにデータを保存
      const docRef = dbPlace.doc(place.id);
      docRef.set({
        id: place.id,
        name: place.name,
        address: place.address,
        access: place.access,
        average: place.average,
        catchcopy: place.catchcopy,
        open: place.open,
        photo: place.photo,
        url: place.url,
        favorite_count: 0,
        bookmark_count: 1,
        create_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
    },
    // 気になる解除機能
    async offBookmark(place) {
      this.userBookmarkPlaceId = await delBookmark(
        place.id,
        this.currentUID,
        this.userBookmarkPlaceId,
      ).catch((err) => {
        console.log('Can not delete bookmarked place!', err);
      });
    },
    // get Ranking Data
    async createRanking() {
      // Ranking上位のお店の情報を取得
      const rankingFav = await getRankingFavoritedTop().catch((err) => {
        console.log('Can not get data of favorite ranking', err);
      });
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
      const rankingBm = await getRankingBookmarkedTop().catch((err) => {
        console.log('Can not get data of bookmark ranking', err);
      });
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
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&family=Parisienne&display=swap');
/* background */
.navypink-bg {
  background-color: #a76e63;
  background: linear-gradient(to right, #ab766b, #9f6054, #945447);
}
.beige-bg {
  background-color: #f2ebe5;
  background: linear-gradient(to right, #f2ebe5, #eee5de, #eae2da);
}

/* title */
.sweets {
  text-transform: Uppercase;
  font-size: 200px;
  color: #a76e63;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-shadow: 0 1px #966258,
               0 2px #8d5c53,
               0 3px #885950,
               0 4px #80544b,
               0 5px #7b5148,
               0 6px #744c44,
               0 7px #6f4841,
               0 8px #68433c,
               0 9px #5f3e37,
               0 10px 8px #523530;
}
.journal {
  text-transform: Uppercase;
  font-size: 200px;
  color: #a76e63;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-shadow: 0 1px #966258,
               0 2px #8d5c53,
               0 3px #885950,
               0 4px #80544b,
               0 5px #7b5148,
               0 6px #744c44,
               0 7px #6f4841,
               0 8px #68433c,
               0 9px #5f3e37,
               0 10px 8px #523530;
}
.swt {
  font-size: 160px;
  font-family: 'Lora', serif;
  color: #4f5666;
  padding: 0;
  margin-left: 50px;
  line-height: 150px;
  text-shadow:
    1px 1px #4a5160,
    2px 2px #474e5d,
    3px 3px #444a58,
    4px 4px #404654,
    5px 5px #3e4451,
    6px 6px #333843,
    7px 7px 4px #2f343e;
}
.jnl {
  font-size: 160px;
  font-family: 'Lora', serif;
  color: #4f5666;
  padding: 0;
  margin-right: 70px;
  text-align: right;
  line-height: 100px;
  text-shadow:
    1px 1px #4a5160,
    2px 2px #474e5d,
    3px 3px #444a58,
    4px 4px #404654,
    5px 5px #3e4451,
    6px 6px #333843,
    7px 7px 4px #2f343e;
}
.small-title-beige {
  font-size: 100px;
  color: #f2ebe5;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-shadow: 0 1px #dfd8d3,
               0 2px #d1cac5,
               0 3px #c2bcb7,
               0 4px #b8b2ac,
               0 5px #b1aba6,
               0 6px #aaa49f,
               0 7px #a19b96,
               0 8px #99938e,
               0 9px #918b86,
               0 10px 8px #88837e;
}
.small-title-navypink {
  font-size: 100px;
  color: #a76e63;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-shadow: 0 1px #966258,
               0 2px #8d5c53,
               0 3px #885950,
               0 4px #80544b,
               0 5px #7b5148,
               0 6px #744c44,
               0 7px #6f4841,
               0 8px #68433c,
               0 9px #5f3e37,
               0 10px 8px #523530;
}
.ranking-title {
  font-size: 50px;
  color: #a76e63;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-shadow: 0 1px #dfd8d3,
               0 2px #c2bcb7,
               0 3px #b1aba6,
               0 4px #a19b96,
               0 5px #99938e,
               0 6px 5px #88837e;
}
.place-title {
  color: #f2ebe5;
  transition: 0.2s ease all;
  text-align: center;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-shadow: 0 1px #966258,
               0 2px #8d5c53,
               0 3px #885950,
               0 4px #80544b,
               0 5px #7b5148,
               0 6px #744c44,
               0 7px #6f4841,
               0 8px #68433c,
               0 9px #5f3e37,
               0 10px 8px #523530;
}

@media screen and (max-width:640px) {
  .sweets {
    font-size: 100px;
  }
  .journal {
    font-size: 100px;
  }
  .small-title-beige {
    font-size: 50px;
  }
  .small-title-navypink {
    font-size: 50px;
  }
  .place-title {
    font-size: 50px;
  }
  .message-about {
    font-size: 40px;
  }
  .ranking-title {
    font-size: 30px;
  }
  .select-text {
    font-size: 20px;
  }
  .select-text:focus ~ .select-label, .select-text:valid ~ .select-label {
    font-size: 30px;
    top: -70px;
  }
  .select:after {
    top: 17px;
  }
  .select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {
    width: 106%;
  }
}
@media screen and (min-width:640px) and ( max-width:768px) {
  .sweets {
    font-size: 150px;
  }
  .journal {
    font-size: 150px;
  }
  .small-title-beige {
    font-size: 70px;
  }
  .small-title-navypink {
    font-size: 70px;
  }
  .place-title {
    font-size: 70px;
  }
  .message-about {
    font-size: 20px;
  }
  .ranking-title {
    font-size: 30px;
  }
  .select-text {
    font-size: 20px;
  }
  .select-text:focus ~ .select-label, .select-text:valid ~ .select-label {
    font-size: 40px;
    top: -80px;
  }
  .select:after {
    top: 17px;
  }
  .select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {
    width: 106%;
  }
}
@media screen and (min-width:768px) and ( max-width:1024px) {
  .sweets {
    font-size: 150px;
  }
  .journal {
    font-size: 150px;
  }
  .small-title-beige {
    font-size: 100px;
  }
  .small-title-navypink {
    font-size: 100px;
  }
  .place-title {
    font-size: 100px;
  }
  .message-about {
    font-size: 30px;
  }
  .ranking-title {
    font-size: 50px;
  }
  .select-text {
    font-size: 25px;
  }
  .select-text:focus ~ .select-label, .select-text:valid ~ .select-label {
    font-size: 50px;
    top: -100px;
  }
  .select:after {
    top: 30px;
  }
  .select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {
    width: 149%;
  }
}
@media screen and (min-width:1024px) {
  .sweets {
    font-size: 200px;
  }
  .journal {
    font-size: 200px;
  }
  .small-title-beige {
    font-size: 100px;
  }
  .small-title-navypink {
    font-size: 100px;
  }
  .place-title {
    font-size: 100px;
  }
  .message-about {
    font-size: 40px;
  }
  .ranking-title {
    font-size: 50px;
  }
  .select-text {
    font-size: 30px;
  }
  .select-text:focus ~ .select-label, .select-text:valid ~ .select-label {
    font-size: 50px;
    top: -100px;
  }
  .select:after {
    top: 30px;
  }
  .select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {
    width: 192%;
  }
}

.top-message {
  top: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

/* scroll down */
/* スクロールダウン全体の場所 */
.scrolldown{
  position: absolute;
  bottom: 0;
  left: 50%;
}
/*Scrollテキストの描写*/
.scrolldown span{
  position: absolute;
  left:10px;
  bottom:10px;
  color: #eee;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  /*縦書き設定*/
  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
}
/* 丸の描写 */
.scrolldown:before {
  content: "";
  position: absolute;
  bottom:0;
  left:-4px;
  /*丸の形状*/
  width:10px;
  height:10px;
  border-radius: 50%;
  background:#eee;
  /*丸の動き1.6秒かけて透過し、永遠にループ*/
  animation:
    circlemove 1.6s ease-in-out infinite,
    cirlemovehide 1.6s ease-out infinite;
}
/*下からの距離が変化して丸の全体が上から下に動く*/
@keyframes circlemove{
  0%{bottom:45px;}
  100%{bottom:-5px;}
 }
/*上から下にかけて丸が透過→不透明→透過する*/
@keyframes cirlemovehide{
  0%{opacity:0}
  50%{opacity:1;}
  80%{opacity:0.9;}
  100%{opacity:0;}
 }
/* 線の描写 */
.scrolldown:after{
  content:"";
  /*描画位置*/
  position: absolute;
  bottom:0;
  left:0;
  /*線の形状*/
  width:2px;
  height: 50px;
  background:#eee;
}

/* text font */
.lora {
  font-family: 'Lora', serif;
}
.lora-bold {
  font-family: 'Lora', serif;
  font-weight: bold;
}
.lobster {
  font-family: 'Antic Didone', serif;
}
.kaisei-medium {
  font-family: 'Kaisei Decol', serif;
  font-weight: medium;
}

/* serch form */
select {
  background-color: transparent;
  line-height: 2.0em;
}
option {
  background-color: #a76e63;
}
.select {
  font-family: 'Lora', serif;
  font-family: 'Kaisei Decol', serif;
  font-weight: medium;
  position: relative;
}
.select-text {
  position: relative;
  font-family: inherit;
  padding: 10px 10px 10px 0;
  color: #f2ebe5;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid rgba(0,0,0, 0.12);
  text-shadow: 0 1px #966258,
               0 2px #8d5c53,
               0 3px #885950,
               0 4px #80544b,
               0 5px #7b5148,
               0 6px #744c44,
               0 7px #6f4841,
               0 8px #68433c,
               0 9px #5f3e37,
               0 10px 8px #523530;
}
.select-text:focus {
  outline: none;
}
.select .select-text {
  appearance: none;
  -webkit-appearance:none;
  text-align: center;
}
.select:after {
  position: absolute;
  right: 10px;
  /* Styling the down arrow */
  width: 0;
  height: 0;
  padding: 0;
  text-align: center;
  content: '▼';
  color: #f2ebe5;
  text-shadow: 0 1px #966258,
               0 2px #8d5c53,
               0 3px #885950,
               0 4px #80544b,
               0 5px #7b5148,
               0 6px #744c44,
               0 7px #6f4841,
               0 8px #68433c,
               0 9px #5f3e37,
               0 10px 8px #523530;
  pointer-events: none;
  transition: 0.3s ease all;
}
.select:hover:after {
  transform: translate(0px, 10px);
  text-shadow: none;
}
.select-label {
  color: rgba(0,0,0, 0.26);
  font-size: 50px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 10px;
  transition: 0.2s ease all;
}
.select-text:focus ~ .select-label, .select-text:valid ~ .select-label {
  color: #f2ebe5;
  transition: 0.2s ease all;
  text-align: center;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-shadow: 0 1px #966258,
               0 2px #8d5c53,
               0 3px #885950,
               0 4px #80544b,
               0 5px #7b5148,
               0 6px #744c44,
               0 7px #6f4841,
               0 8px #68433c,
               0 9px #5f3e37,
               0 10px 8px #523530;
}
.select-bar {
  position: relative;
  display: block;
  width: 150px;
}
.select-bar:before, .select-bar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 0px;
  position: absolute;
  background: #f2ebe5;
  transition: 0.2s ease all;
}
.select-highlight {
  position: absolute;
  height: 60%;
  width: 50%;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

/* serch button (検索ボタン) */
.search-button {
  display: inline-block;
  position: relative;
  font-size: 50px;
  color: #f2ebe5;
  text-shadow: 0 1px #966258,
              0 2px #8d5c53,
              0 3px #885950,
              0 4px #80544b,
              0 5px #7b5148,
              0 6px #744c44,
              0 7px #6f4841,
              0 8px #68433c,
              0 9px #5f3e37,
              0 10px 8px #523530;
  transition: all .5s ease;
}
.search-button::before {
  position: absolute;
  top: 45px;
  left: 31px;
  transform: rotate(-45deg);
  width: 0.10em;
  height: 0.5em;
  content: "i";
  color: #f2ebe5;
  font-size: 30px;
  text-shadow: -1px 1px #966258,
               -1px 2px #8d5c53,
               -2px 3px #885950,
               -3px 4px #80544b,
               -4px 5px #7b5148,
               -5px 6px #744c44,
               -6px 7px #6f4841,
               -7px 8px #68433c,
               -8px 9px #5f3e37,
               -9px 10px 8px #523530;
  transition: all .5s ease;
}
.search-button:hover {
  transform: translate(0px, 10px);
  text-shadow: none;
}
.search-button:hover::before {
  transform: translate(0px, 10px);
  transform: rotate(-45deg);
  text-shadow: none;
}

/* place card layout */
#photos li {
  display: inline-box;
  float: left;
}
.button-area-gap {
  width: 300px;
  height: 10px;
}
.button-area {
  width: 300px;
  height: 40px;
}
.add-size {
  font-size: 5px;
}
.button-size {
  font-size: 1.5em;
}

/* favorite and bookmark button */
button:disabled {
  opacity: .4;
}
.liked {
  color: #ff8882;
}
.bookmarked {
  color: #efdc71;
}
.marked {
  color: #efdc71;
}
.icon-color-yellow {
  color: #efdc71;
}

/* ranking layout */
#slider {
  overflow: hidden;
  width: 310px;
  border: 1px solid #000;
  margin: 10px auto;
  padding: 0px;
}
#rankings {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}

/* page-top button */
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
  color: #8d8985;
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

/* copyright */
.copyright {
  color: #f2ebe5;
}

/* chocolate */
.chocolate {
  box-sizing: border-box;
  position: relative;
  z-index: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 0;
  border: solid 12px;
  border-color: #804535 #3c1a11 #2c100a #6a3b2b;
  background-color: #6f3c2f;
  color: #6a3a2d;
  text-shadow: 0 1px rgba(255,255,255,0.3), 0 -1px rgba(0,0,0,0.4);
  box-shadow: -1px 4px 8px rgba(0,0,0,0.3);
  font-family: 'Lobster', serif;
  font-size: 90px;
  text-align: center;
}
.chocolate::before ,
.chocolate::after {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  display: block;
  border-radius: 2px;
  border-style: solid;
  pointer-events: none;
}
.chocolate::before {
  z-index: 1;
  border-width: 15px;
  border-radius: 2px;
  border-color: #291617 #662e1f #99604c #65413b;
  color: rgba(0,0,0,0.2);
  box-shadow: 4px 4px 4px inset;
}
.chocolate::after {
  z-index: 2;
  margin: -3px;
  border-radius: 2px;
  border-width: 10px;
  border-color: #985d4d #885041 #885041 #985d4d;
  color: rgba(255,255,255,0.3);
  box-shadow: -1px -1px 1.4px,-1px -1px 1.4px inset;
}
.chocolate-navypink {
  box-sizing: border-box;
  position: relative;
  z-index: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 0;
  border: solid 12px;
  border-color: #b87466 #7d4439 #703a30 #9e6459;
  background-color: #a76e63;
  color: #a56d62;
  text-shadow: 0 1px rgba(255,255,255,0.3), 0 -1px rgba(0,0,0,0.4);
  box-shadow: -1px 4px 8px rgba(0,0,0,0.3);
  font-family: 'Lobster', serif;
  font-size: 90px;
  text-align: center;
}
.chocolate-navypink::before ,
.chocolate-navypink::after {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  display: block;
  border-radius: 2px;
  border-style: solid;
  pointer-events: none;
}
.chocolate-navypink::before {
  z-index: 1;
  border-width: 15px;
  border-radius: 2px;
  border-color: #5d4743 #a5675c #c68f85 #977068;
  color: rgba(0,0,0,0.2);
  box-shadow: 4px 4px 4px inset;
}
.chocolate-navypink::after {
  z-index: 2;
  margin: -3px;
  border-radius: 2px;
  border-width: 10px;
  border-color: #c68c81 #b98075 #b68177 #d39c91;
  color: rgba(255,255,255,0.3);
  box-shadow: -1px -1px 1.4px,-1px -1px 1.4px inset;
}

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
  height: 120px;
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

/* 回転するアニメーション */
.material-icons.md-48 {
  font-size: 48px;
  color: #f2ebe5;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.parisienne {
  font-family: 'Parisienne', cursive;
}
</style>
