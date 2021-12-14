<template>
  <div class="favorites">
    <div class="py-16">
      <p class="shop-text text-4xl text-center">Favorite Shop</p>
    </div>
    <div class="flex p-5 items-start justify-center flex-row flex-wrap">
      <div v-for="info in infos" :key="info.id">
        <!-- shop layout -->
        <div class="m-4">
          <!-- shop image -->
          <div class="shop-image">
            <a @click="openShopInfo(info)" class="cursor-pointer">
              <img v-bind:src="info.photo_1" width="300" height="300">
            </a>
            <rinfo-modal @close="closeShopInfo" v-if="infomodal" :val="shopInfos"></rinfo-modal>
          </div>
          <!-- shop description and button(favorite and mark) -->
          <div class="shop-description">
            <!-- shop name -->
            <div class="shop-name flex justify-center items-center p-1">
              <p class="shop-text text-center">{{ info.name }}</p>
            </div>
            <!-- button-area-gap -->
            <div class="button-area-gap"></div>
            <!-- button (favorite and mark) -->
            <div class="button-area grid grid-cols-6">
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
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import RinfoModal from '@/components/RinfoModal.vue';
import { getFavorite } from '@/services/firebaseService';

export default {
  components: { RinfoModal },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData(); // 初期化処理
      next();
    });
  },
  data() {
    return {
      username: '',
      infos: [],
      infomodal: false,
    };
  },
  methods: {
    async getData() {
      // ログインしているユーザのuidを取得
      const user = firebase.auth().currentUser;
      const userUID = user.uid;
      // ログインユーザがお気に入りしたお店の情報を取得
      this.infos = await getFavorite(userUID).catch((err) => {
        console.log('データを取得できませんでした', err);
      });
    },
    openShopInfo(info) {
      this.infomodal = true;
      this.shopInfos = info;
    },
    closeShopInfo() {
      this.infomodal = false;
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
</style>
