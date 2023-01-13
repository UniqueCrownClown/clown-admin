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
        <i class="menu-collapse-btn" @click="handleCollapse">{{
          isCollapse ? "<" : ">"
        }}</i>
        <el-aside :width="autoWidth" class="side-aside">
          <sideBar :isCollapse="isCollapse" />
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
import tabBar from "./tabBar.vue";
import mainView from "./mainView.vue";
import { computed, reactive, ref, toRefs } from "vue";
import router, { resetRoute } from "@/router/index";
import { ThemeMode } from "@/utils/dictionary";
import { useThemeStore } from "@/stores/modules/theme";
import { useRootStore } from "@/stores/root";
const themeStore = useThemeStore();
const state = reactive({
  circleUrl:
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
});
const toLogin = () => {
  const root = useRootStore();
  root.logout();
  window.localStorage.removeItem("token");
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
const isCollapse = ref<boolean>(false);
const autoWidth = computed(() => {
  if (isCollapse.value) {
    return "60px";
  }
  return "200px";
});
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>
<style lang="scss" scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  :deep(.el-container) {
    height: 100%;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.side-aside {
  background-color: var(--el-menu-bg-color);
}
.menu-collapse-btn {
  background-color: var(--el-menu-bg-color);
  font-size: 20px;
  font-weight: 700;
  color: var(--el-menu-active-color);
  position: absolute;
  z-index: 99;
  top: 60px;
  left: v-bind(autoWidth);
  height: 36px;
  width: 18px;
  text-align: center;
  cursor: pointer;
}
</style>
