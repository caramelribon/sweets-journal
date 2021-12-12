<template>
  <!-- navigation -->
  <div class="navber">
    <nav class="flex items-center justify-between flex-wrap p-6">
      <div
      class="flex items-center flex-shrink-0 text-white mr-6"
      v-for="(item, index) in tops" :key="index">
        <router-link class="font-semibold text-xl tracking-tight" v-bind:to=item.path>
          {{ item.title }}
        </router-link>
      </div>
      <div class="block lg:hidden">
        <button
        class="flex items-center px-3 py-2 border rounded text-teal-200
        border-teal-400 hover:text-white hover:border-white">
          <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div v-if="currentUID !== null">
          <div class="text-sm lg:flex-grow"
          v-for="(item, index) in items" :key="index">
            <div class="flex">
              <router-link
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200
              hover:text-white"
              v-bind:to=item.path>
                {{ item.title }}
              </router-link>
            </div>
          </div>
        </div>
        <div v-if="currentUID !== null" class="flex">
          <!-- Login UserName -->
          <div class="login-username px-1">
            <button
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white
            border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            type="button"
            >
              {{ username }}
            </button>
          </div>
          <div class="logout">
            <button
              class="inline-block text-sm px-4 py-2 leading-none border rounded text-white
              border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              type="button"
              @click="onClickLogOut">
                Logout
            </button>
          </div>
        </div>
        <div v-else>
          <div class="flex">
            <!-- Sginup -->
            <div class="signup px-1">
              <button
                class="inline-block text-sm px-4 py-2 leading-none border rounded text-white
                border-white hover:border-transparent hover:text-teal-500 hover:bg-white
                mt-4 lg:mt-0"
                type="button"
                @click="openSignupForm">
                  Sginup
              </button>
              <signup-modal @close="closeSignupForm" v-if="signupmodal"></signup-modal>
            </div>
            <!-- Login -->
            <div class="login">
              <button
                class="inline-block text-sm px-4 py-2 leading-none border rounded text-white
                border-white hover:border-transparent hover:text-teal-500 hover:bg-white
                mt-4 lg:mt-0"
                type="button"
                @click="openLoginForm">
                  Login
              </button>
              <login-modal @close="closeLoginForm" v-if="loginmodal"></login-modal>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import LoginModal from '@/components/LoginModal.vue';
import SignupModal from '@/components/SignupModal.vue';

export default {
  components: { LoginModal, SignupModal },
  data() {
    return {
      tops: [{ title: 'Sweets Journal', path: '/' }],
      items: [
        { title: 'Profile', path: '/profile' },
        { title: 'Activity', path: '/activity' },
      ],
      loginmodal: false,
      signupmodal: false,
      currentUID: null,
      username: null,
    };
  },
  async created() {
    // ログイン状態の変化を監視する
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('状態：ログイン中');
        this.currentUID = user.uid;
        const docRef = firebase.firestore().collection('users').doc(user.uid);
        docRef.get()
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
      } else {
        console.log('状態：ログアウト');
        this.currentUID = null;
      }
    });
  },
  methods: {
    openLoginForm() {
      this.loginmodal = true;
    },
    closeLoginForm() {
      this.loginmodal = false;
    },
    openSignupForm() {
      this.signupmodal = true;
    },
    closeSignupForm() {
      this.signupmodal = false;
    },
    onClickLogOut() {
      firebase
        .auth()
        .signOut() // ログアウト実行
        .then(() => {
          // ログアウトに成功したときの処理
          console.log('ログアウトしました');
          this.loginmodal = false;
          this.signupmodal = false;
        })
        .catch((error) => {
          // ログアウトに失敗したときの処理
          console.error('ログアウトエラー', error);
        });
    },
  },
};
</script>

<style>
</style>
