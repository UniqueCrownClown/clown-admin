import {
  createRouter,
  createWebHistory,
  RouterLink,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from "vue-router";
import Layout from "@/layout/index.vue";
import HomeView from "@/views/home/HomeView.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ElLoading, ElMessage } from "element-plus";
import { useUserStore } from "@/stores/modules/user";
import { useMenuStore } from "@/stores/modules/menu";
import { toRaw } from "vue";
const deepFind: any = (totalArr: any[], key: string) => {
  let findArr: any[] = [];
  for (let i = 0; i < totalArr.length; i++) {
    if (totalArr[i]?.children?.length > 0) {
      findArr = [...findArr, ...totalArr[i].children];
    }
    if (totalArr[i].url === key) {
      return totalArr[i];
    }
  }
  if (findArr.length) {
    return deepFind(findArr, key);
  }
  return null;
};
const filterRouteByMenu = (menu: any[]) => {
  const modulesGlob = import.meta.glob("@/views/pages/**/**.vue", {
    eager: true,
  });
  const result = Object.keys(modulesGlob).reduce((prev: any, item) => {
    const menuItem = deepFind(menu, item);
    if (menuItem) {
      return [
        ...prev,
        {
          path: menuItem.path,
          name: menuItem.name,
          component: (modulesGlob[item] as any).default,
          meta: menuItem.meta,
        },
      ];
    }
    return prev;
  }, []);
  return result;
};
const constRoutes = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: "/home-home",
    children: [
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
    ],
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

const whiteList = "/login";

router.beforeEach((to: any, from: any, next: any) => {
  const menuStore = useMenuStore();
  const hasetoken = localStorage.getItem("token");
  NProgress.start();
  /* has token*/
  if (hasetoken) {
    /* has token*/
    if (to.path === "/login") {
      next({
        path: "/",
      });
      NProgress.done();
    } else {
      const userStore = useUserStore();
      // 根据roles权限生成可访问的路由表
      if (userStore.user.roles) {
        const loading = ElLoading.service();
        // 动态路由已加载，直接返回
        if (menuStore.isGet) {
          loading.close(); // 关闭loading
          next();
        }
        if (!menuStore.isGet && toRaw(menuStore.menu)?.length) {
          addRoutes(toRaw(menuStore.menu));
          menuStore.setGet(true);
          loading.close(); // 关闭loading
          next({
            ...to,
            replace: true,
          }) // hack方法 确保addRoutes已完成
            .catch((err: any) => {
              ElMessage.error(err);
              next({
                path: "/",
              });
            });
        }
      } else {
        next();
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});
router.afterEach((_to, _from) => {
  NProgress.done();
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
// 新增路由
function addRoutes(accessRoutes: any[] = [], obtainModules = []) {
  const result = filterRouteByMenu(accessRoutes);
  if (result?.length) {
    result.forEach((elem: RouteRecordRaw) => {
      if (router.getRoutes().every((item) => item.name !== elem.name)) {
        router.addRoute("root", elem);
      }
    });
  }
}

export default router;
