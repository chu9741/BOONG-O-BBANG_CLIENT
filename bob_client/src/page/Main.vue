<template>
  <Menu />
  <div class="allpage">
    <div class="common-layout" style="color: aquamarine">
      <el-container class="layout-container" style="color: brown">
        <el-container class="layout-container" style="color: yellow">
          <el-container class="layout-container" style="color: teal">
            <el-main class="layout-main">
              <router-view />
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
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
  setup() {
    const activeIndex = ref("1");
    const activeIndex2 = ref("1");

    // Variables for modals
    const isModalOpen = ref(false);

    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    return {
      activeIndex,
      activeIndex2,
      handleSelect,
      openModal,
      closeModal,
      isModalOpen,
    };
  },
};
</script>

<style>
.list-box {
  background-color: rgb(255, 255, 255);
}

.layout-container {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}

.layout-header {
  background-color: #2196f3;
  color: white;
}

.layout-aside {
  background-color: #4caf50;
  color: white;
  padding: 10px;
}

.layout-main {
  background-color: rgb(255, 255, 128);
  padding: 10px;
}

.layout-footer {
  background-color: #f44336;
  color: white;
  padding: 10px;
  text-align: center;
}

.allpage {
  width: 55%;
  margin: auto;
}
</style>
