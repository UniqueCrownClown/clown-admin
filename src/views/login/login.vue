<template>
  <div
    class="login bg-cover w-full h-full flex justify-center items-center"
    :style="{
      backgroundImage: `url(${bgImage})`,
    }"
  >
    <div class="w-1/2 bg-light-50 bg-opacity-20 p-8 rounded-3xl">
      <h3 class="text-center text-4xl p-4">clown-admin-template</h3>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >login</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { signinRequest } from "@/api/login";
import type { FormInstance, FormRules } from "element-plus";

const bgImage = new URL(`../../assets/images/tree_planet.jpg`, import.meta.url)
  .href;
const router = useRouter();

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "clown",
  password: "",
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "Please input name", trigger: "blur" },
    { min: 3, max: 8, message: "Length should be 3 to 8", trigger: "blur" },
  ],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!");

      try {
        const res: myLib.IResponseData<any> = await signinRequest(ruleForm);
        if (res?.code === 200) {
          toHome(res?.data.access_token);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const toHome = (token: string) => {
  localStorage.setItem("token", token);
  router.push({
    //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
    path: "/",
    query: {
      num: 1,
    },
  });
};
</script>
