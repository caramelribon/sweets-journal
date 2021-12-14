<template>
  <div class="activities">
    <div class="py-16">
      <p class="shop-text text-4xl text-center">User Activity</p>
    </div>
    <button
    class="wrap row justify-center"
    v-if="pagingToken"
    @click="nextPaging();"
    >次のページ</button>
    <div class="flex p-5 items-start justify-center flex-row flex-wrap">
      <div v-for="activity in activities" :key="activity.id">
        <!-- shop layout -->
        <div class="my-10 mx-6">
          <div class="shop-image relative">
            <!-- User Action -->
            <span class="absolute -top-14 -left-10">
              <span class="cicle relative">
                <span class="text-center top-9 absolute left-5">{{ activity.username }}が<br>
                {{ activity.action }}しました<br>
                <p class="text-xs m-1">{{ activity.createat.getFullYear() }}/
                {{ activity.createat.getMonth()+1 }}/{{
                activity.createat.getDate() }} {{ activity.createat.getHours() }}:{{
                activity.createat.getMinutes() }}:{{ activity.createat.getSeconds() }}</p></span>
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
  </div>
</template>

<script>
import firebase from 'firebase/app';
import InfoModal from '@/components/InfoModal.vue';

export default {
  components: { InfoModal },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getAllData(4, ''); // 初期化処理
      next();
    });
  },
  data() {
    return {
      activities: [],
      infomodal: false,
      shopInfos: '',
      pagingToken: '',
      nextPageToken: '',
      BuffData: '',
    };
  },
  methods: {
    async getAllData(limit, pagingToken) {
      const db = firebase.firestore();
      let nextToken = '';
      const infos = [];
      let query = db.collection('activities').orderBy('create_at', 'desc').limit(limit);
      if (pagingToken !== '') {
        const [seconds, nanoseconds] = pagingToken.split(':');
        const timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
        query = query.startAfter(timestamp);
      }
      const result = await query.get().then((snapshot) => {
        if (snapshot.docs.length >= limit) {
          const last = snapshot.docs[snapshot.docs.length - 1];
          const lastData = last.data();
          const time = lastData.create_at;
          console.log(time);
          nextToken = `${time.seconds}:${time.nanoseconds}`;
          snapshot.forEach((doc) => {
            const userid = doc.data().user_id;
            const placeid = doc.data().place_id;
            const useraction = doc.data().action;
            const createtime = doc.data().create_at.toDate();
            // 取得したuser_idからusernameを取得
            db.collection('users').doc(userid).get()
              .then((userinfo) => {
                const userName = userinfo.data().username;
                // 取得したplace_idからplaceの情報を取得
                db.collection('places').doc(placeid).get()
                  .then((placeinfo) => {
                    if (!placeinfo.data()) {
                      return;
                    }
                    console.log(placeinfo.data());
                    const placeName = placeinfo.data().name;
                    const placeAdds = placeinfo.data().add_short;
                    const placeAddl = placeinfo.data().add_long;
                    const placePhoto1 = placeinfo.data().photo_1;
                    const placePhoto2 = placeinfo.data().photo_2;
                    const placePhoto3 = placeinfo.data().photo_3;
                    const placePhoto4 = placeinfo.data().photo_4;
                    const placePhoto5 = placeinfo.data().photo_5;
                    const placeWebsite = placeinfo.data().website;
                    const placeRating = placeinfo.data().all_rating;
                    const placeReview1 = placeinfo.data().review_1;
                    const placeReview2 = placeinfo.data().review_2;
                    const placeReview3 = placeinfo.data().review_3;
                    infos.push({
                      action: useraction,
                      createat: createtime,
                      username: userName,
                      placename: placeName,
                      addL: placeAddl,
                      addS: placeAdds,
                      photo1: placePhoto1,
                      photo2: placePhoto2,
                      photo3: placePhoto3,
                      photo4: placePhoto4,
                      photo5: placePhoto5,
                      website: placeWebsite,
                      rating: placeRating,
                      review1: placeReview1,
                      review2: placeReview2,
                      review3: placeReview3,
                    });
                  });
              });
          });
        }
        this.BuffData = infos;
        this.nextPageToken = nextToken;
      }).catch((err) => {
        console.log('エラーが発見されました：データ取得時', err);
      });
      return result;
    },
    async nextPaging() {
      await this.getAllData(3, this.pagingToken);
      this.activities = this.activities.concat(this.BuffData);
      this.pagingToken = this.nextPageToken;
    },
    openShopInfo(activity) {
      this.infomodal = true;
      this.shopInfos = activity;
    },
    closeShopInfo() {
      this.infomodal = false;
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
