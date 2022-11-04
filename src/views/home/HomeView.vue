<template>
  <div class="page1">
    <h2 class="page1-title">welcome</h2>
    <h3 class="page1-sub-title">{{ title }}</h3>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const title = ref("clown-admin");
</script>
<style lang="scss">
.page1 {
  width: 100%;
  height: 100%;
  // background: url("@/assets/images/tree_planet.jpg");
  // background-size: cover;
  .page1-title {
    text-align: center;
    font-weight: 700;
    font-size: 200px;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: url("@/assets/images/tree_planet.jpg");
  }
  .page1-sub-title{
    @extend .page1-title;
    font-size: 120px;
  }
}
</style>
