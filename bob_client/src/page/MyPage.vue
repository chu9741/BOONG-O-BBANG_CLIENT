<template>
  <SmallMenu />
  <div>{{ console.log(userInfo) }}</div>
</template>

<script>
import { onMounted } from "vue";
import SmallMenu from "./SmallMenu.vue";
import axios from "axios";
export default {
  components: {
    SmallMenu,
  },
  setup() {
    const getUserInfo = async () => {
      console.log("Hello");
      const response = await axios.get("api/users", {
        headers: {
          token: localStorage.getItem("JWT"),
        },
      });
      console.log("Bye");
      console.log(response.data);
    };

    onMounted(() => {
      getUserInfo();
    });
  },
};
</script>

<style></style>
