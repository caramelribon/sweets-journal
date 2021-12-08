<template>
  <div id="app">
    <app-header></app-header>
    <shop-search></shop-search>
    <user-favorite></user-favorite>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import ShopSearch from '@/components/ShopSearch.vue';
import UserFavorite from '@/components/UserFavorite.vue';

export default {
  components: { AppHeader, ShopSearch, UserFavorite },
};
</script>
