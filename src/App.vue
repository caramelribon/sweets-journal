<template>
  <div id="app">
    <app-header></app-header>
    <shop-search></shop-search>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import ShopSearch from '@/components/ShopSearch.vue';

export default {
  components: { AppHeader, ShopSearch },
};
</script>
