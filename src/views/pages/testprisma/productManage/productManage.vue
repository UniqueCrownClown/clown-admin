<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElTable } from "element-plus";
import { productReq } from "@/api/testprisma";
import type { IProduct, IProductRes } from "@/types/ITestPrisma";

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<IProductRes[]>([]);
const handleSelectionChange = (val: IProductRes[]) => {
  multipleSelection.value = val;
  currentId = val[0]?.id;
};

let currentId: number = -1;
const tableData = ref<IProduct[]>([]);

const isNew = ref(true);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  name: "",
  count: "100",
  price: "100",
  image: "",
  description: "",
});
const fetchData = async () => {
  try {
    const res: myLib.IResponseData<IProductRes[]> =
      await productReq.proRequest();
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
    count: parseInt(form.count),
    price: parseInt(form.price),
  };
  try {
    if (isNew.value) {
      const res: myLib.IResponseData<IProductRes> =
        await productReq.addProRequest(params);
      if (res?.code === 200) {
        dialogFormVisible.value = false;
        fetchData();
      }
    } else {
      const res: myLib.IResponseData<IProductRes> =
        await productReq.updateProRequest(currentId.toString(), params);
      if (res?.code === 200) {
        dialogFormVisible.value = false;
        fetchData();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const addProduct = async () => {
  isNew.value = true;
  Object.assign(form, {
    name: "",
    count: "100",
    price: "100",
    image: "",
    description: "",
  });
  dialogFormVisible.value = true;
};
const delProduct = async () => {
  const ids = multipleSelection.value.map((item) => item.id).join(",");
  try {
    const res: myLib.IResponseData<IProductRes[]> =
      await productReq.delProRequest(ids);
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
const updateProduct = async () => {
  isNew.value = false;
  dialogFormVisible.value = true;
  const single = multipleSelection.value[0];
  form.count = single.count;
  form.description = single.description;
  form.image = single.image;
  form.name = single.name;
  form.price = single.price;
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
          <el-button type="primary" @click="addProduct">??????</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="delProduct">??????</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="updateProduct">??????</el-button>
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
        <el-table-column property="name" label="????????????" width="120" />
        <el-table-column property="description" label="????????????" width="120" />
        <el-table-column property="image" label="????????????" width="120">
          <template #default="scope"
            ><img :src="scope.row.image" alt="??????????????????"
          /></template>
        </el-table-column>
        <el-table-column property="price" label="????????????" width="120" />
        <el-table-column property="count" label="????????????" width="120">
          <template #default="scope">{{ scope.row.count }}</template>
        </el-table-column>
      </el-table></el-main
    >
    <!-- Form -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="isNew ? '????????????' : '????????????'"
    >
      <el-form :model="form">
        <el-form-item label="????????????" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="????????????" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="????????????" :label-width="formLabelWidth">
          <el-input v-model="form.count" autocomplete="off" />
        </el-form-item>
        <el-form-item label="????????????" :label-width="formLabelWidth">
          <el-input v-model="form.image" autocomplete="off" />
        </el-form-item>
        <el-form-item label="????????????" :label-width="formLabelWidth">
          <el-input
            v-model="form.description"
            type="textarea"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">??????</el-button>
          <el-button type="primary" @click="dialogConfirm"> ?????? </el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>
<style lang="scss" scoped></style>
