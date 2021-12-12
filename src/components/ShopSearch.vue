<template>
  <div>
    <div class="search">
      <div class="search-form mx-auto my-2 rounded-lg shadow-md">
        <form>
          <div class="mx-auto flex justify-center items-center">
            <!-- area -->
            <div class="flex justify-center items-center">
              <div class="relative">
                <select
                v-model="radius"
                class="block appearance-none w-full
                text-gray-700 py-3 px-4 pr-8 rounded-l leading-tight focus:outline-none
                select"
                >
                  <option value="" disabled selected>Area</option>
                  <option value="500">半径 500 m以内</option>
                  <option value="1000">半径 1 km以内</option>
                  <option value="3000">半径 3 km以内</option>
                </select>
                <div class="pointer-events-none absolute
                inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757
                    6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <!-- category -->
            <div class="flex justify-center items-center">
              <div class="relative">
                <select
                v-model="type"
                class="block appearance-none w-full
                text-gray-700 py-3 px-4 pr-8 rounded-r leading-tight focus:outline-none
                select"
                >
                  <option value="" disabled selected>Category</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="cafe">Cafe</option>
                </select>
                <div class="pointer-events-none absolute
                inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757
                    6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <!-- serch button -->
            <div class="button">
              <button
              class="text-white pl-2 uppercase
              rounded bg-none"
              type="submit"
              @click.prevent="getCurrentLatLng"
              >
                <i class="fas fa-search fa-2x"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- Ranking -->
    <div class="ranking" v-if='ranking'>
      <swiper :options="swiperOption">
        <swiper-slide v-for="ranking in rankings" :key="ranking.id">
          <div class="flex p-5 items-start justify-center flex-row flex-wrap">
            <!-- shop layout -->
            <div class="m-4">
              <!-- shop image -->
              <div class="shop-image">
                <img v-bind:src="ranking.photo_1" width="300" height="300">
              </div>
              <!-- shop description and button(favorite and mark) -->
              <div class="shop-description bg-kon">
                <!-- shop name -->
                <div class="shop-name flex justify-center items-center p-1">
                  <p class="shop-text text-white text-center">{{ ranking.name }}</p>
                </div>
                <!-- shop vicinity -->
                <div class="shop-vicinity flex justify-center items-center p-1">
                  <p class="shop-text text-white text-center add-size">{{ ranking.add_short }}</p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- Shop Serch Results -->
    <div id="map"></div>
    <div id="shop" class="flex p-5 items-start justify-center flex-row flex-wrap">
      <div v-for="place in places" :key="place.id">
        <!-- shop layout -->
        <div class="m-4 shopphoto">
          <!-- shop image -->
          <div class="shop-image">
            <img v-bind:src="place.photourl" width="300" height="300">
          </div>
          <!-- shop description and button(favorite and mark) -->
          <div class="shop-description bg-kon">
            <!-- shop name -->
            <div class="shop-name flex justify-center items-center p-1">
              <p class="shop-text text-white text-center">{{ place.name }}</p>
            </div>
            <!-- shop vicinity -->
            <div class="shop-vicinity flex justify-center items-center p-1">
              <p class="shop-text text-white text-center add-size">{{ place.add }}</p>
            </div>
            <!-- button-area-gap -->
            <div class="button-area-gap"></div>
            <!-- button (favorite and mark) -->
            <div class="button-area grid grid-cols-6">
              <div class="col-span-4"></div>
              <!-- mark button -->
              <div class="flex justify-center items-center">
                <button>
                  <i class="fas fa-store button-size text-white"></i>
                </button>
              </div>
              <!-- favorite button -->
              <div class="bg-kon flex justify-center items-center">
                <button @click="onFavorite(place)">
                  <i class="fas fa-heart button-size text-white"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';
import firebase from 'firebase/app';

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getRanking(); // 初期化処理
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
    };
  },
  async mounted() {
    // 検索用のgoogle
    this.google = await GoogleMapsApiLoader({
      libraries: ['places'],
      apiKey: 'AIzaSyBkd3oEj98eAsy7WxQFNfy7EW6KdLZtVL8',
    });
    // shopの詳細データを取得する用のgoogle
    this.google_shop = await GoogleMapsApiLoader({
      apiKey: 'AIzaSyBkd3oEj98eAsy7WxQFNfy7EW6KdLZtVL8',
    });
  },
  computed: {
    getLatLng() {
      return `${this.lat}, ${this.lng}`;
    },
  },
  methods: {
    // 現在地の緯度と経度の取得
    getCurrentLatLng() {
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
            const shopadd = place.vicinity;
            const url = place.photos[0].getUrl({ width: 300, height: 400 });
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
      const user = firebase.auth().currentUser;
      const db = firebase.firestore();
      // このお店がfavorites→user.uid→place.idにあるかどうか調べる
      const query = db.collection('favorites')
        .where('user_id', '==', user.uid)
        .where('place_id', '==', place.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // あったら、そのお店のお気に入りを解除し、favorite_countを-1にする
            // favorites→user.uid→place.idを削除
            query.docs.forEach(async (docdata) => {
              await docdata.ref.delete();
            });
            // shops→shop.id→favorite_countを-1にする
            const docFavRef = db.collection('places').doc(place.id);
            docFavRef.get().then((docFa) => {
              if (docFa.exists) {
                const favcount = docFa.data().favorite_count - 1;
                docFavRef.update({
                  favorite_count: favcount,
                });
              } else {
                console.log('Error');
              }
            })
              .catch((error) => {
                console.log('エラーです。', error);
              });
          } else {
            // なかったら、お気に入り登録とアクティビティ登録をする、confirmShopData()に進む
            // お気に入り登録
            db.collection('favorites').doc().set({
              user_id: user.uid,
              place_id: place.id,
            });
            this.onActivity(place.id, user.uid);
            this.confirmShopData(place.id);
          }
        })
        .catch((error) => {
          console.log('エラーです。', error);
        });
    },
    onActivity(placeId, userId) {
      const docRef = firebase
        .firestore()
        .collection('activities')
        .doc();
      docRef.set({
        user_id: userId,
        place_id: placeId,
        action: 'favorite',
        create_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
    },
    confirmShopData(placeId) {
      const docRef = firebase.firestore().collection('places').doc(placeId);
      docRef.get().then((doc) => {
        if (doc.exists) {
          const favcount = doc.data().favorite_count + 1;
          docRef.update({
            favorite_count: favcount,
          });
        } else {
          this.getShopData(placeId);
        }
      }).catch((error) => {
        console.log('エラーです。', error);
      });
    },
    getShopData(id) {
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
            add_long: result.formatted_address,
            add_short: result.vicinity,
            map_url: result.url,
            website: result.website,
            all_rating: result.rating,
            all_rating_num: result.user_ratings_total,
            favorite_count: 1,
            bookmark_count: 0,
            rating_1: result.reviews[0].rating,
            rating_2: result.reviews[1].rating,
            rating_3: result.reviews[2].rating,
            rating_4: result.reviews[3].rating,
            rating_5: result.reviews[4].rating,
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
    getRanking() {
      firebase
        .firestore()
        .collection('places')
        .orderBy('favorite_count', 'desc')
        .limit(3)
        .get()
        .then((placeinfo) => {
          placeinfo.forEach((doc) => {
            this.rankings.push(doc.data());
          });
        });
    },
  },
};
</script>

<style>
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
.search-form {
  width: 350px;
  padding: 7px;
  margin: auto;
  background-color: #D9ADAD;
  border-radius: 20px;
  -webkit-box-shadow: 0 5px 6px 1px #888;
  -moz-box-shadow:0 5px 6px 1px #888;
  box-shadow: 0 5px 6px 1px #888;
}
.select {
  background-color: #D9ADAD;
}
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
</style>
