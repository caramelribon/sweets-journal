import Vue from 'vue';
import Router from 'vue-router';
import AppTop from '@/components/AppTop.vue';
import UserFavorite from '@/components/UserFavorite.vue';
import UserActivity from '@/components/UserActivity.vue';
import AllPlaces from '@/components/AllPlaces.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Top',
    component: AppTop,
  },
  {
    path: '/user/:userId',
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
  {
    path: '/activity/places',
    name: 'AllPlaces',
    component: AllPlaces,
    props: true,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
