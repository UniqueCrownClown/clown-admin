<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row class="demo-avatar demo-basic">
          <el-col :span="20">
            <h3>clown-admin-template</h3>
          </el-col>
          <el-col :span="2">
            <el-avatar :size="36" :src="circleUrl" />
          </el-col>
          <el-col :span="2">
            <el-button @click="toLogin">logout</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <navBar />
        </el-aside>
        <el-main>
          <mainView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import navBar from "./navBar";
import mainView from "./mainView.vue";
import { reactive, toRefs } from "vue";
import router, { resetRoute } from "@/router";

const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
});
const toLogin = () => {
  router.push({
    path: "/login",
  });
};
const { circleUrl } = toRefs(state);
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
