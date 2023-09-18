<template>
  <Menu />
  <div style="background-color: #f9dec2">
    <!-- <div style="background-color: white"> -->
    <div class="largebox">
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </div>
  </div>
</template>

<script>
import Menu from "@/page/Menu.vue";

export default {
  name: "Main",

  data() {
    return {
      value: null,
    };
  },
  components: {
    Menu,
  },
  setup() {},
};
</script>

<style>
@font-face {
  font-family: "Cafe24Ssurround";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.largebox {
  font-family: "Cafe24Ssurround";
  /* width:640px;   */
  width: 100%;
  max-width: 700px;
  height: calc(100vh - 10px - 10px);
  float: center;
  transform: "translateY(50%)";
  align-items: center;
  margin: auto;
  background-color: rgb(234, 198, 150);
}

.layout-main {
  background-color: rgb(234, 198, 150);
  /* padding: 10px; */
  margin: auto;
}
</style>
