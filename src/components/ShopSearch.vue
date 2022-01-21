<template>
  <div class="bg-beige">
    <!-- design -->
    <div
      class="grid
             grid-cols-1
             sm:grid-cols-2
             md:grid-cols-3
             lg:grid-cols-4
             xl:grid-cols-6">
      <!-- title -->
      <div
        class="sm:col-span-2
               md:col-span-4
               lg:col-span-0
               xl:col-span-4
               bg-lightpink
               h-80">
        <p class="sweets absolute">Sweets</p>
        <p class="journal absolute mt-44 ml-72">Journal</p>
      </div>
      <div class="sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 bg-none h-80">
        <span class="chocolate-navypink">sweets</span>
      </div>
      <!-- About -->
      <div
        class="sm:col-span-2
               md:col-span-1
               lg:col-span-2
               xl:col-span-2
               bg-lightblue
               h-40
               flex
               justify-center
               items-center">
        <p class="txt text-navyblue text-7xl absolute bg-ltblue m-10">Ranking</p>
      </div>
      <div
        class="sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1
               bg-navyblue h-40 flex justify-center items-center">
      </div>
      <div class="sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-3 bg-navyblue h-40">
        <p class="txt text-lightpink text-3xl mx-5 my-2">
          Welcome to the Sweets Journal !!<br>
          With this app, you can find shops around your current location.<br>
          Click here for details of this app →
          <button class="">About</button>
        </p>
      </div>
      <!-- Ranking
      <div class="sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-3 bg-navygray h-40">
        <p class="txt text-beige text-3xl mx-5 my-2">
          We are displaying the top 5 shops in the ranking
          of your favorite shops and shops you care about^^♪
        </p>
      </div>
      <div
        class="sm:col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-1
               bg-navygray h-40 flex justify-center items-center">
        <p class="txt text-6xl text-beige">
          Ranking
        </p>
      </div>
      <div class="sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 bg-none h-40"></div>
      -->
    </div>
    <!-- search area (検索エリア)
    <div class="search-area">
      <div class="search-form
                  mx-auto my-2
                  rounded-lg
                  shadow-md">
        <form class="mojip">
          <div class="flex justify-center items-center
                      mx-auto">
            <div class="area
                        flex justify-center items-center">
              <div class="relative">
                <select
                  v-model="radius"
                  class="select
                         block appearance-none
                         w-full
                         leading-tight
                         px-4 py-3 pr-8
                         rounded-l
                         text-gray-700
                         focus:outline-none">
                  <option
                    value=""
                    disabled selected
                    class="mojip">Area
                  </option>
                  <option
                    value="500"
                    class="mojip">半径 500 m以内
                  </option>
                  <option
                    value="1000"
                    class="mojip">半径 1 km以内
                  </option>
                  <option
                    value="3000"
                    class="mojip">半径 3 km以内
                  </option>
                </select>
                <div class="v-icon
                            flex items-center
                            absolute
                            inset-y-0 right-0
                            px-2
                            text-gray-700
                            pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    class="w-4 h-4 fill-current">
                    <path d="M9.293 12.95l.707.707L15.657
                            8l-1.414-1.414L10 10.828
                            5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex justify-center items-center">
              <div class="relative">
                <select
                  v-model="type"
                  class="select
                         block appearance-none
                         w-full
                         leading-tight
                         px-4 py-3 pr-8
                         rounded-r
                         text-gray-700
                         focus:outline-none">
                  <option
                    value=""
                    disabled selected
                    class="mojip">Category
                  </option>
                  <option
                    value="restaurant"
                    class="mojip">Restaurant
                  </option>
                  <option
                    value="cafe"
                    class="mojip">Cafe
                  </option>
                </select>
                <div class="v-icon
                            flex items-center
                            absolute
                            inset-y-0 right-0
                            px-2
                            text-gray-700
                            pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    class="w-4 h-4 fill-current">
                    <path d="M9.293 12.95l.707.707L15.657
                             8l-1.414-1.414L10 10.828
                             5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="search-button">
              <button
                type="submit"
                @click.prevent="getCurrentLatLng"
                class="search-icon
                       rounded pl-2
                       bg-none
                       text-white
                       uppercase">
                <i class="fas fa-search fa-2x"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    -->
    <!-- Ranking (ランキング) -->
    <div
      v-if="ranking"
      class="ranking bg-lightblue">
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
    <!-- title -->
    <div class="title bg-navypink">
      <div class="flex justify-center items-center">
        <p class="swt">Sweets</p>
      </div>
      <div class="flex justify-center items-center">
        <p class="jnl">Journal</p>
      </div>
    </div>
    <!-- About -->
    <div class="about bg-beige">
      <p class="abt text-center p-10">About</p>
      <div class="grid grid-cols-7 h-auto">
        <div class="col-span-3 bg-none"></div>
        <div class="col-span-4 bg-none">
          <p class="text-nvybrown text-4xl txt mt-12 mb-8 mx-24 title-abt">
            Welcome to the Sweets Journal
          </p>
          <div class="flex justify-center items-center mx-24 mb-10">
            <p class="text-nvybrown text-2xl txt-about">
              Sweets Journalでは、旅先で現在地周辺のカフェやレストランを見つけることができます。<br>
              また、会員登録をすることで、旅先で見つけたお店や、
              行けなかったけど気になったお店を簡単に保存することができます。<br>
              そして、皆が登録したお店をみることもできるので、
              他の会員がどんなお店に注目しているのかもわかります。<br>
              ぜひ、皆さんの旅先でお店を探したり、素敵なお店を保存したりしてみてください。
            </p>
          </div>
          <button class="text-nvybrown text-3xl ml-24 mb-32">More</button>
        </div>
      </div>
    </div>
    <!-- Search -->
    <!-- Ranking -->
    <!-- Place Serch Results (検索結果)-->
    <div id="map"></div>
    <div id="shop" class="flex p-5 items-start justify-center flex-row flex-wrap">
      <div v-for="(place, index) in places" :key="index">
        <!-- shop layout -->
        <div class="m-4">
          <!-- shop image -->
          <div class="shop-image">
            <div>
              <img v-bind:src="place.photourl" width="300" height="300">
            </div>
          </div>
          <!-- shop description and button(favorite and mark) -->
          <div class="shop-description">
            <!-- shop name -->
            <div class="shop-name flex justify-center items-center p-1">
              <p class="shop-text text-center">{{ place.name }}</p>
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
                <button>
                  <i class="far fa-bookmark fa-lg"></i>
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
      currentUID: null,
    };
  },
  async mounted() {
    // ログイン状態の変化を監視する
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.currentUID = user.uid;
        // console.log('状態：ログイン中');
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
        console.log(this.userLikedPlaceId);
      } else {
        // console.log('状態：ログアウト');
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
            if (!url) {
              return;
            }
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
      // このお店がfavorites→user.uid→place.idにあるかどうか調べる
      const db = firebase.firestore();
      const query = db.collection('favorites')
        .where('user_id', '==', this.currentUID)
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
              user_id: this.currentUID,
              place_id: place.id,
            });
            this.onActivity(place.id, this.currentUID);
            this.confirmShopData(place.id);
          }
        })
        .catch((error) => {
          console.log('エラーです。', error);
        });
    },
    onActivity(placeId, userId) {
      const db = firebase.firestore();
      const docRef = db
        .collection('activities')
        .doc();
      docRef.set({
        user_id: userId,
        place_id: placeId,
        action: 'favorite',
        create_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
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
    async createRanking() {
      // Ranking上位のお店の情報を取得
      this.rankings = await getRanking().catch((err) => {
        console.log('データを取得できませんでした', err);
      });
    },
    offFavorite(place) {
      // userLikedPlaceIdから削除する
      this.userLikedPlaceId = this.userLikedPlaceId.filter((id) => id !== place.id);
      // favoriteのコレクションから削除する
      firebase.firestore().collection('favorites')
        .where('user_id', '==', this.currentUID)
        .where('place_id', '==', place.id)
        .get()
        .then((snapShot) => {
          snapShot.forEach(async (doc) => {
            if (doc.exists) {
              // あったら、そのお店のお気に入りを解除し、favorite_countを-1にする
              // favorites→user.uid→place.idを削除
              await doc.ref.delete();
              console.log('削除しました');
              // shops→shop.id→favorite_countを-1にする
              const docFavRef = firebase.firestore().collection('places').doc(place.id);
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
              console.log('データがないです');
            }
          });
        })
        .catch((error) => {
          console.log('エラーです。', error);
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&display=swap');
.lobster {
  font-family: 'Antic Didone', serif;
}
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
.title {
  height: 750px;
  background-color: #a76e63;
  background: linear-gradient(to right, #ab766b, #9f6054, #945447);
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
.about {
  background-color: #f2ebe5;
  background: linear-gradient(to right, #f2ebe5, #eee5de, #eae2da);
}

.abt {
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
.title-abt {
  font-family: 'Lora', serif;
  font-weight: bold;
}
.txt {
  font-family: 'Antic Didone', serif;
}
.txt-about {
  font-family: 'Kaisei Decol', serif;
  font-weight: medium;
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

.place-name {
  width: 300px;
  height: 60px;
}
.button-area-gap {
  width: 300px;
  height: 5px;
}
.photo-image {
  -webkit-box-shadow: 0 5px 6px 1px #888;
  -moz-box-shadow:0 5px 6px 1px #888;
  box-shadow: 0 5px 6px 1px #888;
}
.button-area {
  width: 300px;
  height: 40px;
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
button:disabled {
  opacity: .4;
}
.liked {
  color: #ff8882;
}
</style>
