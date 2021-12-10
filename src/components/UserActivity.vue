<template>
  <div class="favorites">
    <div class="flex p-5 items-start justify-center flex-row flex-wrap">
      <div v-for="activity in activities" :key="activity.id">
        <!-- shop layout -->
        <div class="m-4">
          <p>{{ activity.username }}が</p>
          <p>{{ activity.createat.getFullYear() }}/{{ activity.createat.getMonth()+1 }}/{{
          activity.createat.getDate() }} {{ activity.createat.getHours() }}:{{
          activity.createat.getMinutes() }}:{{ activity.createat.getSeconds() }}</p>
          <!-- shop image -->
          <div class="shop-image">
            <img v-bind:src="activity.photo1" width="300" height="300">
          </div>
          <!-- shop description and button(favorite and mark) -->
          <div class="shop-description bg-kon">
            <!-- shop name -->
            <div class="shop-name flex justify-center items-center p-1">
              <p class="shop-text text-white text-center">{{ activity.placename }}</p>
            </div>
            <!-- shop vicinity -->
            <div class="shop-vicinity flex justify-center items-center p-1">
              <p class="shop-text text-white text-center add-size">{{ activity.addS }}</p>
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
                <button>
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
import firebase from 'firebase/app';

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getActivity(); // 初期化処理
      next();
    });
  },
  data() {
    return {
      activities: [],
    };
  },
  methods: {
    getActivity() {
      const db = firebase.firestore();
      // activitiesからuser_id, place_id, action, create_atを取得する
      db.collection('activities').orderBy('create_at', 'desc').get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
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
                    this.activities.push({
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
        });
      console.log(this.activities);
    },
  },
};
</script>
