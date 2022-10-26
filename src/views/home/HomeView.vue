<script setup lang="ts">
import TheWelcome from "@/components/TheWelcome.vue";
import { onMounted, reactive } from "vue";
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
      sentencePause: true
    });

    // 实例化
    onMounted(() => {
      const typed = new typer(obj, `落霞与孤鹜齐飞，秋水共长天一色。`);
    });
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <h2>welcome to clown-admin!</h2>
    <div>{{ obj.output }}</div>
  </main>
</template>
