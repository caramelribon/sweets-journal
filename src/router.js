import Vue from 'vue';
import Router from 'vue-router';
import ShopSearch from '@/components/ShopSearch.vue';
import UserFavorite from '@/components/UserFavorite.vue';
import UserActivity from '@/components/UserActivity.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Top',
    component: ShopSearch,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserFavorite,
    props: true,
  },
  {
    path: '/activity',
    name: 'Activity',
    component: UserActivity,
    props: true,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
