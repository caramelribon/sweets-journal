import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import '@/assets/style/tailwind.css';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'swiper/css/swiper.css';

Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
