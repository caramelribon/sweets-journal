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

<style>
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}
::-webkit-scrollbar-track {
  background: #beb9b6;
}
::-webkit-scrollbar-thumb {
  background: #9b9794;
  border-radius: 10px;
}
</style>
