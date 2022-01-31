<template>
  <div class="bg-beige">
    <!-- title -->
    <div class="h-auto navypink-bg relative w-full">
      <div class="flex justify-center items-center pt-20">
        <p class="sweets">Sweets</p>
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
        <p>あなたが気に入った・気になる「スイーツのお店」を伝えよう</p>
      </div>
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
              Welcome to the Sweets Journal
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
                Sweets Journalでは、旅先で現在地周辺のカフェやレストランを見つけることができます。<br>
                また、会員登録をすると、<br>
                ・気に入ったお店や気になるお店を保存できる<br>
                ・全会員の保存したお店をリアルタイムでみることができる<br>
                といった機能がつきます!!<br>
                会員登録することで、他の会員がどんなお店に注目しているのかもわかりますよ♪<br>
                ぜひ、皆さんの旅先でお店を探したり、素敵なお店を保存したりしてみてください
              </p>
              <button
                class="text-nvybrown text-2xl mb-10"
                @click.prevent="Try()">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Search -->
      <div class="navypink-bg h-auto">
        <p class="small-title-navypink text-center p-10">Search</p>
        <div class="h-auto animate__animated invisible">
          <p class="text-beige
                    text-center
                    my-5
                    kaisei-medium
                    sm:text-base
                    md:text-2xl
                    lg:text-2xl
                    xl:text-2xl
                    2xl:text-2xl">
            旅先で、現在地周辺のお店を探してみてください
          </p>
          <div class="bg-none pt-10 pb-24">
            <!-- search area (検索エリア) -->
            <div class="search-area">
              <div class="search-form">
                <form>
                  <div class="md:flex md:justify-center md:items-center">
                    <div class="area
                                flex justify-center items-center px-10">
                      <div class="relative select w-72">
                        <select
                          v-model="radius"
                          class="select-text
                                 block appearance-none
                                 w-72
                                 leading-tight
                                 px-4 py-3
                                 rounded-l
                                 focus:outline-none">
                          <option
                            value=""
                            disabled selected
                            class="kaisei-medium lora">
                          </option>
                          <option
                            value="500"
                            class="kaisei-medium lora">半径 500 m以内
                          </option>
                          <option
                            value="1000"
                            class="kaisei-medium lora">半径 1 km以内
                          </option>
                          <option
                            value="3000"
                            class="kaisei-medium lora">半径 3 km以内
                          </option>
                        </select>
                        <span class="select-highlight"></span>
                        <span class="select-bar w-72"></span>
                        <label class="select-label">Area</label>
                      </div>
                    </div>
                    <div class="flex justify-center items-center pt-10">
                      <div class="relative select w-72">
                        <select
                          v-model="type"
                          class="select-text
                                 block appearance-none
                                 w-72
                                 leading-tight
                                 px-4 py-3
                                 focus:outline-none">
                          <option
                            value=""
                            disabled selected
                            class="kaisei-medium lora">
                          </option>
                          <option
                            value="restaurant"
                            class="kaisei-medium lora">Restaurant
                          </option>
                          <option
                            value="cafe"
                            class="kaisei-medium lora">Cafe
                          </option>
                        </select>
                        <span class="select-highlight"></span>
                        <span class="select-bar w-72"></span>
                        <label class="select-label">Category</label>
                      </div>
                    </div>
                    <div class="flex justify-center items-center">
                      <button
                        type="submit"
                        @click.prevent="getCurrentLatLng"
                        class="search-button
                               rounded pl-10
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
      </div>
      <!-- Ranking (ランキング) -->
      <div
        v-if="ranking"
        class="beige-bg h-auto">
        <p class="small-title-beige text-center p-10">Ranking</p>
        <div class="animate__animated invisible">
          <div class="grid grid-rows-2 h-auto">
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
                お気に入りのお店ランキングと気になるお店ランキングです
              </p>
            </div>
            <div class="row-span-1 bg-none"></div>
          </div>
          <!-- Favorite -->
          <div class="ranking pb-10">
            <p class="ranking-title p-5 text-center">Favorited Places Ranking</p>
            <swiper :options="swiperOption">
              <swiper-slide
                v-for="favorite in favorites"
                :key="favorite.id">
                <div class="flex p-5 items-start justify-center flex-row flex-wrap">
                  <!-- shop layout -->
                  <div class="mx-6 my-10 card">
                    <!-- shop image -->
                    <div class="card-header">
                      <img :src="favorite.photo_1" width="300" height="300" class="card-image">
                    </div>
                    <!-- shop description and button(favorite and mark) -->
                    <section class="card-body">
                      <div class="shop-description">
                        <!-- shop name -->
                        <div class="place-name flex justify-center items-center p-1">
                          <p class="text-center text-navyblue kaisei-medium">{{favorite.name }}</p>
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
                              <i class="fas fa-bookmark marked"></i> {{ favorite.bookmark_count }}
                              <i class="fas fa-users icon-color-blue"></i>
                            </div>
                          </div>
                        </li>
                        <li class="text-navyblue kaisei-medium">
                          <a :href="ranking.website" target="_blank">
                            website <i class="fas fa-external-link-alt icon-color-blue"></i>
                          </a>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <!-- mark -->
          <div class="ranking pb-10">
            <p class="ranking-title p-5 text-center">Marked Places Ranking</p>
            <swiper :options="swiperOption">
              <swiper-slide
                v-for="mark in bookmarks"
                :key="mark.id">
                <div class="flex p-5 items-start justify-center flex-row flex-wrap">
                  <!-- shop layout -->
                  <div class="mx-6 my-10 card">
                    <!-- shop image -->
                    <div class="card-header">
                      <img :src="mark.photo_1" width="300" height="300" class="card-image">
                    </div>
                    <!-- shop description and button(favorite and mark) -->
                    <section class="card-body">
                      <div class="shop-description">
                        <!-- shop name -->
                        <div class="place-name flex justify-center items-center p-1">
                          <p class="text-center text-navyblue kaisei-medium">{{mark.name }}</p>
                        </div>
                      </div>
                      <ul class="card-information">
                        <li class="text-navyblue kaisei-medium">
                          {{ mark.add_short }}
                        </li>
                        <li class="text-navyblue kaisei-medium">
                          <i class="fas fa-star icon-color-yellow"></i> {{ mark.all_rating }}
                        </li>
                        <li class="text-navyblue kaisei-medium">
                          <div class="flex justify-start items-center">
                            <div class="favorited_users">
                              <i class="fas fa-heart liked"></i> {{ mark.favorite_count }}
                              <i class="fas fa-users icon-color-blue"></i>
                            </div>
                            <div class="bookmarked_users mx-5">
                              <i class="fas fa-bookmark marked"></i> {{ mark.bookmark_count }}
                              <i class="fas fa-users icon-color-blue"></i>
                            </div>
                          </div>
                        </li>
                        <li class="text-navyblue kaisei-medium">
                          <a :href="ranking.website" target="_blank">
                            website <i class="fas fa-external-link-alt icon-color-blue"></i>
                          </a>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <!-- Place Serch Results (検索結果)-->
      <div id="map"></div>
      <div
        v-if="placeResults"
        class="beige-bg h-auto">
        <p class="small-title-beige text-center p-10">Places</p>
        <div class="animate__animated invisible">
          <div
            id="shop"
            class="flex
                   justify-center
                   items-start
                   flex-row
                   flex-wrap
                   px-5
                   beige-bg
                   h-auto">
            <div v-for="(place, index) in places" :key="index">
              <!-- shop layout -->
              <div class="m-4">
                <!-- shop image -->
                <div class="place-image">
                  <img v-bind:src="place.photourl" width="300" height="300">
                </div>
                <!-- shop description and button(favorite and mark) -->
                <div class="place-description">
                  <!-- shop name -->
                  <div class="place-name flex justify-center items-center pb-1 pt-5">
                    <p class="text-nvybrown text-center kaisei-medium">
                      {{ place.name }}
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
      <!-- footer -->
      <footer class="navypink-bg h-auto">
        <p class="text-beige text-center p-5 lora">
          <i class="far fa-copyright copyright"></i>
          2022 Wakana T
        </p>
      </footer>
    </div>
    <!-- top page icon -->
    <a href="#" class="page-top" @click.prevent="pageTop">Top</a>
  </div>
</template>

<script>
import $ from 'jquery';
import firebase from 'firebase/app';
import GoogleMapsApiLoader from 'google-maps-api-loader';
import { getRankingFavorited, getRankingMarked } from '@/services/firebaseService';

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
      google: null,
      google_shop: null,
      isActive: true,
      lat: '',
      lng: '',
      radius: '',
      type: '',
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
      placeResults: false,
    };
  },
  async mounted() {
    // ログイン状態の変化を監視する
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // ログイン中
        this.currentUID = user.uid;
        this.isActive = false;
        // ログインユーザがいいねしているplaceのidを取得
        await firebase.firestore().collection('favorites').where('user_id', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((docPlaceId) => {
              this.userLikedPlaceId.push(docPlaceId.data().place_id);
            });
          })
          .catch((error) => {
            console.log('Error getting documents: ', error);
          });
        await firebase.firestore().collection('bookmarks').where('user_id', '==', user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((docPlaceId) => {
              this.userBookmarkPlaceId.push(docPlaceId.data().place_id);
            });
          })
          .catch((error) => {
            console.log('Error getting documents: ', error);
          });
      } else {
        // ログアウト中
        this.isActive = true;
      }
    });
    // 検索用のgoogle
    this.google = await GoogleMapsApiLoader({
      libraries: ['places'],
      apiKey: process.env.VUE_APP_GOOGLEMAPS_APIKEY,
    });
    // shopの詳細データを取得する用のgoogle
    this.google_shop = await GoogleMapsApiLoader({
      apiKey: process.env.VUE_APP_GOOGLEMAPS_APIKEY,
    });
    this.wayPoints();
    this.updateButton();
  },
  methods: {
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
      // 検索用のgoogle
      this.google = await GoogleMapsApiLoader({
        libraries: ['places'],
        apiKey: process.env.VUE_APP_GOOGLEMAPS_APIKEY,
      });
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    },
    success(position) {
      this.ranking = false;
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.searchPlace();
    },
    error(err) {
      console.log(err.message);
    },
    // 現在地周辺の地図とお店の取得
    searchPlace() {
      this.ranking = false;
      if (this.placeResults === false) {
        this.placeResults = true;
      } else {
        this.placeResults = false;
        this.placeResults = true;
      }
      const currentlatlng = new this.google.maps.LatLng(this.lat, this.lng);
      const map = new this.google.maps.Map(document.getElementById('map'), {
        center: currentlatlng,
        zoom: 15,
      });
      // 検索結果からお店の名前をplacesに入れる
      const callback = (results, status) => {
        if (status === this.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i += 1) {
            const place = results[i];
            const shopid = place.place_id;
            const shopname = place.name;
            const photos = place.photos;
            const url = photos[0].getUrl({ width: 300, height: 400 });
            const shopadd = place.vicinity;
            const hairetsu = {
              id: shopid,
              name: shopname,
              add: shopadd,
              photourl: url,
            };
            this.places.push(hairetsu);
          }
          console.log(this.places);
        }
      };
      // 検索条件
      const request = {
        location: currentlatlng,
        radius: this.radius,
        type: [this.type],
      };
      // nearbySearchで検索
      const service = new this.google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    },
    // お気に入り機能
    onFavorite(place) {
      // userLikedPlaceIdにplace.idを追加する
      this.userLikedPlaceId.push(place.id);
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
            this.confirmFavShopData(place.id);
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
    confirmFavShopData(placeId) {
      const docRef = firebase.firestore().collection('places').doc(placeId);
      docRef.get().then((doc) => {
        if (doc.exists) {
          // お店の情報がすでに登録されていたら、favorite_countを+1して更新
          const favCount = doc.data().favorite_count + 1;
          docRef.update({
            favorite_count: favCount,
          });
        } else {
          // 登録されていなかったら、getFavShopDada()
          this.getFavShopData(placeId);
        }
      }).catch((error) => {
        console.log('No data!', error);
      });
    },
    getFavShopData(id) {
      const shop = new this.google_shop.maps.Map(document.getElementById('map'));
      const request = {
        placeId: id,
      };
      const callback = (result, status) => {
        if (status === this.google_shop.maps.places.PlacesServiceStatus.OK) {
          console.log(result);
          // placesにデータを保存
          const docRef = firebase
            .firestore()
            .collection('places')
            .doc(id);
          docRef.set({
            id: result.place_id,
            name: result.name,
            add_short: result.vicinity,
            website: result.website,
            all_rating: result.rating,
            favorite_count: 1,
            bookmark_count: 0,
            photo_1: result.photos[0].getUrl({ width: 300, height: 400 }),
          });
        }
      };
      const service = new this.google_shop.maps.places.PlacesService(shop);
      service.getDetails(request, callback);
    },
    offFavorite(place) {
      // userLikedPlaceIdから削除する
      this.userLikedPlaceId = this.userLikedPlaceId.filter((id) => id !== place.id);
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
      this.userBookmarkPlaceId.push(place.id);
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
    confirmBmShopData(placeId) {
      const docRef = firebase.firestore().collection('places').doc(placeId);
      docRef.get().then((doc) => {
        if (doc.exists) {
          // お店の情報がすでに登録されていたら、bookmark_countを+1して更新
          const bmCount = doc.data().bookmark_count + 1;
          docRef.update({
            bookmark_count: bmCount,
          });
        } else {
          // 登録されていなかったら、getBmShopDada()
          this.getBmShopData(placeId);
        }
      }).catch((error) => {
        console.log('No data!', error);
      });
    },
    getBmShopData(id) {
      const shop = new this.google_shop.maps.Map(document.getElementById('map'));
      const request = {
        placeId: id,
      };
      const callback = (result, status) => {
        if (status === this.google_shop.maps.places.PlacesServiceStatus.OK) {
          console.log(result);
          // placesにデータを保存
          const docRef = firebase
            .firestore()
            .collection('places')
            .doc(id);
          docRef.set({
            id: result.place_id,
            name: result.name,
            add_short: result.vicinity,
            website: result.website,
            all_rating: result.rating,
            favorite_count: 0,
            bookmark_count: 1,
            review_1: result.reviews[0].text,
            review_2: result.reviews[1].text,
            review_3: result.reviews[2].text,
            review_4: result.reviews[3].text,
            review_5: result.reviews[4].text,
            photo_1: result.photos[0].getUrl({ width: 300, height: 400 }),
            photo_2: result.photos[1].getUrl({ width: 300, height: 400 }),
            photo_3: result.photos[2].getUrl({ width: 300, height: 400 }),
            photo_4: result.photos[3].getUrl({ width: 300, height: 400 }),
            photo_5: result.photos[4].getUrl({ width: 300, height: 400 }),
          });
        }
      };
      const service = new this.google_shop.maps.places.PlacesService(shop);
      service.getDetails(request, callback);
    },
    offBookmark(place) {
      // userBookmarkPlaceIdから削除する
      this.userBookmarkPlaceId = this.userBookmarkPlaceId.filter((id) => id !== place.id);
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
    async createRanking() {
      // Ranking上位のお店の情報を取得
      this.favorites = await getRankingFavorited().catch((err) => {
        console.log('データを取得できませんでした', err);
      });
      this.bookmarks = await getRankingMarked().catch((err) => {
        console.log('データを取得できませんでした', err);
      });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&display=swap');
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
  .message-about {
    font-size: 40px;
  }
  .ranking-title {
    font-size: 30px;
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
  .message-about {
    font-size: 20px;
  }
  .ranking-title {
    font-size: 30px;
  }
}
@media screen and (min-width:768px) and ( max-width:1024px) {
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
  .message-about {
    font-size: 30px;
  }
  .ranking-title {
    font-size: 50px;
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
  .message-about {
    font-size: 40px;
  }
  .ranking-title {
    font-size: 50px;
  }
}

.top-message {
  top: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
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
  font-size: 35px;
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
  border-bottom: 3px solid rgba(0,0,0,0);
}
.select .select-text {
  appearance: none;
  -webkit-appearance:none;
  text-align: center;
}
.select:after {
  position: absolute;
  top: 30px;
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
  font-size: 10px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 10px;
  transition: 0.2s ease all;
}
.select-text:focus ~ .select-label, .select-text:valid ~ .select-label {
  color: #f2ebe5;
  top: -100px;
  transition: 0.2s ease all;
  font-size: 50px;
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
  width: 200px;
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
.select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {
  width: 287px;
}
.select-highlight {
  position: absolute;
  height: 60%;
  width: 100%;
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
  left: 68px;
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
.place-name {
  width: 300px;
  height: 60px;
}
.place-image {
  -moz-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -webkit-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -ms-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
}
.button-area-gap {
  width: 300px;
  height: 5px;
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
  height: 200px;
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
  height: 50px;
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
</style>
