<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElTable } from "element-plus";
import { userReq } from "@/api/testprisma";
import type { IUser, IUserRes } from "@/types/ITestPrisma";

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<IUserRes[]>([]);
const handleSelectionChange = (val: IUserRes[]) => {
  multipleSelection.value = val;
  currentId = val[0]?.id;
};

let currentId: number = -1;
const tableData = ref<IUser[]>([]);

const isNew = ref(true);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  name: "",
  email: "",
  isAdmin: false,
});
const fetchData = async () => {
  try {
    const res: myLib.IResponseData<IUserRes[]> = await userReq.proRequest();
    if (res?.code === 200) {
      tableData.value = res?.data;
    }
  } catch (error) {
    console.log(error);
  }
};
const dialogConfirm = async () => {
  const params = {
    ...form,
  };
  try {
    if (isNew.value) {
      const res: myLib.IResponseData<IUserRes> = await userReq.addProRequest(
        params
      );
      if (res?.code === 200) {
        dialogFormVisible.value = false;
        fetchData();
      }
    } else {
      const res: myLib.IResponseData<IUserRes> = await userReq.updateProRequest(
        currentId.toString(),
        params
      );
      if (res?.code === 200) {
        dialogFormVisible.value = false;
        fetchData();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const addUser = async () => {
  isNew.value = true;
  Object.assign(form, {
    name: "",
    email: "",
    isAdmin: false,
  });
  dialogFormVisible.value = true;
};
const delUser = async () => {
  const ids = multipleSelection.value.map((item) => item.id).join(",");
  try {
    const res: myLib.IResponseData<IUserRes[]> = await userReq.delProRequest(
      ids
    );
    if (res?.code === 200) {
      fetchData();
      ElMessage({
        message: "Congrats, delete is success.",
        type: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async () => {
  isNew.value = false;
  dialogFormVisible.value = true;
  const single = multipleSelection.value[0];
  form.name = single.name;
  form.email = single.email;
  form.isAdmin = single.isAdmin;
};
onMounted(() => {
  fetchData();
});
</script>

<template>
  <el-container>
    <el-header class="pt-8">
      <el-row>
        <el-col :span="2">
          <el-button type="primary" @click="addUser">新增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="delUser">删除</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="updateUser">修改</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="
           {
            width: 100%;
          }
        "
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="name" label="用户名称" width="120" />
        <el-table-column property="count" label="用户邮箱" width="120">
          <template #default="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column
          property="isAdmin"
          label="是否管理员"
          width="120"
        /> </el-table
    ></el-main>
    <!-- Form -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="isNew ? '新增用户' : '修改用户'"
    >
      <el-form :model="form">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否管理员" :label-width="formLabelWidth">
          <el-switch
            v-model="form.isAdmin"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>
<style lang="scss" scoped></style>
