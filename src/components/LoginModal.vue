<template>
  <transition name="modal">
    <div class="overlay" @click="$emit('close')">
      <div class="panel" @click.stop>
        <input type="radio" id="switch-open" name="switch"/>
        <input type="radio" id="switch-close" name="switch"/>
        <!-- Login Form -->
        <div class="login is-active">
          <div class="w-full max-w-xm">
            <h1 class="m-2">LOGIN</h1>
            <div class="group mb-4">
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <input
                v-model="usermail"
                required
                type="text"
                id="email"
                placeholder="E-Mail"
                name="mailLogin"/>
              <label for="email"></label>
            </div>
            <div class="group mb-6">
              <i class="fa fa-unlock-alt" aria-hidden="true"></i>
              <input
                v-model="userpass"
                required
                type="password"
                id="password"
                placeholder="Password"
                name="pswLogin"/>
              <label for="password"></label>
            </div>
            <input type="submit" value="LOGIN" @click="onClickLogIn"/>
            <label class="button-open" for="switch-open">
              SIGN UP
              <i class="fa fa-user-plus" aria-hidden="true"></i>
            </label>
          </div>
        </div>
        <div class="register is-active">
          <label class="button-close" for="switch-close">
            LOGIN
            <i class="fas fa-user-check" aria-hidden="true"></i>
          </label>
          <div class="inner">
            <h1 classs="beige">REGISTER</h1>
            <div class="group"><i class="fa fa-user" aria-hidden="true"></i>
              <input type="text" id="name" v-model="userName" placeholder="Name"/>
              <label for="name"></label>
            </div>
            <div class="group"><i class="fa fa-envelope" aria-hidden="true"></i>
              <input type="text" id="email" v-model="userMail" placeholder="E-Mail"/>
              <label for="email"></label>
            </div>
            <div class="group"><i class="fa fa-unlock-alt" aria-hidden="true"></i>
              <input type="password" id="password" v-model="userPass" placeholder="Password"/>
              <label for="password"></label>
            </div>
            <input type="submit" value="REGISTER" @click="onClickSignUp"/>
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
      userMail: '',
      userPass: '',
      userName: '',
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
        .createUserWithEmailAndPassword(this.userMail, this.userPass)
        .then(() => {
          // 登録に成功したときの処理
          console.log('登録しました');
          // Usernameの登録
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: this.userName,
          })
            .then(() => {
              // データベースへの登録
              const db = firebase.firestore();
              db.collection('users').doc(user.uid).set({
                uid: user.uid,
                emial: this.userMail,
                username: this.userName,
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
  background: rgba(0,0,0,0.7);
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
  color: #363a46; /*入力した文字の色*/
  padding: 14px 10px 14px 45px;
  margin-top: 20px;
  background: #afaaa6; /*loginの入力フォーム*/
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
  color: #f2ebe5; /*文字を入力したときの文字の色*/
  padding: 14px 10px 14px 45px;
  margin-top: 20px;
  background: #a15c4e; /*registerの入力フォームの背景*/
  z-index: 2;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 1px;
  position: relative;
}
.login .group input[type=text]::-moz-placeholder,
.login .group input[type=password]::-moz-placeholder {
  color: #727886;
}
.login .group input[type=text]:-ms-input-placeholder,
.login .group input[type=password]:-ms-input-placeholder {
  color: #727886;
}
.login .group input[type=text]::placeholder,
.login .group input[type=password]::placeholder {
  color: #727886;
}
.login .group input[type=text]:focus + label::before,
.login .group input[type=password]:focus + label::before {
  width: 100%;
}
.register .group input[type=text]::-moz-placeholder,
.register .group input[type=password]::-moz-placeholder {
  color: #c4b3af;
}
.register .group input[type=text]:-ms-input-placeholder,
.register .group input[type=password]:-ms-input-placeholder {
  color: #c4b3af;
}
.register .group input[type=text]::placeholder,
.register .group input[type=password]::placeholder {
  color: #c4b3af;
}
.register .group input[type=text]:focus + label::before,
.register .group input[type=password]:focus + label::before {
  width: 100%;
}
.panel .login input[type=submit] {
  align-self: flex-start;
  margin-top: 5px;
  padding: 10px 0;
  width: 150px;
  background: transparent;
  border-radius: 0 50px 50px 0;
  border-left: none !important;
  letter-spacing: 1px;
  cursor: pointer;
}
.panel .register input[type=submit] {
  align-self: flex-start;
  margin-top: 30px;
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
  background: #96928f;
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
  border: #3d424f solid 1px;
  color: #3d424f;
}
.panel .register {
  transform: translateX(-140px);
  position: relative;
}
.panel .login .button-open {
  position: absolute;
  width: 110px;
  height: 50px;
  padding: 10px 5px;
  background: none;
  border: #3d424f solid 1px;
  color: #3d424f;
  top: 270px;
  right: 15px;
  cursor: pointer;
  transition: transform 0.4s;
  z-index: 9;
  text-align: center;
  transition: all 0.2s linear;
  margin: 7% auto;
  letter-spacing: 0.05em;
}
.panel .register .button-close {
  position: absolute;
  width: 110px;
  height: 50px;
  padding: 10px 5px;
  background: none;
  border: #d5bdb9 solid 1px;
  color: #d5bdb9;
  top: 320px;
  right: 30px;
  cursor: pointer;
  transition: transform 0.4s;
  z-index: 9;
  text-align: center;
  transition: all 0.2s linear;
  margin: 7% auto;
  letter-spacing: 0.05em;
}
.panel .register .inner {
  filter: blur(5px);
  background: #8d5145; /*registerの背景8d5145*/
  box-shadow: 5px 14px 20px 0 #986055; /*影の色*/
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
  border: #d5bdb9 solid 1px;
  color: #d5bdb9;
}
.login h1 {
  text-align: center;
  font-weight: 100;
  font-size: 30px;
  letter-spacing: 2px;
  margin-top: 0;
  color: #3d424f; /*Loginの文字色*/
}

.login .group {
  position: relative;
  width: 100%;
}
.login .group i {
  color: #3d424f; /*navypinkアイコンの色*/
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
  height: 48px;
  z-index: 1;
  background: #c0bab6; /*beige入力フォームの上線(入力する前)*/
  top: 19px;
}
.login .group label::before {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  background: #4f5666; /*navypink入力フォームの上線(入力した後)*/
  transition: width 0.5s;
}
.register h1 {
  text-align: center;
  font-weight: 100;
  letter-spacing: 2px;
  margin-top: 0;
  color: #d5bdb9;
}
.register .group {
  width: 100%;
  position: relative;
}
.register .group i {
  color: #d5bdb9;
  position: absolute;
  top: 36px;
  left: 15px;
  z-index: 3;
  font-size: 13px;
}
.register .group label {
  display: block;
  position: absolute;
  width: 100%;
  height: 48px;
  z-index: 1;
  background: #ae6354; /*beige入力フォームの上線(入力する前)*/
  top: 19px;
}
.register .group label::before {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  background: #d5bdb9; /*navypink入力フォームの上線(入力した後)*/
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
}
input[id=switch-open]:checked ~ .register .button-close {
  visibility: visible;
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
/* button hover Animation */
.panel .login input[type=submit]:hover {
  background-color: #afaaa6;
  transition: background 0.5s
}
.panel .login .button-open:hover {
  transform: translatey(3px);
  box-shadow: none;
  background-color: #afaaa6;
}
.panel .login .button-open:hover {
  animation: ani9 0.4s ease-in-out infinite alternate;
}
.panel .register input[type=submit]:hover {
  background-color: #a15c4e;
  transition: background 0.5s
}
.panel .register .button-close:hover {
  transform: translatey(3px);
  box-shadow: none;
  background-color: #a15c4e;
}
.panel .register .button-close:hover {
  animation: ani9 0.4s ease-in-out infinite alternate;
}
@keyframes ani9 {
  0% {
      transform: translateY(3px);
  }
  100% {
      transform: translateY(5px);
  }
}
.error-message {
  display: inline-block;
  position: absolute;
  left: -5px;
  bottom: -35px;
  background: rgba(215, 102, 102, 0.9);
  padding: 0.8em;
  z-index: 2;
  color: #FFF;
  font-size: 13px;
  font-size: 0.8125rem;
  border-radius: 0.25em;
  visibility: hidden;
  /* prevent click and touch events */
  pointer-events: none;
  opacity: 0;
  -webkit-transition: opacity 0.2s 0, visibility 0 0.2s;
  -moz-transition: opacity 0.2s 0, visibility 0 0.2s;
  transition: opacity 0.2s 0, visibility 0 0.2s;
}
.error-message::after {
  /* triangle */
  content: "";
  position: absolute;
  left: 22px;
  bottom: 100%;
  height: 0;
  width: 0;
  border-bottom: 8px solid rgba(215, 102, 102, 0.9);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.msgShow {
  visibility: visible;
}
</style>
