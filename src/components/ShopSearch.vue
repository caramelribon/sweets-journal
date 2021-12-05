<template>
  <div class="bg-pink">
    <div class="my-5 text-gray-700 font-bold text-center text-2xl">Shop Serch</div>
    <form class="search-form">
      <div class="search-form max-w-md mx-auto">
        <!-- 現在地の緯度と経度 -->
        <div class="latlng-field md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
            >
              Current Location
            </label>
          </div>
          <div class="md:w-2/3 relative">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded
              w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
              focus:bg-white focus:border-gray-500"
              id="inline-full-name"
              type="text"
              v-model="getLatLng"
              />
            <div class="absolute inset-y-0 right-0
            flex items-center px-2 text-gray-700 cursor-pointer"
            >
              <i class="far fa-compass" @click="getCurrentLatLng"></i>
            </div>
          </div>
        </div>
        <!-- 検索範囲を選択 -->
        <div class="latlng-field md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="search-area">
              Area
            </label>
          </div>
          <div class="md:w-2/3 relative">
            <select
            v-model="radius"
            class="block appearance-none w-full bg-gray-200 border-2 border-gray-200
            text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none
            focus:bg-white focus:border-gray-500" id="search-area"
            >
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
        <!-- お店のカテゴリの選択 -->
        <div class="latlng-field md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
            class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="search-area">
              Category
            </label>
          </div>
          <div class="md:w-2/3 relative">
            <select
            v-model="type"
            class="block appearance-none w-full bg-gray-200 border-2 border-gray-200
            text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none
            focus:bg-white focus:border-gray-500" id="search-area"
            >
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
      </div>
      <!-- 検索ボタン -->
      <button
      class="text-white py-2 px-4 uppercase
      rounded bg-gray-500 hover:bg-gray-600
      shadow hover:shadow-lg
      font-medium transition transform hover:-translate-y-0.5 block mx-auto"
      type="submit"
      @click.prevent="searchPlace"
      >
        Search <i class="fas fa-search-location"></i>
      </button>
    </form>
    <div id="map"></div>
      <div class="flex p-5 items-start justify-center flex-row flex-wrap">
        <div v-for="place in places" :key="place.id">
          <!-- 1個目 -->
          <div class="m-4 shopphoto">
            <div class="nav-1 grid grid-cols-6 grid-rows-2">
              <div class="bg-kon col-span-5 row-span-2">
                <p class="shop-text text-white text-center m-2">{{ place.name }}</p>
              </div>
              <div class="bg-kon flex justify-center items-center">
                <button>
                  <i class="fas fa-store button-size text-white"></i>
                </button>
              </div>
              <div class="bg-kon flex justify-center items-center">
                <i class="fas fa-heart button-size text-white"></i>
              </div>
            </div>
            <div class="shop-image">
              <img v-bind:src="place.photourl" width="300" height="300">
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';

export default {
  data() {
    return {
      google: null,
      lat: '',
      lng: '',
      radius: '',
      type: '',
      places: [],
    };
  },
  async mounted() {
    this.google = await GoogleMapsApiLoader({
      libraries: ['places'],
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
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    },
    error(err) {
      console.log(err.message);
    },
    // 現在地周辺の地図とお店の取得
    searchPlace() {
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
            const shopname = place.name;
            const url = place.photos[0].getUrl({ width: 300, height: 400 });
            const hairetsu = { name: shopname, photourl: url };
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
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');
.nav-1 {
  width: 300px;
  height: 80px;
}
.shopphoto {
  -webkit-box-shadow: 0 5px 6px 1px #888;
  -moz-box-shadow:0 5px 6px 1px #888;
  box-shadow: 0 5px 6px 1px #888;
}
.shop-text {
  font-family: 'Hachi Maru Pop', cursive;
}
.button-size {
  font-size: 1.5em;
}
</style>
