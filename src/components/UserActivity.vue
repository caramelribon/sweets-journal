<template>
  <div class="activities">
    <div class="py-16">
      <p class="shop-text text-4xl text-center">User Activity</p>
    </div>
    <div class="flex p-5 items-start justify-center flex-row flex-wrap">
      <div v-for="(activity, index) in activities" :key="index">
        <!-- shop layout -->
        <div class="my-10 mx-6">
          <div class="shop-image relative">
            <!-- User Action -->
            <span class="absolute -top-14 -left-10">
              <span class="cicle relative">
                <span class="text-center top-9 absolute left-5">{{ activity.username }}が<br>
                {{ activity.action }}しました<br>
                <p class="text-xs m-1">{{ activity.createat }}</p></span>
              </span>
            </span>
            <!-- shop image -->
            <a @click="openShopInfo(activity)">
              <img v-bind:src="activity.photo1" width="300" height="300">
            </a>
            <info-modal @close="closeShopInfo" v-if="infomodal" :val="shopInfos"></info-modal>
          </div>
          <!-- shop description and button(favorite and mark) -->
          <div class="shop-description">
            <!-- shop name -->
            <div class="shop-name flex justify-center items-center p-1">
              <p class="shop-text text-center">{{ activity.placename }}</p>
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
    <div class="loader-wrap" v-show="loading">
      <div class="text">取得中...</div>
    </div>
    <div class="loader-wrap" v-show="noData">
      <div class="text">no data</div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import InfoModal from '@/components/InfoModal.vue';
import { getActivity } from '@/services/firebaseService';

export default {
  components: { InfoModal },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData(); // 初期化処理
      next();
    });
  },
  data() {
    return {
      activities: [],
      nextData: [],
      infomodal: false,
      shopInfos: '',
      pagingToken: null,
      // ロード中のアニメーション
      loading: false,
      // 非同期で取得中 通常: false, 通信中: true
      itemLoading: false,
      // データがあるかどうか
      nodata: false,
      // Activityデータの数
      dataCount: 1,
    };
  },
  mounted() {
    window.onscroll = () => {
      // 一定位置以上スクロールされればtrueを返す
      const bottomOfWindow = document.documentElement.scrollTop
      + window.innerHeight >= document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        if (this.dataCount >= 5) {
          // データが5件以上あるときは、5件づつ取得する
          this.loading = true;
          this.nextPage(5);
        } else if (this.dataCount < 5 && this.dataCount > 0) {
          // データが5件より少なかったら、残りのデータを取得する
          this.loading = true;
          this.nextPage(this.dataCount);
        } else if (this.dataCount === 0) {
          this.noData();
        } else {
          this.noData();
        }
      }
    };
  },
  methods: {
    // ページを開いたときに数件取得する
    async getData() {
      // データ数の取得
      const docRef = await firebase.firestore().collection('activityCount').doc('count');
      docRef.get().then((doc) => {
        this.dataCount = doc.data().activityCount;
      });
      console.log(this.dataCount);
      // 最初のデータの取得
      let data = [];
      data = await getActivity(5, this.pagingToken);
      // console.log('getData called');
      console.log(data);
      this.activities = data.BuffData;
      this.pagingToken = data.nextPageToken;
      this.dataCount -= 5;
      console.log(this.dataCount);
    },
    // 次のボタンを押したら、さらに1件取得
    async nextPage(num) {
      // 読込中は再読み込み防止
      if (this.itemLoading) return;
      // 取得データがもう存在しない場合は行わない
      if (this.isLastPage) return;
      // 次のデータを取得
      await getActivity(num, this.pagingToken)
        .then((data) => {
          this.activities = this.activities.concat(data.BuffData);
          this.pagingToken = data.nextPageToken;
          this.dataCount -= num;
          console.log(this.dataCount);
          // ローディングアニメーション非表示
          this.loading = false;
          // 読込中 false
          this.itemLoading = false;
        }).catch((error) => {
          // エラー出力
          console.log('データを取得できませんでした。', error);
          // ローディングアニメーション非表示
          this.loading = false;
          // 読込中 false
          this.itemLoading = false;
        });
    },
    openShopInfo(activity) {
      this.infomodal = true;
      this.shopInfos = activity;
    },
    closeShopInfo() {
      this.infomodal = false;
    },
    noData() {
      this.nodata = true;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');
.cicle {
  display: inline-block;
  background-color: #D9ADAD;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
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
