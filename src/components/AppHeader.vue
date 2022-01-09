<template>
  <!-- header (ヘッダー) -->
  <header class="header w-full h-5">
    <nav id="header" class="z-30">
      <div
      class="w-full container mx-auto flex items-center
      justify-end mt-0 px-3 py-3">
        <div>
          <!-- Menu Button (メニューボタン) -->
          <div class="container">
            <input type="checkbox" id="actionMenuButton" @click="closeBalloon"/>
            <div class="actions-menu">
              <!-- Home Button (ホームボタン) -->
              <button class="btn btn--home bg-navyblue">
                <router-link
                  to='/'
                  class="block"
                >
                    <i class="fas fa-home b-home"></i>
                </router-link>
              </button>
              <!-- User Button (ユーザボタン) -->
              <button
                class="btn btn--user bg-lightpink relative"
                @click="showBalloon"
              >
                <i class="fas fa-user b-user"></i>
              </button>
              <span
                v-if="userinfo"
                class=
                 "userinfo
                  absolute
                  z-10
                  animate__animated
                  animate__fadeIn
                  animate__faster"
              >
                <!-- ログイン時 -->
                <div v-if="currentUID !== null">
                  <div class="userinfo">
                    <div class="text-center mt-2 mx-3 border-b">
                      <i class="fas fa-user-circle fa-4x user-icon"></i>
                      <p class="text-center py-1 moji text-navyblue">{{ username }}</p>
                    </div>
                    <div class="button mt-2 mx-3">
                      <div class="flex justify-center items-center">
                        <!-- Profile -->
                        <div
                          v-for="(rink, index) in rinks"
                          :key="`first-${index}`"
                          class="signup mr-1"
                        >
                          <router-link
                            class="block text-xs px-2 py-2 leading-none border
                            rounded text-white hover:border-transparent hover:text-navyblue
                            hover:bg-white"
                            v-bind:to=rink.path>
                              <p class="moji">{{ rink.title }}</p>
                          </router-link>
                        </div>
                        <!-- Logout -->
                        <div class="logout">
                          <router-link to="/">
                            <button
                              class=
                               "inline-block text-xs px-2 py-2 leading-none border
                                rounded text-white
                                hover:border-transparent hover:text-navyblue
                                hover:bg-white
                                moji"
                              type="button"
                              @click="onClickLogOut">
                                Logout
                            </button>
                          </router-link>
                        </div>
                      </div>
                    </div>
                    <div class="my-1 mx-2">
                      <p class="text-navyblue text-xs">
                        Thank you for logging in!<br>
                        Please enjoy this app!!
                      </p>
                    </div>
                  </div>
                </div>
                <!-- 未ログイン時 -->
                <div v-else>
                  <div class="userinfo">
                    <div class="text-center mt-2 mx-3 border-b">
                      <i class="fas fa-user-circle fa-4x user-icon"></i>
                      <p class="text-center py-1 moji text-navyblue">ゲスト</p>
                    </div>
                    <div class="button mt-2 mx-3">
                      <div class="flex justify-center items-center">
                        <!-- Sginup -->
                        <div class="signup mr-1">
                          <button
                            class="text-xs px-2 py-2 leading-none border rounded text-white
                            hover:border-transparent hover:text-navyblue hover:bg-white
                            cursor-pointer moji"
                            type="button"
                            @click="openSignupForm">
                              Sginup
                          </button>
                          <signup-modal @close="closeSignupForm" v-if="signupmodal"></signup-modal>
                        </div>
                        <!-- Login -->
                        <div class="login">
                          <button
                            class=
                            "inline-block
                            text-xs px-2 py-2 leading-none border rounded text-white
                            border-white hover:border-transparent hover:text-navyblue
                            hover:bg-white
                            moji"
                            type="button"
                            @click="openLoginForm">
                              Login
                          </button>
                          <login-modal @close="closeLoginForm" v-if="loginmodal"></login-modal>
                        </div>
                      </div>
                    </div>
                    <div class="my-1 mx-2">
                      <p class="text-navyblue text-xs">
                        Please try to register as a member (free of charge).
                      </p>
                    </div>
                  </div>
                </div>
              </span>
              <!-- Activity Button (アクティビティボタン) -->
              <button class="btn btn--activity bg-navypink">
                <router-link
                  to="/activity"
                  class="block"
                >
                    <i class="fas fa-apple-alt b-activity"></i>
                </router-link>
              </button>
              <label for="actionMenuButton" class="btn btn--large btn--menu"/>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import firebase from 'firebase/app';
import LoginModal from '@/components/LoginModal.vue';
import SignupModal from '@/components/SignupModal.vue';

export default {
  components: { LoginModal, SignupModal },
  data() {
    return {
      rinks: [{ title: 'Profile', path: '/profile' }],
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
          this.userinfo = false;
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
    closeBalloon() {
      if (this.userinfo === true) {
        this.userinfo = false;
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap');
.moji {
  font-family: 'Hachi Maru Pop', cursive;
}
.mojip {
  font-family: 'Yomogi', cursive;
}
.userinfo {
  background-color: #c6ada6;
  width: 150px;
  height: 180px;
  right: 220%;
  top: 100%;
}
.userinfo::after {
  border-left: 12px solid #c6ada6;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  right: -12px;
  top: 10%;
  content: '';
  position: absolute;
}
header {
  position: fixed;
}
input[type="checkbox"] {
  display: none;
}
.btn {
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
}
.btn--large {
  width: 60px;
  height: 60px;
}
.btn--menu:after, .btn--menu:before {
  content: "";
  display: block;
  width: 25px;
  height: 3px;
  background: #4f5666;
  position: absolute;
  top: 29px;
  left: 18px;
  transition: transform 100ms;
}
.btn--menu:after {
  transform: translateY(-5px);
}
.btn--menu:before {
  transform: translateY(5px);
}
.actions-menu {
  position: relative;
  width: 60px;
  height: 60px;
  right: 0px;
  bottom: 0px;
}
.actions-menu .btn {
  position: absolute;
  top: 8px;
  left: 8px;
  opacity: 0;
  transition: top 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
              left 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
              opacity 200ms;
}
.actions-menu .btn--menu {
  position: absolute;
  opacity: 1;
  top: 0;
  left: 0;
  z-index: 0;
}
.btn--menu, #actionMenuButton:checked + .actions-menu > .btn {
  opacity: 1;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}
#actionMenuButton:checked + .actions-menu > .btn--menu:after {
  transform: rotate(45deg);
}
#actionMenuButton:checked + .actions-menu > .btn--menu:before {
  transform: rotate(-45deg);
}
#actionMenuButton:checked + .actions-menu > .btn--activity {
  top: 80px;
}
#actionMenuButton:checked + .actions-menu > .btn--user {
  top: 60px;
  left: -50px;
}
#actionMenuButton:checked + .actions-menu > .btn--home {
  left: -70px;
}
.container {
  position: relative;
}
.b-home {
  color: #f2ebe5;
}
.b-user {
  color: #4f5666;
}
.b-activity {
  color: #f2ebe5;
}
.user-icon {
  color: #4f5666;
}
</style>
