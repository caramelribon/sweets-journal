<template>
  <div id="app">
    <app-header class="z-30"></app-header>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  components: { AppHeader },
};
</script>
