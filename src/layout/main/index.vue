<template>
  <div class="common-layout">
    <el-container>
      <el-header style="padding-top: 12px; border-bottom: 1px solid #ccc">
        <el-row class="demo-avatar demo-basic">
          <el-col :span="20">
            <h3>clown-admin-template</h3>
          </el-col>
          <el-col :span="2">
            <el-switch
              size="large"
              v-model="mode"
              :active-value="ThemeMode.DARK"
              :inactive-value="ThemeMode.LIGHT"
              style="--el-switch-on-color: #222; --el-switch-off-color: #e2e2e2"
              inline-prompt
              active-text="黑"
              inactive-text="亮"
            />
          </el-col>
          <el-col :span="2">
            <el-dropdown style="float: right">
              <el-avatar :size="36" :src="circleUrl" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>设置</el-dropdown-item>
                  <el-dropdown-item @click="toLogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <sideBar />
        </el-aside>
        <el-main>
          <tabBar />
          <mainView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import sideBar from "./sideBar";
// import sideBar from "./sideBar.vue";
import tabBar from "./tabBar.vue"
import mainView from "./mainView.vue";
import { computed, reactive, ref, toRefs } from "vue";
import router, { resetRoute } from "@/router";
import { ThemeMode } from "@/utils/dictionary";
import { useThemeStore } from "@/stores/modules/theme";
const themeStore = useThemeStore();
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
const mode = computed({
  get: () => {
    return themeStore.mode;
  },
  set: (val) => {
    themeStore.setMode(val);
  },
});
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
