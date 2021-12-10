import Vue from 'vue';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import '@/assets/style/tailwind.css';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyAzqarDWwEqwBOcqv0lka6btAplthkNWE4',
  authDomain: 'sweets-journal.firebaseapp.com',
  projectId: 'sweets-journal',
  storageBucket: 'sweets-journal.appspot.com',
  messagingSenderId: '1056662093482',
  appId: '1:1056662093482:web:e097b82c8a9a6666841ad3',
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
