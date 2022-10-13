import { defineComponent, ref } from "vue";

const NavBar = defineComponent({
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
    const renderMenu = (menuArr: any, container: JSX.Element[] = []) => {
      menuArr.map((item: any) => {
        if (item.children) {
          container.push(
            <el-sub-menu
              index={item.path}
              v-slots={{
                default: () => renderMenu(item.children, []),
                title: () => <span>{item.name}</span>,
              }}
            ></el-sub-menu>
          );
        } else {
          container.push(
            <el-menu-item index={item.path}>
              {{
                default: () => (
                  <el-icon>
                    <icon-menu />
                  </el-icon>
                ),
                title: () => item.name,
              }}
            </el-menu-item>
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
