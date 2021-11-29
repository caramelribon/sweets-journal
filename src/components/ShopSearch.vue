<template>
  <div class="search-from-group justify-content-center my-4">
    <div class="text-xl">お店の検索</div>
    <!-- 検索フォーム -->
    <form class="search-form">
      <!-- 入力フォーム -->
      <div class="input-field">
        <!-- 場所の入力(緯度と経度) -->
        <div class="text-input">
          <input
            type="text"
            placeholder="Enter your address"
            v-model="coordinates"
            />
          <i class="far fa-compass" @click="locatorButtonPressed"></i>
        </div>
        <!-- ~m(km)周辺を検索するか選択 -->
        <div class="nearby-select">
          <select v-model="radius">
            <option value="500">500 m</option>
            <option value="1000">1 km</option>
            <option value="3000">3 km</option>
          </select>
        </div>
        <!-- 検索ボタン
        <button
        class="search-button"
        @click="findCloseBuyButtonPressed"
        >
          <i class="fas fa-search-location"></i>
        </button>
        -->
      </div>
    </form>
  </div>
</template>

<script>
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
  },
};
</script>
