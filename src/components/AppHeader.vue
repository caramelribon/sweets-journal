<template>
  <!-- navigation -->
  <div class="navber">
    <!-- ログイン中 -->
    <nav id="header" class="w-full z-30 top-0 py-1" v-if="currentUID !== null">
      <div
      class="w-full container mx-auto flex items-center
      justify-between mt-0 px-6 py-3">
        <div class="flex">
          <div class="font-bold text-xl mr-2"
          v-for="(top, index) in tops" :key="index">
            <div class="flex">
              <router-link
              class="block"
              v-bind:to=top.path>
                {{ top.title }}
              </router-link>
            </div>
          </div>
          <div class="text-base"
          v-for="(activity, index) in activities" :key="index">
            <div class="flex">
              <router-link
              class="block"
              v-bind:to=activity.path>
                {{ activity.title }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="flex items-center relative">
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
          <span class="userinfo absolute block" v-if="userinfo">
            <div class="userinfo">
              <div class="text-center mt-3 mx-3 border-b">
                <i class="fas fa-user-circle fa-5x"></i>
                <p class="text-center py-2">{{ username }}</p>
              </div>
              <div class="button m-3 mx-5">
                <div class="flex justify-between">
                  <!-- Profile -->
                  <div class="signup" v-for="(item, index) in items" :key="index">
                    <router-link
                      class="block text-sm px-4 py-2 leading-none border
                      rounded text-white hover:border-transparent hover:text-black
                      hover:bg-white
                      mt-4 lg:mt-0"
                      v-bind:to=item.path>
                        {{ item.title }}
                    </router-link>
                  </div>
                  <!-- Logout -->
                  <div class="logout">
                    <button
                      class="inline-block text-sm px-4 py-2 leading-none border rounded text-white
                      border-white hover:border-transparent hover:text-teal-500 hover:bg-white
                      mt-4 lg:mt-0"
                      type="button"
                      @click="onClickLogOut">
                        Logout
                    </button>
                  </div>
                </div>
              </div>
              <div class="message">
                <p class="m-3">会員登録(無料)すれば、気に入ったお店を登録できたり、
                気になるお店をマークすることができます^^ また、全ユーザのアクティビティも見れますよ♪</p>
              </div>
            </div>
          </span>
        </div>
      </div>
    </nav>
    <!-- 未ログイン -->
    <nav id="header" class="w-full z-30 top-0 py-1" v-else>
      <div
      class="w-full container mx-auto flex items-center
      justify-between mt-0 px-6 py-3">
        <div class="font-bold text-xl"
        v-for="(top, index) in tops" :key="index">
          <div class="flex">
            <router-link
            class="block"
            v-bind:to=top.path>
              {{ top.title }}
            </router-link>
          </div>
        </div>
        <div class="flex items-center relative">
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
          <span class="userinfo absolute" v-if="userinfo">
            <div class="userinfo">
              <div class="text-center mt-3 mx-3 border-b">
                <i class="fas fa-user-circle fa-5x"></i>
                <p class="text-center py-2">ゲスト</p>
              </div>
              <div class="button m-3 mx-5">
                <div class="flex justify-between">
                  <!-- Sginup -->
                  <div class="signup">
                    <button
                      class="text-sm px-4 py-2 leading-none border rounded text-white
                      hover:border-transparent hover:text-black hover:bg-white
                      mt-4 lg:mt-0 cursor-pointer"
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
              <div class="message">
                <p class="m-3">会員登録(無料)すれば、気に入ったお店を登録できたり、
                気になるお店をマークすることができます^^ また、全ユーザのアクティビティも見れますよ♪</p>
              </div>
            </div>
          </span>
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
      items: [{ title: 'Profile', path: '/profile' }],
      activities: [{ title: 'Activity', path: '/activity' }],
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
      if (this.userinfo === false) {
        this.userinfo = true;
      } else {
        this.userinfo = false;
      }
    },
  },
};
</script>

<style>
.userinfo {
  background-color: #D9ADAD;
  width: 200px;
  height: 350px;
  right: 150%;
  top: 0.5%;
}
.userinfo::after {
  border-left: 12px solid #D9ADAD;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  right: -12px;
  top: 1.5%;
  content: '';
  position: absolute;
  pointer-events: none;
  z-index: -1;
}
</style>
