<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElTable } from "element-plus";
import { orderReq } from "@/api/testprisma";

interface IOrder {
  amount: string;
  description: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<IOrder[]>([]);
const handleSelectionChange = (val: IOrder[]) => {
  multipleSelection.value = val;
  currentId = (val[0] as any)?.id;
};

let currentId: string = "";
const tableData = ref<IOrder[]>([]);

const isNew = ref(true);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  amount: "",
  description: "",
});
const fetchData = async () => {
  try {
    const res: any = await orderReq.orderRequest();
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
    amount: parseInt(form.amount),
  };
  try {
    if (isNew.value) {
      const res: any = await orderReq.addOrderRequest(params);
      if (res?.code === 200) {
        dialogFormVisible.value = false;
        fetchData();
      }
    } else {
      const res: any = await orderReq.updateOrderRequest(currentId, params);
      if (res?.code === 200) {
        dialogFormVisible.value = false;
        fetchData();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const addOrder = async () => {
  isNew.value = true;
  Object.assign(form, {
    amount: "",
    description: "",
  });
  dialogFormVisible.value = true;
};
const delOrder = async () => {
  const ids = multipleSelection.value.map((item) => (item as any).id).join(",");
  try {
    const res: any = await orderReq.delOrderRequest(ids);
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
const updateOrder = async () => {
  isNew.value = false;
  dialogFormVisible.value = true;
  const single = multipleSelection.value[0];
  form.amount = single.amount;
  form.description = single.description;
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
          <el-button type="primary" @click="addOrder">新增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="delOrder">删除</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="updateOrder">修改</el-button>
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
        <el-table-column property="amount" label="amount" width="120" />
        <el-table-column
          property="description"
          label="description"
          width="120"
        />
        <el-table-column property="createdAt" label="createdAt" width="120">
          <template #default="scope">{{ scope.row.createdAt }}</template>
        </el-table-column>
      </el-table></el-main
    >
    <!-- Form -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="isNew ? '新增订单' : '修改订单'"
    >
      <el-form :model="form">
        <el-form-item label="订单总价" :label-width="formLabelWidth">
          <el-input v-model="form.amount" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单描述" :label-width="formLabelWidth">
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
