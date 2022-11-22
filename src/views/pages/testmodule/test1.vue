<script setup lang="ts">
import { Api } from "@/api/api";
import { ref, onMounted, reactive } from "vue";
import typer from "@clownjs/typer";
// 计算属性
const obj = reactive({
  output: "",
  isEnd: false,
  speed: 100,
  singleBack: true,
  sleep: 10,
  type: "normal",
  backSpeed: 40,
  sentencePause: true,
});

const title = ref("");
onMounted(async () => {
  const data = await fetch();
  title.value = JSON.stringify(data);
  // 实例化
  const typed = new typer(obj, `落霞与孤鹜齐飞，秋水共长天一色。`);
});
const fetch = async (): Promise<String[]> => {
  const api = new Api();
  return await api.fetch("todos/1");
};
</script>

<template>
  <main>
    <div w:p="y-20 x-4" w:font="leading-10" w:text="center size-30px">{{ obj.output }}</div>
    <div w:m="y-10 x-4" w:text="center size-20px" w:font="mono light">testApi:{{ title }}</div>
    <div
      class="py-8 px-8 max-w-md mx-auto bg-white dark:bg-dark-200 rounded-xl shadow-md space-y-2 sm:(py-4 flex items-center space-y-0 space-x-6)"
    >
      <img
        class="block mx-auto h-24 rounded-full sm:(mx-0 flex-shrink-0)"
        src="@/assets/images/face.jpg"
        alt="face"
      />
      <div class="text-center space-y-2 sm:text-left">
        <div class="space-y-0.5">
          <p class="text-lg text-black font-semibold">Erin Lindford</p>
          <p class="text-gray-500 font-medium">Product Engineer</p>
        </div>
        <button
          class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:(text-white bg-purple-600 border-transparent) focus:(outline-none ring-2 ring-purple-600 ring-offset-2)"
        >
          Message
        </button>
        <button
          w:bg="purple-600 hover:purple-500 dark:purple-500 dark:hover:purple-600"
          w:text="sm white"
          w:font="mono light"
          w:p="y-1 x-4"
          w:m="l-2"
          w:border="rounded-full purple-200"
        >
          testWindi
        </button>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
</style>
