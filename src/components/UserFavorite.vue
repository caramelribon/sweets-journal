<template>
  <div class="favorites">
    <div class="flex p-5 items-start justify-center flex-row flex-wrap">
      <div v-for="info in infos" :key="info.id">
        <!-- shop layout -->
        <div class="m-4">
          <!-- shop image -->
          <div class="shop-image">
            <img v-bind:src="info.photourl" width="300" height="300">
          </div>
          <!-- shop description and button(favorite and mark) -->
          <div class="shop-description bg-kon">
            <!-- shop name -->
            <div class="shop-name flex justify-center items-center p-1">
              <p class="shop-text text-white text-center">{{ info.name }}</p>
            </div>
            <!-- shop vicinity -->
            <div class="shop-vicinity flex justify-center items-center p-1">
              <p class="shop-text text-white text-center add-size">{{ info.add }}</p>
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
      vm.getUser(); // 初期化処理
      next();
    });
  },
  data() {
    return {
      username: '',
      infos: [],
    };
  },
  methods: {
    getUser() {
      const db = firebase.firestore();
      const user = firebase.auth().currentUser;
      const userUID = user.uid;
      db.collection('users').doc(userUID).get()
        .then((doc) => {
          if (doc.exists) {
            this.username = doc.data().username;
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('エラー', error);
        });
      this.getPlaceId(db, userUID);
    },
    getPlaceId(db, userUID) {
      db.collection('favorites').where('user_id', '==', userUID).get()
        .then((snapShot) => {
          snapShot.forEach((doc) => {
            const id = doc.data().place_id;
            db.collection('places').doc(id).get()
              .then((info) => {
                const infos = {
                  id: info.data().id,
                  name: info.data().name,
                  add: info.data().add_short,
                  photourl: info.data().photo_1,
                };
                this.infos.push(infos);
              });
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
</style>
