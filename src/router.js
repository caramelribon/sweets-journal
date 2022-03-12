import Vue from 'vue';
import Router from 'vue-router';
import AppTop from '@/components/AppTop.vue';
import UserProfile from '@/components/UserProfile.vue';
import UserActivity from '@/components/UserActivity.vue';
import AllRanking from '@/components/AllRanking.vue';

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
    component: UserProfile,
    props: true,
  },
  {
    path: '/activity',
    name: 'Activity',
    component: UserActivity,
    props: true,
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: AllRanking,
    props: true,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
