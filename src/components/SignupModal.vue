<template>
  <transition name="modal">
    <div class="overlay" @click="$emit('close')">
      <div class="panel" @click.stop>
        <!-- Signup Form -->
        <div class="flex justify-center items-center">
          <div class="w-full max-w-xm">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <p class="block text-center text-gray-700 font-bold m-2">Signup</p>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Username
                </label>
                <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                leading-tight focus:outline-none focus:shadow-outline"
                v-model="username"
                required
                type="text"
                placeholder="Userename">
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                  Email
                </label>
                <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                leading-tight focus:outline-none focus:shadow-outline"
                v-model="usermail"
                id="email"
                required
                type="email"
                placeholder="Useremail">
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                  Password
                </label>
                <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                v-model="userpass"
                required
                type="password"
                placeholder="******************">
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
            </form>
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
      username: '',
      usermail: '',
      userpass: '',
    };
  },
  methods: {
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

<style lang="scss">
.overlay {
  background: rgba(0, 0, 0, .8);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  transition: all .5s ease;
}
.panel {
  position: absolute;
  left: 50%;
  top: 40%;
  margin-left: -150px;
  margin-top: -100px;
  transition: all .3s ease;
}
.modal-enter,
.modal-leave-active {
  opacity: 0;
}
.modal-enter .panel,
.modal-leave-active .panel{
  top: -200px;
}
</style>
