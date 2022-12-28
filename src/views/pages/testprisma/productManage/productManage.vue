<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElTable } from "element-plus";
import testprisma from "@/api/testprisma";

interface IProduct {
  name: string;
  price: string;
  count: string;
  image: string;
  description: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<IProduct[]>([]);
const handleSelectionChange = (val: IProduct[]) => {
  multipleSelection.value = val;
  currentId = (val[0] as any)?.id;
};

let currentId: string = "";
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
    const res: any = await testprisma.product.proRequest();
    console.log(res);
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
      const res: any = await testprisma.product.addProRequest(params);
      if (res?.code === 200) {
        dialogFormVisible.value = false;
        fetchData();
      }
    } else {
      const res: any = await testprisma.product.updateProRequest(
        currentId,
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
  const ids = multipleSelection.value.map((item) => (item as any).id).join(",");
  try {
    const res: any = await testprisma.product.delProRequest(ids);
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
          <el-button type="primary" @click="addProduct">新增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="delProduct">删除</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="updateProduct">修改</el-button>
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
        <el-table-column property="name" label="商品名称" width="120" />
        <el-table-column property="description" label="商品描述" width="120" />
        <el-table-column property="image" label="商品路径" width="120" />
        <el-table-column property="price" label="商品价格" width="120" />
        <el-table-column property="count" label="商品库存" width="120">
          <template #default="scope">{{ scope.row.count }}</template>
        </el-table-column>
      </el-table></el-main
    >
    <!-- Form -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="isNew ? '新增商品' : '修改商品'"
    >
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品库存" :label-width="formLabelWidth">
          <el-input v-model="form.count" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图片路径" :label-width="formLabelWidth">
          <el-input v-model="form.image" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input
            v-model="form.description"
            type="textarea"
            autocomplete="off"
          />
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
