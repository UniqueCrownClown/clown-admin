import { useMenuStore } from "@/stores/modules/menu";
import { useTabsStore } from "@/stores/modules/tabs";
import { storeToRefs } from "pinia";
import { defineComponent, ref } from "vue";

const sideBar: any = defineComponent({
  name: "sideBar",
  props: {
    isCollapse: {
      default: () => false,
    },
  },
  setup(props) {
    const menuStore = useMenuStore();
    const { menu } = storeToRefs(menuStore);
    const svgIcon = () => (
      <svg
        style="width: 1em; height: 1em; margin-right: 8px"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-029747aa=""
      >
        <path
          fill="currentColor"
          d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
        ></path>
      </svg>
    );
    const renderMenu = (menu: any, container: JSX.Element[] = []) => {
      menu.map((item: any) => {
        if (item.children) {
          container.push(
            <el-sub-menu
              index={`${item.path}`}
              v-slots={{
                default: () => renderMenu(item.children, []),
                title: () => (
                  <>
                    {svgIcon()}
                    <span>{item.meta.title_cn || item.name}</span>
                  </>
                ),
              }}
            ></el-sub-menu>
          );
        } else {
          container.push(
            <el-menu-item
              index={`${item.path}`}
              v-slots={{
                default: () => svgIcon(),
                title: () => item.meta.title_cn || item.name,
              }}
            ></el-menu-item>
          );
        }
      });
      return container;
    };
    const result = renderMenu(menu.value);
    const tabsStore = useTabsStore();
    const { active } = storeToRefs(tabsStore);
    const menuMain = () => (
      <el-menu
        router
        default-active={active.value}
        class="el-menu-vertical-demo"
        collapse={props.isCollapse}
      >
        {result}
      </el-menu>
    );

    return () => <>{menuMain()}</>;
  },
});

export default sideBar;
