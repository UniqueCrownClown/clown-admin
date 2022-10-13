<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu
    router
    default-active="home"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <el-menu-item index="home">
      <el-icon><icon-menu /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="about">
      <el-icon><icon-menu /></el-icon>
      <template #title>About</template>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-sub-menu index="1-3">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-3-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>
<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { ref } from "vue";
const isCollapse = ref(true);
const menuArr = ref([
  {
    name: "首页",
    path: "home",
  },
  {
    name: "About",
    path: "about",
  },
  {
    name: "navigator1",
    path: "navigator1",
    children: [
      {
        name: "navigator1-1",
        path: "navigator1-1",
      },
    ],
  },
]);
</script>
