<template>
  <transition name="modal">
    <div class="overlay" @click="$emit('close')">
      <div class="panel" @click.stop>
        <input type="radio" id="switch-open" name="switch"/>
        <input type="radio" id="switch-close" name="switch"/>
        <!-- Login Form -->
        <div class="login">
          <div class="w-full max-w-xm">
            <form>
              <h1 class="m-2">LOGIN</h1>
              <div class="group mb-4">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <input
                  v-model="usermail"
                  required
                  type="text"
                  id="email"
                  placeholder="E-Mail"/>
                <label for="email"></label>
              </div>
              <div class="group mb-6">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                <input
                  v-model="userpass"
                  required
                  type="password"
                  id="password"
                  placeholder="Password"/>
                <label for="password"></label>
              </div>
              <div class="flex items-center justify-center">
                <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                focus:outline-none focus:shadow-outline"
                type="button"
                @click="onClickLogIn">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="register">
          <label class="button-open" for="switch-open"></label>
          <label class="button-close" for="switch-close"></label>
          <div class="inner">
            <h1>REGISTER</h1>
            <div class="group"><i class="fa fa-user" aria-hidden="true"></i>
              <input type="text" id="name" placeholder="Name"/>
              <label for="name"></label>
            </div>
            <div class="group"><i class="fa fa-envelope" aria-hidden="true"></i>
              <input type="text" id="email" placeholder="E-Mail"/>
              <label for="email"></label>
            </div>
            <div class="group"><i class="fa fa-unlock-alt" aria-hidden="true"></i>
              <input type="password" id="password" placeholder="Password"/>
              <label for="password"></label>
            </div>
            <div class="flex items-center justify-center">
              <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
              focus:outline-none focus:shadow-outline"
              type="button"
              @click="onClickSignUp">
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import firebase from 'firebase/app';

export default {
  data() {
    return {
      usermail: '',
      userpass: '',
    };
  },
  methods: {
    onClickLogIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usermail, this.userpass)
        .then(() => {
          // ログインに成功したときの処理
          console.log('ログインしました');
        })
        .catch((error) => {
          // ログインに失敗したときの処理
          console.error('ログインエラー', error);
        });
    },
    onClickSignUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.usermail, this.userpass)
        .then(() => {
          // 登録に成功したときの処理
          console.log('登録しました');
          // Usernameの登録
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: this.username,
          })
            .then(() => {
              // データベースへの登録
              const db = firebase.firestore();
              db.collection('users').doc(user.uid).set({
                uid: user.uid,
                emial: this.usermail,
                username: this.username,
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        })
        .catch((error) => {
          // 登録に失敗したときの処理
          console.error('登録エラー', error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  background: rgba(0, 0, 0, .8);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  transition: all .5s ease;
}
.login .group input[type=text], .login .group input[type=password] {
  width: 100%;
  border: none;
  color: #aaabb0;
  padding: 14px 10px 14px 45px;
  margin-top: 20px;
  background: #33374a;
  z-index: 2;
  font-family: "Lato", sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  position: relative;
}
.login .group input[type=text]:focus
+ label::before, .login .group input[type=password]:focus
+ label::before {
  width: 100%;
}
.register .group input[type=text], .register .group input[type=password] {
  width: 100%;
  border: none;
  color: #ffffff;
  padding: 14px 10px 14px 45px;
  margin-top: 20px;
  background: #f47471;
  z-index: 2;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 1px;
  position: relative;
}
.register .group input[type=text]::-moz-placeholder,
.register .group input[type=password]::-moz-placeholder {
  color: #ffffff;
}
.register .group input[type=text]:-ms-input-placeholder,
.register .group input[type=password]:-ms-input-placeholder {
  color: #ffffff;
}
.register .group input[type=text]::placeholder,
.register .group input[type=password]::placeholder {
  color: #ffffff;
}
.register .group input[type=text]:focus + label::before,
.register .group input[type=password]:focus + label::before {
  width: 100%;
}
.panel .register input[type=submit], .panel .login input[type=submit] {
  align-self: flex-start;
  margin-top: 20px;
  padding: 10px 0;
  width: 150px;
  background: transparent;
  border-radius: 0 50px 50px 0;
  border-left: none !important;
  letter-spacing: 1px;
  cursor: pointer;
}
@-webkit-keyframes loginOpen {
  0% {
    transform: translateX(140px);
  }
  50% {
    transform: translateX(-145px);
  }
  100% {
    transform: translateX(140px);
    z-index: -1;
  }
}
@keyframes loginOpen {
  0% {
    transform: translateX(140px);
  }
  50% {
    transform: translateX(-145px);
  }
  100% {
    transform: translateX(140px);
    z-index: -1;
  }
}
@-webkit-keyframes registerOpen {
  0% {
    transform: translateX(-140px);
  }
  50% {
    transform: translateX(145px);
  }
  100% {
    transform: translateX(-140px);
  }
}
@keyframes registerOpen {
  0% {
    transform: translateX(-140px);
  }
  50% {
    transform: translateX(145px);
  }
  100% {
    transform: translateX(-140px);
  }
}
@-webkit-keyframes loginClose {
  0% {
    transform: translateX(140px);
    z-index: -1;
  }
  50% {
    transform: translateX(-145px);
  }
  100% {
    transform: translateX(140px);
    z-index: 1;
  }
}
@keyframes loginClose {
  0% {
    transform: translateX(140px);
    z-index: -1;
  }
  50% {
    transform: translateX(-145px);
  }
  100% {
    transform: translateX(140px);
    z-index: 1;
  }
}
@-webkit-keyframes registerClose {
  0% {
    transform: translateX(-140px);
  }
  50% {
    transform: translateX(145px);
  }
  100% {
    transform: translateX(-140px);
  }
}
@keyframes registerClose {
  0% {
    transform: translateX(-140px);
  }
  50% {
    transform: translateX(145px);
  }
  100% {
    transform: translateX(-140px);
  }
}
* {
  box-sizing: border-box;
}
input {
  outline: none;
}
.panel {
  width: 640px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  margin: 0 auto;
}
.panel .login {
  width: 300px;
  height: 380px;
  background: #292c3b;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translateX(140px);
  position: relative;
  z-index: 1;
  transition: filter 0.5s;
}
.panel .login input[type=submit] {
  border: #f25d59 solid 1px;
  color: #f25d59;
}
.panel .register {
  transform: translateX(-140px);
  position: relative;
}
.panel .register .button-open, .panel .register .button-close {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 15px;
  right: 15px;
  cursor: pointer;
  transition: transform 0.4s;
  z-index: 9;
}
.panel .register .button-open::before, .panel .register .button-close::before {
  content: "";
  position: absolute;
  width: 2px;
  height: 100%;
  background: #ffffff;
  left: 10px;
}
.panel .register .button-open::after, .panel .register .button-close::after {
  content: "";
  position: absolute;
  width: 2px;
  height: 100%;
  background: #ffffff;
  left: 10px;
  transform: rotate(90deg);
}
.panel .register .inner {
  filter: blur(5px);
  background: #f25d59;
  box-shadow: 5px 14px 20px 0 #f68b88;
  width: 100%;
  width: 340px;
  height: 440px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: filter 0.5s;
}
.panel .register input[type=submit] {
  border: #ffffff solid 1px;
  color: #ffffff;
}
.register h1 {
  text-align: center;
  font-weight: 100;
  letter-spacing: 2px;
  margin-top: 0;
  color: #ffffff;
}
.register .group {
  width: 100%;
  position: relative;
}
.register .group i {
  color: #ffffff;
  position: absolute;
  top: 36px;
  left: 15px;
  z-index: 3;
  font-size: 13px;
  opacity: 0.8;
}
.register .group label {
  display: block;
  position: absolute;
  width: 100%;
  height: 45px;
  z-index: 1;
  background: #f69492;
  top: 19px;
}
.register .group label::before {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  background: #f04641;
  transition: width 0.5s;
}
.login h1 {
  text-align: center;
  font-weight: 100;
  letter-spacing: 2px;
  margin-top: 0;
}

.login .group {
  position: relative;
  width: 100%;
}
.login .group i {
  color: #f25d59;
  position: absolute;
  top: 36px;
  left: 15px;
  z-index: 3;
  font-size: 13px;
  opacity: 0.8;
}
.login .group label {
  display: block;
  position: absolute;
  width: 100%;
  height: 45px;
  z-index: 1;
  background: #42475f;
  top: 19px;
}
.login .group label::before {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  background: #f25d59;
  transition: width 0.5s;
}

.button-close {
  visibility: hidden;
}

input[id=switch-open]:checked ~ .login {
  filter: blur(5px);
  -webkit-animation: loginOpen forwards 0.8s;
          animation: loginOpen forwards 0.8s;
}
input[id=switch-open]:checked ~ .register {
  -webkit-animation: registerOpen forwards 0.8s;
          animation: registerOpen forwards 0.8s;
}
input[id=switch-open]:checked ~ .register > .inner {
  filter: blur(0);
}
input[id=switch-open]:checked ~ .register .button-open {
  visibility: hidden;
  transform: rotate(45deg);
}
input[id=switch-open]:checked ~ .register .button-close {
  visibility: visible;
  transform: rotate(45deg);
}

input[id=switch-close]:checked ~ .login {
  -webkit-animation: loginClose forwards 0.8s;
          animation: loginClose forwards 0.8s;
}
input[id=switch-close]:checked ~ .register {
  -webkit-animation: registerClose forwards 0.8s;
          animation: registerClose forwards 0.8s;
}
input[id=switch-close]:checked ~ .register > .inner {
  filter: blur(5px);
}

input[type=radio] {
  display: none;
}
</style>
