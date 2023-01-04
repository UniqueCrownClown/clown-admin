import { defineStore } from "pinia";
const menu = [
  {
    name: "home",
    path: "/home-home",
    url: "/src/views/home/HomeView.vue",
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
    name: "testmodule",
    path: "/testmodule",
    meta: {
      id: "testmodule",
      auth: ["admin", "test"],
      icon: "carbon:rule-test",
      isAffix: true,
      isHide: false,
      isKeepAlive: true,
      title_cn: "测试模块",
      title_en: "testmodule",
    },
    children: [
      {
        name: "typer",
        url: "/src/views/pages/testmodule/test1.vue",
        path: "/typer-typer",
        meta: {
          id: "typer",
          auth: ["admin", "test"],
          icon: "carbon:rule-test",
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title_cn: "打字机",
          title_en: "typer",
        },
      },
      {
        name: "sakura",
        url: "/src/views/pages/testmodule/test2.vue",
        path: "/sakura-sakura",
        meta: {
          id: "sakura",
          auth: ["admin", "test"],
          icon: "carbon:rule-test",
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title_cn: "樱花",
          title_en: "sakura",
        },
      },
    ],
  },
  {
    name: "testprisma",
    path: "/testprisma",
    meta: {
      id: "testprisma",
      auth: ["admin", "test"],
      icon: "carbon:rule-test",
      isAffix: true,
      isHide: false,
      isKeepAlive: true,
      title_cn: "prisma测试",
      title_en: "testprisma",
    },
    children: [
      {
        name: "userList",
        url: "/src/views/pages/testprisma/userList/userList.vue",
        path: "/user-list",
        meta: {
          id: "userList",
          auth: ["admin", "test"],
          icon: "carbon:rule-test",
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title_cn: "用户管理",
          title_en: "userList",
        },
      },
      {
        name: "productManage",
        url: "/src/views/pages/testprisma/productManage/productManage.vue",
        path: "/product-manage",
        meta: {
          id: "productManage",
          auth: ["admin", "test"],
          icon: "carbon:rule-test",
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title_cn: "商品管理",
          title_en: "productManage",
        },
      },
      {
        name: "addressManage",
        url: "/src/views/pages/testprisma/addressManage/addressManage.vue",
        path: "/address-manage",
        meta: {
          id: "addressManage",
          auth: ["admin", "test"],
          icon: "carbon:rule-test",
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title_cn: "地址管理",
          title_en: "orderManage",
        },
      },
      {
        name: "orderManage",
        url: "/src/views/pages/testprisma/orderManage/orderManage.vue",
        path: "/order-manage",
        meta: {
          id: "orderManage",
          auth: ["admin", "test"],
          icon: "carbon:rule-test",
          isAffix: true,
          isHide: false,
          isKeepAlive: true,
          title_cn: "订单管理",
          title_en: "orderManage",
        },
      },
    ],
  },
  {
    name: "about",
    path: "/about-about",
    url: "/src/views/about/AboutView.vue",
    meta: {
      id: "about",
      auth: ["admin", "test"],
      icon: "carbon:rule-test",
      isAffix: true,
      isHide: false,
      isKeepAlive: true,
      title_cn: "关于",
      title_en: "about",
    },
  },
];
export const useMenuStore = defineStore("menu", {
  state: () => ({
    menu,
    isGet: false,
  }),
  getters: {},
  actions: {
    /**
     * 设置是否获取过 菜单 权限
     * @param {*}
     * @returns
     */
    setGet(val = true) {
      this.isGet = val;
    },
    clearGet() {
      this.isGet = false;
    },
    setPermissionMenu(payLoad: any[]) {
      this.menu = payLoad;
    },
  },
});
