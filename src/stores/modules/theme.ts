import { defineStore } from "pinia";
import { lighten, darken } from "@/utils";
import { ThemeMode } from "@/utils/dictionary";
type colorKeys =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "error"
  | "info";
type textKeys =
  | "primary"
  | "regular"
  | "secondary"
  | "placeholder"
  | "disabled";

type menuKeys = "backgroundColor" | "textColor" | "activeTextColor";
interface ThemeConfig {
  color: {
    [key in colorKeys]?: string;
  };
  text: {
    [key in textKeys]?: string;
  };
  menu: {
    [key in menuKeys]?: string;
  };
}
const defaultTheme: ThemeConfig = {
  color: {
    primary: "",
    success: "",
    warning: "",
    danger: "",
    error: "",
    info: "",
  },
  text: {
    primary: "",
    regular: "",
    secondary: "",
    placeholder: "",
    disabled: "",
  },
  menu: {
    backgroundColor: "",
    textColor: "",
    activeTextColor: "",
  },
};

/**
 * 主题颜色设置处理
 * @param {*} theme 主题
 */
const setThemeHandle = (theme: ThemeConfig) => {
  const el = document.documentElement;
  for (const key of Object.keys(defaultTheme.color)) {
    el.style.setProperty(
      `--el-color-${key}`,
      theme.color[key as colorKeys] as string
    );
    for (let i = 1; i <= 9; i++) {
      el.style.setProperty(
        `--el-color-${key}-light-${i}`,
        lighten(theme.color![key as colorKeys] as string, i / 10)
      );
      el.style.setProperty(
        `--el-color-${key}-dark-${i}`,
        darken(theme.color![key as colorKeys] as string, i / 10)
      );
    }
  }
  // for (const key in defaultTheme.text) {
  //   el.style.setProperty(`--el-text-color-${ key }`, theme.text[key])
  // }
  if (theme.menu?.backgroundColor !== "#fff") {
    el.style.setProperty(
      `--gl-sidebar-background-color`,
      theme?.menu?.backgroundColor || "#fff"
    );
  }
};

export const useThemeStore = defineStore("theme", {
  state: () => ({
    reload: false,
    mode: ThemeMode.LIGHT,
    theme: defaultTheme,
  }),
  getters: {},
  actions: {
    /**
     * 获取当前主题
     */
    getTheme() {
      const result: ThemeConfig = {
        color: {},
        text: {},
        menu: {},
      };
      const el = document.querySelector(":root");
      for (const key in defaultTheme.color) {
        result.color![key as colorKeys] = getComputedStyle(
          el as Element
        ).getPropertyValue(`--el-color-${key}`);
      }
      result.menu!.backgroundColor = getComputedStyle(
        el as Element
      ).getPropertyValue(`--gl-sidebar-background-color`);
      this.theme = result;
      this.setMode(ThemeMode.LIGHT);
    },
    /**
     * 设置当前主题
     * @param {*} theme
     */
    setTheme(theme: ThemeConfig) {
      this.theme = theme;
      setThemeHandle(this.theme);
    },
    /**
     * 设置主题模式
     * @param {*} mode
     */
    setMode(mode: string) {
      mode === ThemeMode.DARK
        ? document.documentElement.classList.add(ThemeMode.DARK)
        : document.documentElement.classList.remove(ThemeMode.DARK);
      this.mode = mode;
    },
    /**
     * 清除主题 主题模式
     */
    clear() {},
  },
});
