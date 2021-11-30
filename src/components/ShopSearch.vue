<template>
  <div class="search-from-group">
    <div class="text-xl text-center my-5">
      お店の検索
    </div>
    <!-- 検索フォーム -->
    <form class="search-form" @submit.prevent="findCloseBuyButtonPressed">
      <!-- 緯度と経度の取得 -->
      <div class="search-form max-w-md mx-auto">
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
              placeholder="Enter your address"
              v-model="coordinates"
              />
            <div class="absolute inset-y-0 right-0
            flex items-center px-2 text-gray-700 cursor-pointer"
            >
              <i class="far fa-compass" @click="locatorButtonPressed"></i>
            </div>
          </div>
        </div>
        <!-- ~m(km)周辺を検索するか選択 -->
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
        <!-- お店のカテゴリ -->
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
      >
        Search <i class="fas fa-search-location"></i>
      </button>
    </form>
  <!-- 検索結果 -->
    <div class="ui segment"  style="max-height:300px;">
      <div class="ui divided items">
          <div class="item" v-for="place in places" :key="place.id">
              <div class="content">
                  <div class="header">{{place.name}}</div>
                  <div class="meta">{{place.vicinity}}</div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_KEY = 'AIzaSyBkd3oEj98eAsy7WxQFNfy7EW6KdLZtVL8';

export default {
  data() {
    return {
      lat: 0,
      lng: 0,
      type: '',
      radius: '',
      places: [],
    };
  },
  computed: {
    coordinates() {
      return `${this.lat}, ${this.lng}`;
    },
  },
  methods: {
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    },
    success(position) {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    },
    error(err) {
      console.log(err.message);
    },
    findCloseBuyButtonPressed() {
      const getRequestURL = () => {
        const parameters = {
          key: API_KEY,
          location: `${this.lat},${this.lng}`,
          radius: `${this.radius}`,
          language: 'ja',
          type: `${this.type}`,
        };
        const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
        url.search = new URLSearchParams(parameters);
        return url;
      };
      const url = getRequestURL();
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.places = data.results;
        }).catch((error) => {
          console.log(error.message);
        });
    },
  },
};
</script>
