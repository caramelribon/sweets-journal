<template>
  <!-- navigation -->
  <div class="navber">
    <!-- ログイン中 -->
    <nav id="header" class="w-full z-30 top-0 py-1">
      <div
      class="w-full container mx-auto flex flex-wrap items-center
      justify-between mt-0 px-6 py-3">
        <div class="order-1 md:order-2">
          <router-link class="font-semibold text-xl tracking-tight" v-bind:to=item.path>
            {{ item.title }}
          </router-link>
        </div>
        <div class="order-2 md:order-3 flex items-center balloonoya" id="nav-content">
          <button
          class="inline-block no-underline hover:text-black"
          @click="showBalloon">
            <svg
            class="fill-current hover:text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
              <circle fill="none" cx="12" cy="7" r="3"></circle>
              <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12
              10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21
              21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757
              2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"></path>
            </svg>
          </button>
          <span class="balloon1" id="makeImg">
            <div>
              
            </div>
          </span>
        </div>
      </div>
    </nav>
    <!-- 未ログイン -->
    <nav id="header" class="w-full z-30 top-0 py-1">
      <div
      class="w-full container mx-auto flex flex-wrap items-center
      justify-between mt-0 px-6 py-3">
        <div class="order-1 md:order-2">
          <router-link class="font-semibold text-xl tracking-tight" v-bind:to=item.path>
            {{ item.title }}
          </router-link>
        </div>
        <div class="order-2 md:order-3 flex items-center balloonoya" id="nav-content">
          <button
          class="inline-block no-underline hover:text-black"
          @click="showBalloon">
            <svg
            class="fill-current hover:text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
              <circle fill="none" cx="12" cy="7" r="3"></circle>
              <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12
              10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21
              21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757
              2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z"></path>
            </svg>
          </button>
          <span class="balloon1" id="makeImg">
            <div v-if="userinfo">
              
            </div>
          </span>
        </div>
      </div>
    </nav>
    
    <nav class="flex items-center justify-between flex-wrap p-6">
      <div
      class="flex items-center flex-shrink-0 text-white mr-6"
      v-for="(item, index) in tops" :key="index">
        <router-link class="font-semibold text-xl tracking-tight" v-bind:to=item.path>
          {{ item.title }}
        </router-link>
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
      userinfo: false,
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
      this.userinfo = false;
    },
    openSignupForm() {
      this.signupmodal = true;
    },
    closeSignupForm() {
      this.signupmodal = false;
      this.userinfo = false;
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
    showBalloon() {
      if(this.userinfo === false) {
        this.userinfo = true;
      } else {
        this.userinfo = false;
      }
    },
  },
};
</script>

<style>
</style>
