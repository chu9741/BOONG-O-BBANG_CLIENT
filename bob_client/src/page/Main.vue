<template>
  <Menu />
  <div class="allpage">
    <el-container class="layout-container">
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
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
.layout-container {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  height: 100%;
}

.layout-main {
  background-color: rgb(184, 145, 62);
  padding: 10px;
}

.allpage {
  width: 55%;
  margin: auto;
  height: calc(100vh - 50px - 50px);
}
</style>
