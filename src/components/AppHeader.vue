<template>
  <!-- header (ヘッダー) -->
  <header class="header w-full h-5">
    <nav
      id="header"
      class="z-30">
      <div
        class="flex justify-end items-center
               container
               w-full
               mx-auto mt-0 px-0 py-3">
        <!-- Menu Button (メニューボタン) -->
        <div class="menu">
          <input
            type="checkbox"
            id="actionMenuButton"
            @click="closeBalloon"/>
          <div class="actions-menu">
            <!-- Home Button (ホームボタン) -->
            <button
              class="btn btn--home
                     bg-navyblue">
              <router-link
                to='/'
                class="block">
                  <i class="fas fa-home b-home"></i>
              </router-link>
            </button>
            <!-- User Button (ユーザボタン) -->
            <button
              class="btn btn--user
                     bg-lightpink
                     relative"
              @click="openBalloon">
              <i class="b-user fas fa-user"></i>
            </button>
            <span
              v-if="userinfo"
              class="userinfo
                     absolute
                     z-10
                     animate__animated animate__fadeIn animate__faster">
              <!-- ログイン時 -->
              <div v-if="currentUID !== null">
                <div class="userinfo">
                  <!-- Login User Name (ユーザの名前) -->
                  <div
                    class="mt-2 mx-3
                           border-b
                           text-center">
                    <i class="user-icon fas fa-user-circle fa-4x"></i>
                    <p
                      class="text-center
                             py-1
                             text-navyblue moji">
                      {{ username }}
                    </p>
                  </div>
                  <!-- Button Area (ボタンエリア) -->
                  <div class="button mt-2 mx-3">
                    <div class="flex justify-center items-center">
                      <!-- User Profile (ユーザのプロフィールに繋がるボタン) -->
                      <div class="signup mr-1">
                        <router-link
                          :to="{
                                  name: 'Profile',
                                  query: { userName: username,  userUID: currentUID},
                                }"
                          class="block
                                 leading-none border rounded
                                 px-2 py-2
                                 text-xs text-white
                                 hover:border-transparent hover:text-navyblue hover:bg-white"
                        >
                            <p class="moji">Profile</p>
                        </router-link>
                      </div>
                      <!-- Logout (ログアウトボタン) -->
                      <div class="logout">
                        <router-link to="/">
                          <button
                            class=
                             "inline-block
                              leading-none border rounded
                              px-2 py-2
                              text-xs text-white moji
                              hover:border-transparent hover:text-navyblue hover:bg-white"
                            type="button"
                            @click="onClickLogOut">
                              Logout
                          </button>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <!-- Message to LoginUser (ユーザへのメッセージ) -->
                  <div class="mx-2 my-1">
                    <p class="text-xs text-navyblue">
                      Thank you for logging in!<br>
                      Please enjoy this app!!
                    </p>
                  </div>
                </div>
              </div>
              <!-- 未ログイン時 -->
              <div v-else>
                <div class="userinfo">
                  <!-- Guest User (ゲストユーザの印) -->
                  <div class="text-center
                              mt-2 mx-3
                              border-b">
                    <i class="user-icon fas fa-user-circle fa-4x"></i>
                    <p class="text-center
                              py-1
                              text-navyblue moji">
                      ゲスト
                    </p>
                  </div>
                  <!-- Buuton Area (ボタンエリア) -->
                  <div class="button mt-2 mx-3">
                    <div class="flex justify-center items-center">
                      <!-- Sginup Button (サインインボタン) -->
                      <div class="signup mr-1">
                        <button
                          class="leading-none border rounded
                                 px-2 py-2
                                 text-xs text-white moji
                                 hover:border-transparent hover:text-navyblue hover:bg-white
                                 cursor-pointer"
                          type="button"
                          @click="openSignupForm">
                            Sginup
                        </button>
                        <signup-modal
                          v-if="signupmodal"
                          @close="closeSignupForm"></signup-modal>
                      </div>
                      <!-- Login Button (ログインボタン) -->
                      <div class="login">
                        <button
                          class="inline-block
                                 leading-none border border-white rounded
                                 px-2 py-2
                                 text-xs text-white moji
                                 hover:border-transparent hover:text-navyblue hover:bg-white"
                          type="button"
                          @click="openLoginForm">
                            Login
                        </button>
                        <login-modal
                          v-if="loginmodal"
                          @close="closeLoginForm"></login-modal>
                      </div>
                    </div>
                  </div>
                  <!-- Message to Guest User (ゲストユーザへのメッセージ) -->
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
                class="block">
                  <i class="fas fa-apple-alt b-activity"></i>
              </router-link>
            </button>
            <label for="actionMenuButton" class="btn btn--large btn--menu"/>
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
      currentUID: null,
      loginmodal: false,
      signupmodal: false,
      userinfo: false,
      username: null,
    };
  },
  async created() {
    // ログイン状態の変化を監視する
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('状態：ログイン中');
        // alert('Login');
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
    openSignupForm() {
      this.signupmodal = true;
    },
    closeSignupForm() {
      this.signupmodal = false;
      this.userinfo = false;
    },
    openLoginForm() {
      this.loginmodal = true;
    },
    closeLoginForm() {
      this.loginmodal = false;
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
    openBalloon() {
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
.b-home {
  color: #f2ebe5;
}
.b-user {
  color: #4f5666;
}
.b-activity {
  color: #f2ebe5;
}
.container {
  position: relative;
}
.user-icon {
  color: #4f5666;
}
.moji {
  font-family: 'Hachi Maru Pop', cursive;
}
.mojip {
  font-family: 'Yomogi', cursive;
}
</style>
