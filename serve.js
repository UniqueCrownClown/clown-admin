const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const KoaBody = require("koa-body");
KoaBody({ multipart: true });
const Mock = require("mockjs");

//获取配置
const getConfig = () => {
  let params = {
    port: 7007,
  };

  process.argv
    .filter((e) => e.startsWith("--"))
    .forEach((e) => {
      const f = e.replace(/^--/, "");
      const parts = f.split("=");
      params[params[0]] = parts.slice(1).join("=");
      if (parts.length && parts[0]) {
        params[parts[0]] = parts.slice(1).join("=");
      }
    });

  return params;
};

const config = getConfig();
let Users = [];

for (let i = 0; i < 66; i++) {
  Users.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock("@county(true)"),
      "age|18-60": 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1),
    })
  );
}

//获取用户列表
router.get("/-/user/list", (ctx) => {
  let { name } = ctx.request.query;

  let mockUsers = Users.filter((user) => {
    if (name && user.name.indexOf(name) === -1) return false;
    return true;
  });
  ctx.body = {
    users: mockUsers,
  };
});

//获取用户列表（分页）
router.get("/-/user/listpage", (ctx) => {
  let { page, name } = ctx.request.query;

  let mockUsers = Users.filter((user) => {
    if (name && user.name.indexOf(name) === -1) return false;
    return true;
  });
  let total = mockUsers.length;
  mockUsers = mockUsers.filter(
    (u, index) => index < 20 * page && index >= 20 * (page - 1)
  );

  ctx.body = {
    status: true,
    content: {
      total: total,
      users: mockUsers,
    },
  };
});

//删除用户
router.get("/-/user/remove", (ctx) => {
  let { id } = ctx.request.query;

  Users = Users.filter((u) => u.id !== id);
  ctx.body = {
    code: 200,
    msg: "删除成功",
  };
});

//编辑用户
router.get("/-/user/edit", (ctx) => {
  let { id, name, addr, age, birth, sex } = ctx.request.query;

  Users.some((u) => {
    if (u.id === id) {
      u.name = name;
      u.addr = addr;
      u.age = age;
      u.birth = birth;
      u.sex = sex;
      return true;
    }
  });

  ctx.body = {
    code: 200,
    msg: "编辑成功",
  };
});

//新增用户
router.get("/-/user/add", (ctx) => {
  let { name, addr, age, birth, sex } = ctx.request.query;

  Users.push({
    name: name,
    addr: addr,
    age: age,
    birth: birth,
    sex: sex,
  });
  ctx.body = {
    code: 200,
    msg: "新增成功",
  };
});
//路由列表
const routerList = [
  {
    path: "open",
    name: "open",
    component: "spa/open",
    meta: {
      title: "OPEN",
      icon: "el-icon-goods",
    },
  },
];

router.get("/-/router/get", function (ctx) {
  ctx.body = {
    content: {
      router: routerList,
    },
    status: true,
  };
});

router.post("/login", function (ctx) {
  ctx.body = {
    content: {
      name: "admin",
      ctoken: "asdadaeff121123ada",
    },
    status: true,
  };
});

app.use(KoaBody());

app.use(router.routes());

app.use(router.allowedMethods());

app.use(require("koa-static")(__dirname + "/public"));
//start server
// var options = {
// 	key: fs.readFileSync('./ssl/server.key'), //ssl文件路径
// 	cert: fs.readFileSync('./ssl/server.pem') //ssl文件路径
// };

// http.createServer(app.callback()).listen(80);
// https.createServer(options, app.callback()).listen(443);

app.listen(config.port, () => {
  console.error(`服务器启动成功：${config.port}`);
});
