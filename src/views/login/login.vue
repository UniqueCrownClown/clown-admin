<template>
  <div class="login">
    <h3>clown-admin-template</h3>
    <el-button @click.prevent="toHome">登录</el-button>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();

const toHome = () => {
  router.push({
    //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
    path: "/home",
    query: {
      num: 1,
    },
  });
};
</script>
