<template>
  <div
    class="user-activities
           navyblue-bg"
  >
    <!-- title -->
    <div class="p-10">
      <p
        class="title
               text-center
               text-6xl
               sm:text-6xl
               md:text-7xl
               lg:text-8xl
               xl:text-9xl
               2xl:text-9xl"
      >
        User Activity
      </p>
      <div
        class="animate__animated
               animate__fadeInUp
               mt-7"
      >
        <p
          class="text-beige
                 text-center
                 kaisei-medium
                 sm:text-base
                 md:text-2xl
                 lg:text-2xl
                 xl:text-2xl
                 2xl:text-2xl"
        >
          全ユーザのアクティビティです
        </p>
      </div>
      <div
        class="flex
               justify-center"
      >
        <div
          class="flex
                 justify-end
                 items-center
                 mt-5
                 sm:w-11/12
                 md:w-11/12
                 lg:w-4/5
                 xl:w-4/5
                 2xl:w-4/5
                 w-11/12"
        >
          <router-link
            :to="{
                    name: 'Ranking',
                    query: { userName: userName,  userUID: userUID},
                  }"
            class="block
                   lora-bold
                   text-lightgray
                   text-lg
                   text-center"
          >
               AllRanking
            <p
              class="text-xs
                     text-beige
                     kaisei-medium"
            >
              お店のランキングはこちら
            </p>
          </router-link>
        </div>
      </div>
    </div>
    <div
      class="flex
             items-start
             justify-center
             flex-row
             flex-wrap
             p-5"
    >
      <div
        v-for="(activity, index) in activities"
        :key="index"
      >
        <div
          class="relative
                 m-7
                 animate__animated
                 animate__fadeInUp"
        >
          <!-- User Action -->
          <span
            class="absolute
                   user-action"
          >
            <span
              class="flex
                     justify-start
                     items-center"
            >
              <p
                class="text-xl
                       mx-1
                       text-lightgray
                       lora-bold
                       user-name"
              >
                {{ activity.userName }}
              </p>
              <p
                class="text-sm
                       lora
                       mx-1"
                :class="{
                          liked: activity.action === 'favorite',
                          bookmarked: activity.action === 'mark'
                        }"
              >
                {{ activity.action }}
              </p>
              <p
                class="text-sm
                       mx-1
                       text-lightgray
                       lora"
              >
                {{ activity.create_at }}
              </p>
            </span>
          </span>
          <!-- shop layout -->
          <div class="card">
            <!-- shop image -->
            <div class="card-header">
              <img
                :src="activity.photo"
                width="300"
                height="300"
                class="card-image"
              >
            </div>
            <!-- shop description and button(favorite and mark) -->
            <section class="card-body">
              <div class="shop-description">
                <!-- shop name -->
                <div
                  class="place-info
                         m-2
                         text-center"
                >
                  <div class="my-1">
                    <p
                      class="text-navyblue
                             text-center
                             kaisei-medium"
                    >
                      {{ activity.name }}
                    </p>
                    <p
                      class="text-navyblue
                             text-center
                             kaisei-medium
                             text-xs
                             my-2"
                    >
                      {{ activity.catchcopy }}
                    </p>
                  </div>
                  <p
                    class="text-navyblue
                           kaisei-medium
                           text-xs
                           my-2"
                  >
                    {{ activity.access }}
                  </p>
                </div>
                <!-- button (favorite and mark) -->
                <div
                  class="flex
                         justify-end
                         items-center"
                >
                  <!-- favorite button -->
                  <div class="p-2">
                    <button
                      @click="onFavorite(activity)"
                      v-if="userLikedPlaceId.indexOf(activity.id) === -1"
                    >
                        <i class="far fa-heart fa-lg"></i>
                    </button>
                    <button
                      @click="offFavorite(activity)"
                      v-else
                    >
                        <i class="fas fa-heart fa-lg liked"></i>
                    </button>
                  </div>
                  <!-- mark button -->
                  <div class="p-2">
                    <button
                      @click="onBookmark(activity)"
                      v-if="userBookmarkPlaceId.indexOf(activity.id) === -1"
                    >
                      <i class="far fa-bookmark fa-lg"></i>
                    </button>
                    <button
                      @click="offBookmark(activity)"
                      v-else
                    >
                      <i class="fas fa-bookmark fa-lg bookmarked"></i>
                    </button>
                  </div>
                </div>
              </div>
              <ul class="card-information">
                <li
                  class="text-navyblue
                         kaisei-medium
                         text-xs"
                >
                  {{ activity.address }}
                </li>
                <li
                  class="text-navyblue
                         kaisei-medium
                         text-xs"
                >
                  予算:{{ activity.average }}
                </li>
                <li
                  class="text-navyblue
                         kaisei-medium
                         text-xs"
                >
                  Open:{{ activity.open }}
                </li>
                <li
                  class="text-navyblue
                         kaisei-medium
                         text-xs"
                >
                  <a
                    :href="activity.url"
                    target="_blank"
                  >
                    さらに詳しい情報こちら <i class="fas fa-external-link-alt icon-color-blue"></i>
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div
      id="observe_element"
      class="m-2"
    ></div>
    <div
      class="loader-wrap"
      v-show="loading"
    >
      <div class="text"></div>
    </div>
    <div
      class="loader-wrap"
      v-show="noData"
    >
      <div
        class="text
               no-data
               text-center"
      >
        no data
      </div>
    </div>
    <!-- footer -->
    <footer>
      <p
        class="text-beige
               text-center
               p-5
               lora"
      >
        <i class="far fa-copyright copyright"></i>
        2022 Wakana T
      </p>
    </footer>
    <a
      href="#"
      class="page-top"
      @click.prevent="pageTop"
    >
      Top
    </a>
  </div>
</template>

<script>
import $ from 'jquery';
import firebase from 'firebase/app';
import {
  getActivity,
  getFavPlaceId,
  getBmPlaceId,
  postFavActivity,
  delFavorite,
  postBmActivity,
  delBookmark,
} from '@/services/firebaseService';

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData(); // 初期化処理
      next();
    });
  },
  data() {
    return {
      activities: [],
      // Activityデータの数
      dataCount: 1,
      // 非同期で取得中 通常: false, 通信中: true
      itemLoading: false,
      // ロード中のアニメーション
      loading: false,
      nextData: [],
      // データがあるかどうか
      nodata: false,
      pagingToken: null,
      // Intersection Obsever
      observer: null,
      userLikedPlaceId: [],
      userBookmarkPlaceId: [],
      userName: this.$route.query.userName,
      userUID: this.$route.query.userUID,
    };
  },
  mounted() {
    const options = {
      rootMargin: '0px',
      threshold: 0.1,
    };
    this.observer = new IntersectionObserver(this.infiniteScroll, options);
    // 監視される要素をtargetにする
    const target = document.getElementById('observe_element');
    // 監視対象を監視している
    this.observer.observe(target);
    this.updateButton();
  },
  methods: {
    // dataの取得
    async getData() {
      // login userがfavoriteしたplaceのidを取得
      this.userLikedPlaceId = await getFavPlaceId(this.userUID).catch((err) => {
        console.log('Can not catch place_id login user favorited', err);
      });
      // login userがbookmarkしたplaceのidを取得
      this.userBookmarkPlaceId = await getBmPlaceId(this.userUID).catch((err) => {
        console.log('Can not catch place_id login user bookmarked', err);
      });
      // データ数の取得
      const docRef = await firebase.firestore().collection('activityCount').doc('count');
      docRef.get().then((doc) => {
        this.dataCount = doc.data().activityCount + 1;
      });
      console.log(this.dataCount);
      // 最初のデータの取得
      let data = [];
      data = await getActivity(5, this.pagingToken);
      this.activities = data.BuffData;
      this.pagingToken = data.nextPageToken;
      this.dataCount -= 5;
      console.log(this.dataCount);
    },
    // infinite scroll
    infiniteScroll() {
      if (this.dataCount >= 5) {
        // データが5件以上あるときは、5件づつ取得する
        this.loading = true;
        this.nextPage(5);
      } else if (this.dataCount < 5 && this.dataCount > 0) {
        // データが5件より少なかったら、残りのデータを取得する
        this.loading = true;
        this.nextPage(this.dataCount);
      } else if (this.dataCount === 0) {
        this.noData();
      }
    },
    async nextPage(num) {
      // 読込中は再読み込み防止
      if (this.itemLoading) return;
      // 取得データがもう存在しない場合は行わない
      if (this.isLastPage) return;
      // 次のデータを取得
      await getActivity(num, this.pagingToken)
        .then((data) => {
          this.activities = this.activities.concat(data.BuffData);
          this.pagingToken = data.nextPageToken;
          this.dataCount -= num;
          console.log(this.dataCount);
          // ローディングアニメーション非表示
          this.loading = false;
          // 読込中 false
          this.itemLoading = false;
        }).catch((error) => {
          // エラー出力
          console.log('データを取得できませんでした。', error);
          // ローディングアニメーション非表示
          this.loading = false;
          // 読込中 false
          this.itemLoading = false;
        });
    },
    // when no data
    noData() {
      this.nodata = true;
    },
    // お気に入り機能
    async onFavorite(place) {
      // activitiesにactivity情報を追加
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const hour = now.getHours();
      const min = now.getMinutes();
      const sec = now.getSeconds();
      const createtime = `${year}/${month}/${date} ${hour}:${min}:${sec}`;
      let data = [];
      data = {
        action: 'favorite',
        create_at: createtime,
        userName: this.userName,
        id: place.id,
        name: place.name,
        address: place.address,
        access: place.access,
        average: place.average,
        catchcopy: place.catchcopy,
        open: place.open,
        photo: place.photo,
        url: place.url,
      };
      this.activities.unshift(data);
      // userLikedPlaceIdにplace.idを追加
      this.userLikedPlaceId.push(place.id);
      // このお店がfavorites→user.uid&place.idにあるか検索
      const dbFav = firebase.firestore().collection('favorites');
      await dbFav
        .where('user_id', '==', this.userUID)
        .where('place_id', '==', place.id)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            // Yes:お気に入り解除
            this.userLikedPlaceId = await delFavorite(
              place.id,
              this.userUID,
              this.userLikedPlaceId,
            ).catch((err) => {
              console.log('Can not delete favorited place!', err);
            });
          } else {
            // No:お気に入り登録
            dbFav.doc().set({
              user_id: this.userUID,
              place_id: place.id,
            });
            // No:アクティビティ登録
            await postFavActivity(place.id, this.userUID).catch((err) => {
              console.log('Can not register activities!', err);
            });
          }
        })
        .catch((error) => {
          console.log('Can not register favorite shop!', error);
        });
    },
    // お気に入り解除機能
    async offFavorite(place) {
      this.activities = this.activities.filter((data) => data !== place);
      this.userLikedPlaceId = await delFavorite(
        place.id,
        this.userUID,
        this.userLikedPlaceId,
      ).catch((err) => {
        console.log('Can not delete favorited place!', err);
      });
    },
    // 気になる機能
    async onBookmark(place) {
      // activitiesにactivity情報を追加
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const hour = now.getHours();
      const min = now.getMinutes();
      const sec = now.getSeconds();
      const createtime = `${year}/${month}/${date} ${hour}:${min}:${sec}`;
      let data = [];
      data = {
        action: 'mark',
        create_at: createtime,
        userName: this.userName,
        id: place.id,
        name: place.name,
        address: place.address,
        access: place.access,
        average: place.average,
        catchcopy: place.catchcopy,
        open: place.open,
        photo: place.photo,
        url: place.url,
      };
      this.activities.unshift(data);
      // userBookmarkPlaceIdにplace.idを追加
      this.userBookmarkPlaceId.push(place.id);
      // このお店がbookmarks→user.uid&place.idにあるか検索
      const dbBm = firebase.firestore().collection('bookmarks');
      await dbBm
        .where('user_id', '==', this.userUID)
        .where('place_id', '==', place.id)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            // Yes:気になる解除
            this.userBookmarkPlaceId = await delBookmark(
              place.id,
              this.userUID,
              this.userBookmarkPlaceId,
            ).catch((err) => {
              console.log('Can not delete bookmarked place!', err);
            });
          } else {
            // No:気になる登録
            dbBm.doc().set({
              user_id: this.userUID,
              place_id: place.id,
            });
            // No:アクティビティ登録
            await postBmActivity(place.id, this.userUID).catch((err) => {
              console.log('Can not register activities!', err);
            });
          }
        })
        .catch((error) => {
          console.log('Can not register bookmark shop!', error);
        });
    },
    // 気になる解除機能
    async offBookmark(place) {
      this.activities = this.activities.filter((data) => data !== place);
      this.userBookmarkPlaceId = await delBookmark(
        place.id,
        this.userUID,
        this.userBookmarkPlaceId,
      ).catch((err) => {
        console.log('Can not delete bookmarked place!', err);
      });
    },
    // pagetop button
    updateButton() {
      const pagetop = $('.page-top');
      pagetop.hide();
      $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
          pagetop.fadeIn();
        } else {
          pagetop.fadeOut();
        }
      });
    },
    pageTop() {
      // 600ミリ秒かけてトップに戻る
      $('html, body').animate({ scrollTop: 0 }, 600);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Antic+Didone&family=Elsie&family=Italiana&family=Kaisei+Decol:wght@400;500;700&family=Lobster&family=Lora:wght@400;700&display=swap');
.kaisei-medium {
  font-family: 'Kaisei Decol', serif;
  font-weight: medium;
}
.user-activities {
  min-height: 100vh;
  position: relative;/*←相対位置*/
  padding-bottom: 60px;/*←footerの高さ*/
  box-sizing: border-box;
}
footer{
  width: 100%;
  position: absolute;/*←絶対位置*/
  text-align: center;
  bottom: 0; /*下に固定*/
}
.title {
  color: #f2ebe5;
  font-family: 'Lora', serif;
  font-weight: bold;
  text-shadow: 0 1px #5f6571,
               0 2px #5d626e,
               0 3px #5a5f6b,
               0 4px #575c68,
               0 5px #545965,
               0 6px #515661,
               0 7px #4e535e,
               0 8px #4b505b,
               0 9px #454954,
               0 10px 8px #41454f;
}
.no-data {
  color: #6b717f;
  font-family: 'Lora', serif;
  font-weight: bold;
  font-size: 30px;
  text-shadow: 0 1px #5f6571,
               0 2px #5a5f6b,
               0 3px #545965,
               0 4px #4e535e,
               0 5px #454954,
               0 6px 5px #41454f;
}
.navyblue-bg {
  background-color: #5e636f;
  background: linear-gradient(to right, #636772, #5c626f, #4f5666);
}

.card {
  padding: 20px;
  width: 300px;
  background-color: #FFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.card:hover .card-header {
  height: 50px;
}
.card:hover .card-header .card-image {
  transform: translateX(-50%) translateY(-50%) scale(1.5);
}
.card:hover .card-body {
  height: auto;
}
.card:hover .card-body .card-information li {
  transform: translateX(0);
  transition-timing-function: cubic-bezier(0, 1.5, 1, 1);
  transition-duration: 0.5s;
}
.card:hover .card-body .card-information li:nth-child(1) {
  transition-delay: 0.25s;
}
.card:hover .card-body .card-information li:nth-child(2) {
  transition-delay: 0.5s;
}
.card:hover .card-body .card-information li:nth-child(3) {
  transition-delay: 0.75s;
}
.card:hover .card-body .card-information li:nth-child(4) {
  transition-delay: 1s;
}
.card:hover .card-body .card-information li:nth-child(5) {
  transition-delay: 1.25s;
}
.card:hover .card-body .card-information li:nth-child(6) {
  transition-delay: 1.5s;
}
.card .card-header {
  position: relative;
  background-color: #9e9a95;
  height: 200px;
  margin: -20px -20px 5px -20px;
  transition: height 0.5s;
  overflow: hidden;
}
.card .card-header .card-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  display: block;
  width: 300px;
  height: auto;
  transition: transform 0.5s;
}
.card .card-body {
  height: 180px;
  transition: height 0.5s;
  overflow: hidden;
}
.card .card-body .card-information {
  margin-top: 10px;
  color: #424242;
}
.card .card-body .card-information li {
  margin-top: 5px;
  transition-duration: 0;
  transition-delay: 0.5s;
  transform: translateX(-100%);
}
.place-image {
  width: 300px;
  -moz-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -webkit-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  -ms-box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
  box-shadow: 10px 10px 15px -4px rgba(54, 52, 51, 0.8);
}
.place-name {
  width: 300px;
  height: auto;
}
.place-info {
  width: auto;
  height: auto;
}

.liked {
  color: #ff8882;
}
.bookmarked {
  color: #efdc71;
}

.page-top {
  position: fixed;
  right: -10px;
  bottom: 20px;
  height: 50px;
  text-decoration: none;
  font-weight: bold;
  transform: rotate(90deg);
  font-size: 90%;
  line-height: 4.5rem;
  color: #f2ebe5;
  padding: 0 0 0 35px;
  border-bottom: solid 1px;
}
.page-top::before {
  content: "";
  display: block;
  position: absolute;
  top: 49px;
  left: 0px;
  width: 15px;
  border-top: solid 1px;
  transform: rotate(-35deg);
  transform-origin: left top;
}
.icon-color-blue {
  color: #4f5666;
}
.icon-color-yellow {
  color: #efdc71;
}
.user-action {
  display: inline-block;
  transform-origin: left top;
  transform: rotate( 90deg );
}
.lora-bold {
  font-family: 'Lora', serif;
  font-weight: bold;
}
.lora {
  font-family: 'Lora', serif;
}
.user-name {
  text-shadow: 0 1px #5f6571,
               0 2px #5a5f6b,
               0 3px #545965,
               0 4px #515661,
               0 5px #4b505b,
               0 6px 5px #41454f;
}
</style>
