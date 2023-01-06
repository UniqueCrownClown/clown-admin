<template>
  <div class="canvas h100" ref="sakuraContainer">
    <pre class="text">
      桃花坞里桃花庵，桃花庵里桃花仙。 
      桃花仙人种桃树，又摘桃花卖酒钱。
      酒醒只在花前坐，酒醉还来花下眠。 
      半醒半醉日复日，花落花开年复年。
      但愿老死花酒间，不愿鞠躬车马前。 
      车尘马足富者趣，酒盏花枝贫者缘。
      若将富贵比贫贱，一在平地一在天。 
      若将贫贱比车马，他得驱驰我得闲。
      别人笑我太疯癫，我笑他人看不穿。 
      不见五陵豪杰墓，无花无酒锄作田。
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, type Ref } from "vue";
import SakuraCanvas from "@clownjs/sakura";
export default defineComponent({
  setup() {
    const sakuraContainer: Ref<HTMLCanvasElement | null> = ref(null);
    let resizeTimer: NodeJS.Timeout;
    let sakura: SakuraCanvas | null = null;
    const updateCanvasSize = () => {
      const container: HTMLCanvasElement | null = sakuraContainer.value;
      if (container !== null) {
        const canvasWidth = container.clientWidth || 600;
        const canvasHeight = container.clientHeight || 400;
        if (sakura instanceof SakuraCanvas) {
          sakura.setConfig({
            canvasWidth,
            canvasHeight,
          });
        }
      }
    };
    const resizeHandler = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCanvasSize, 500);
    };

    onMounted(() => {
      const container: HTMLCanvasElement | null = sakuraContainer.value;
      if (container !== null) {
        const canvasWidth = container.clientWidth || 600;
        const canvasHeight = container.clientHeight || 400;
        const options = {
          canvasClassName: "ec-sakura-canvas", // canvas classname
          canvasWidth, // canvas width
          canvasHeight, // canvas height
        };
        try {
          sakura = new SakuraCanvas(options);
          sakura.init(); // make <canvas> & petals
          container.appendChild(sakura.getCanvas()); // insert canvas into document
          sakura.animate(); // start animation
        } catch (ex: any) {
          console.log(ex.message);
        }
        window.addEventListener("resize", resizeHandler, false);
      }
    });
    onUnmounted(() => {
      window.removeEventListener("resize", resizeHandler, false);
    });
    return {
      sakuraContainer,
    };
  },
});
</script>
<style scoped>
.canvas {
  position: relative;
  box-sizing: content-box;
}
.text {
  position: absolute;
  top: 20px;
  text-align: center;
  font-size: 32px;
  font-family: "苏新诗柳楷简", "STKaiti", "KaiTi", cursive;
  color: #7b5252;
  user-select: none;
}
</style>
