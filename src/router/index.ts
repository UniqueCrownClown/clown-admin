import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import HomeView from "@/views/home/HomeView.vue";
const filterModule = () => {
  const modulesGlob = import.meta.glob("@/views/pages/**/**.vue", {
    eager: true,
  });
  return Object.keys(modulesGlob).map((item) => ({
    path: item.replace("/src/views/pages/", "").replace(".vue", "").replaceAll("/", "-"),
    name: item
      .replace("/src/views/pages/", "")
      .replace(".vue", "")
      .replaceAll("/", "-"),
    component: (modulesGlob[item] as any).default,
  }));
};
const dynamicRouter: any[] = filterModule();
const constRoutes = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: "/home",
    children: dynamicRouter.concat([
      {
        path: "/home",
        name: "home",
        component: HomeView,
        meta: {
          auth: ["admin", "test"],
          icon: "carbon:rule-test",
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title: "首页",
          index: "1",
        },
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/about/AboutView.vue"),
        meta: {
          auth: ["admin", "test"],
          icon: "carbon:rule-test",
          isAffix: false,
          isHide: false,
          isKeepAlive: true,
          title: "about",
          index: "2",
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

export default router;
