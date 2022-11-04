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
    // const isCollapse = ref<boolean>(false);
    // const collapseBtn = () => (
    //   <el-radio-group v-model={isCollapse.value} style="margin-bottom: 20px">
    //     <el-radio-button label={false}>expand</el-radio-button>
    //     <el-radio-button label={true}>collapse</el-radio-button>
    //   </el-radio-group>
    // );
    const menuArr = ref([
      {
        name: "首页",
        path: "home",
        meta: {
          id: "home",
        },
      },
      {
        name: "关于",
        path: "about",
        meta: {
          id: "about",
        },
      },
      {
        name: "testmodule",
        path: "testmodule",
        meta: {
          id: "testmodule",
        },
        children: [
          {
            name: "test1",
            path: "testmodule-test1",
            meta: {
              id: "test1",
            },
          },
          {
            name: "test2",
            path: "testmodule-test2",
            meta: {
              id: "test2",
            },
          },
        ],
      },
    ]);
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
    const renderMenu = (menuArr: any, container: JSX.Element[] = []) => {
      menuArr.map((item: any) => {
        if (item.children) {
          container.push(
            <el-sub-menu
              index={`${item.path}-${item.meta.id}`}
              v-slots={{
                default: () => renderMenu(item.children, []),
                title: () => (
                  <>
                    {svgIcon()}
                    <span>{item.name}</span>
                  </>
                ),
              }}
            ></el-sub-menu>
          );
        } else {
          container.push(
            <el-menu-item
              index={`${item.path}-${item.meta.id}`}
              v-slots={{
                default: () => svgIcon(),
                title: () => item.name,
              }}
            ></el-menu-item>
          );
        }
      });
      return container;
    };
    const result = renderMenu(menuArr.value);
    const tabsStore = useTabsStore();
    const { active } = storeToRefs(tabsStore);
    const menuMain = () => (
      <el-menu
        router
        default-active={active}
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
