import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import HomeView from "@/views/home/HomeView.vue";
const filterModule = () => {
  // 不要全注册，后续改成只注册menu上定的路径文件
  const modulesGlob = import.meta.glob("@/views/pages/**/**.vue", {
    eager: true,
  });
  return Object.keys(modulesGlob).map((item) => ({
    path:
      item
        .replace("/src/views/pages/", "")
        .replace(".vue", "")
        .replaceAll("/", "-") +
      "-" +
      item
        .split(".vue")[0]
        .substring(item.split(".vue")[0].lastIndexOf("/") + 1),
    name: item
      .replace("/src/views/pages/", "")
      .replace(".vue", "")
      .replaceAll("/", "-"),
    component: (modulesGlob[item] as any).default,
    meta: {
      id: item
        .split(".vue")[0]
        .substring(item.split(".vue")[0].lastIndexOf("/") + 1), // 符合${item.name}-${item.meta.id}的规则
      title_cn: item
        .split(".vue")[0]
        .substring(item.split(".vue")[0].lastIndexOf("/") + 1),
      title_en: item
        .split(".vue")[0]
        .substring(item.split(".vue")[0].lastIndexOf("/") + 1),
    },
  }));
};
const dynamicRouter: any[] = filterModule();
const constRoutes = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: "/home-home",
    children: dynamicRouter.concat([
      {
        path: "/home-home",
        name: "home",
        component: HomeView,
        meta: {
          id: "home",
          auth: ["admin", "test"],
          icon: "carbon:rule-test",
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title_cn: "首页",
          title_en: "home",
        },
      },
      {
        path: "/about-about",
        name: "about",
        component: () => import("@/views/about/AboutView.vue"),
        meta: {
          id: "about",
          auth: ["admin", "test"],
          icon: "carbon:rule-test",
          isAffix: false,
          isHide: false,
          isKeepAlive: true,
          title_cn: "关于",
          title_en: "about",
        },
      },
    ]),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constRoutes,
});
// 删除/重置路由
export function resetRoute(): void {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
export default router;
