<template>
  <div class="app-wrapper">
    <component :is="layout" />
  </div>
</template>
<script setup lang="ts">
import Main from "./main/index.vue";
// import { ref } from "vue";
// const layout = ref("HomeView");

const layout = Main;
</script>
<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  :deep(.layout-aside-width-default) {
    width: 200px !important;
  }
}
</style>
