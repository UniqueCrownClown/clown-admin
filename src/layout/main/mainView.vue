<template>
  <div class="h100">
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
