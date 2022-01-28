<template>
  <div class="bg-beige">
    <!-- title -->
    <div class="h-auto navypink-bg">
      <div class="flex justify-center items-center pt-20">
        <p class="swt">Sweets</p>
      </div>
      <div class="flex justify-center items-center pb-20">
        <p class="jnl">Journal</p>
      </div>
    </div>
    <div class="contents">
      <!-- About -->
      <div class="beige-bg">
        <p class="small-title-beige text-center p-10">About</p>
        <div class="grid grid-cols-7 h-auto">
          <div class="col-span-3 bg-none"></div>
          <div class="col-span-4 bg-none animate__animated invisible">
            <p class="text-nvybrown text-4xl mt-12 mb-8 mx-24 lora-bold">
              Welcome to the Sweets Journal
            </p>
            <div class="flex justify-center items-center mx-24 mb-10">
              <p class="text-nvybrown text-2xl kaisei-medium">
                Sweets Journalでは、旅先で現在地周辺のカフェやレストランを見つけることができます。<br>
                また、会員登録をすることで、旅先で見つけたお店や、
                行けなかったけど気になったお店を簡単に保存することができます。<br>
                そして、皆が登録したお店をみることもできるので、
                他の会員がどんなお店に注目しているのかもわかります。<br>
                ぜひ、皆さんの旅先でお店を探したり、素敵なお店を保存したりしてみてください。
              </p>
            </div>
            <button
              class="text-nvybrown text-3xl ml-24 mb-32"
              @click.prevent="Try()">
              More
            </button>
          </div>
        </div>
      </div>
      <!-- Search -->
      <div class="navypink-bg h-auto">
        <p class="small-title-navypink text-center p-10">Search</p>
        <div class="grid grid-rows-2 h-auto animate__animated invisible">
          <div class="row-span-1">
            <p class="text-beige text-2xl text-center mt-10 mb-12 kaisei-medium">
              旅先で、現在地周辺のお店を探してみてください
            </p>
          </div>
          <div class="row-span-1 bg-none pt-10 pb-24">
            <!-- search area (検索エリア) -->
            <div class="search-area">
              <div class="search-form">
                <form>
                  <div class="flex justify-center items-center">
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
                    <div class="flex justify-center items-center">
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
                    <div>
                      <button
                        type="submit"
                        @click.prevent="getCurrentLatLng"
                        class="search-button
                               rounded pl-10
                               bg-none
                               text-white
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
              <p class="text-nvybrown text-2xl text-center mt-10 mb-12 kaisei-medium">
                お気に入りのお店ランキングと気になるお店ランキングです
              </p>
            </div>
            <div class="row-span-1 bg-none"></div>
          </div>
          <div class="ranking">
          <swiper :options="swiperOption">
            <swiper-slide
              v-for="ranking in rankings"
              :key="ranking.id">
              <div class="flex flex-row flex-wrap
                          justify-center items-start
                          p-5">
                <div class="mx-6 my-10">
                  <div class="shop-image
                              relative">
                    <!-- place image (お店の写真) -->
                    <a @click="openShopInfo(ranking)">
                      <img
                        v-bind:src="ranking.photo_1"
                        width="300"
                        height="300">
                    </a>
                    <!-- place description (お店の詳細情報) -->
                    <rinfo-modal
                      v-if="infomodal"
                      :val="shopInfos"
                      @close="closeShopInfo">
                    </rinfo-modal>
                  </div>
                  <!-- place name and button(favorite and mark) (お店の名前とお気に入り＆気になるボタン) -->
                  <div>
                    <!-- place name (お店の名前) -->
                    <div class="place-name
                                flex justify-center items-center
                                p-1">
                      <p class="shop-text
                                text-center">
                        {{ ranking.name }}
                      </p>
                    </div>
                    <!-- button-area-gap -->
                    <div class="button-area-gap"></div>
                    <!-- button (favorite and mark) -->
                    <div class="button-area
                                grid grid-cols-6">
                      <div class="col-span-4"></div>
                      <!-- favorite button -->
                      <div class="flex justify-center items-center">
                        <button @click="onFavorite(place)">
                          <i class="far fa-heart fa-lg"></i>
                        </button>
                      </div>
                      <!-- mark button -->
                      <div class="flex justify-center items-center">
                        <button>
                          <i class="far fa-bookmark fa-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
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
          <div class="grid grid-rows-2 h-auto">
            <div class="row-span-1">
              <p class="text-nvybrown text-2xl text-center mt-10 mb-12 kaisei-medium">
                のお店です
              </p>
            </div>
            <div class="row-span-1 bg-none"></div>
          </div>
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
      <!-- CopyRight -->
      <div class="navypink-bg h-auto">
        <p class="text-beige text-center p-5 lora">
          <i class="far fa-copyright copyright"></i>
          2022 Wakana T
        </p>
      </div>
    </div>
    <a href="#" class="page-top" @click.prevent="pageTop">Top</a>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';
import firebase from 'firebase/app';
import $ from 'jquery';
import RinfoModal from '@/components/RinfoModal.vue';
import { getRanking } from '@/services/firebaseService';

export default {
  components: { RinfoModal },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.createRanking(); // 初期化処理
      next();
    });
  },
  data() {
    return {
      google: null,
      google_shop: null,
      lat: '',
      lng: '',
      radius: '',
      type: '',
      places: [],
      rankings: [],
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
      infomodal: false,
      isActive: true,
      userLikedPlaceId: [],
      userBookmarkPlaceId: [],
      currentUID: null,
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
      this.rankings = await getRanking().catch((err) => {
        console.log('データを取得できませんでした', err);
      });
    },
    openShopInfo(ranking) {
      this.infomodal = true;
      this.shopInfos = ranking;
    },
    closeShopInfo() {
      this.infomodal = false;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&display=swap');
.sweets {
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
.journal {
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
.swt {
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
.jnl {
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
.navypink-bg {
  background-color: #a76e63;
  background: linear-gradient(to right, #ab766b, #9f6054, #945447);
}
.beige-bg {
  background-color: #f2ebe5;
  background: linear-gradient(to right, #f2ebe5, #eee5de, #eae2da);
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
.copyright {
  color: #f2ebe5;
}
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
  color: #3d4350;
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
.place-name {
  width: 300px;
  height: 60px;
}
.button-area-gap {
  width: 300px;
  height: 5px;
}
.place-image {
  -moz-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -webkit-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -ms-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
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
/*.search-form {
  width: 350px;
  padding: 7px;
  margin: auto;
  background-color: #D9ADAD;
  border-radius: 20px;
  -webkit-box-shadow: 0 5px 6px 1px #888;
  -moz-box-shadow:0 5px 6px 1px #888;
  box-shadow: 0 5px 6px 1px #888;
}*/
/*.select {
  background-color: #D9ADAD;
}*/
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
#photos li {
  display: inline-box;
  float: left;
}
button:disabled {
  opacity: .4;
}
.liked {
  color: #ff8882;
}
.bookmarked {
  color: #efdc71;
}
/* serch form (検索フォーム) */
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
/* Remove focus */
.select-text:focus {
  outline: none;
  border-bottom: 3px solid rgba(0,0,0,0);
}
/* Use custom arrow */
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
select {
  background-color: transparent;
  line-height: 2.0em;
}
option {
  background-color: #a76e63;
}
/* LABEL ======================================= */
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
/* active state */
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
/* BOTTOM BARS ================================= */
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
/* active state */
.select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {
  width: 287px;
}
/* HIGHLIGHTER ================================== */
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
</style>
