import { defineComponent, ref } from "vue";

const NavBar: any = defineComponent({
  name: "navBar",
  props: {},
  setup() {
    const isCollapse = ref<boolean>(false);
    const collapseBtn = () => (
      <el-radio-group v-model={isCollapse.value} style="margin-bottom: 20px">
        <el-radio-button label={false}>expand</el-radio-button>
        <el-radio-button label={true}>collapse</el-radio-button>
      </el-radio-group>
    );
    const menuArr = ref([
      {
        name: "首页",
        path: "home",
      },
      {
        name: "About",
        path: "about",
      },
      {
        name: "testmodule",
        path: "testmodule",
        children: [
          {
            name: "test1",
            path: "testmodule-test1",
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
              index={item.path}
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
              index={item.path}
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
    const menuMain = () => (
      <el-menu
        router
        default-active="home"
        class="el-menu-vertical-demo"
        collapse={isCollapse.value}
      >
        {result}
      </el-menu>
    );
    return () => (
      <>
        {collapseBtn()}
        {menuMain()}
      </>
    );
  },
});

export default NavBar;
