<template>
  <div class="common-layout">
    <el-container>
      <el-header><h3>clown-admin-template</h3></el-header>
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
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
