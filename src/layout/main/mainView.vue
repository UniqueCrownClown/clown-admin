<template>
  <div class="tab-main-container">
    <router-view v-slot="{ Component }">
      <transition name="slide-right" mode="out-in">
        <keep-alive :include="keepAliveNameList">
          <component :is="Component" class="w100" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const keepAliveNameList = ref(/about/);
</script>
<style lang="scss">
.tab-main-container {
  height: calc(100% - 50px);
  background-color: var(--el-menu-bg-color);
}
</style>
