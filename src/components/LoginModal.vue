<template>
  <transition name="modal">
    <div class="overlay" @click="$emit('close')">
      <div class="panel" @click.stop>
        <!-- Login Form -->
        <div class="flex justify-center items-center">
          <div class="w-full max-w-xm">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <p class="block text-center text-gray-700 font-bold m-2">Login</p>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="usermail">
                  Email
                </label>
                <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                v-model="usermail"
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
