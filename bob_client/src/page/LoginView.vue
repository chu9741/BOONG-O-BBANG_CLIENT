<template lang="">
  <img
    class="image"
    src="@/assets/btnG_naverLogin.png"
    alt="Image"
    :style="imageStyle"
    @click.stop="naverLogin()"
  />
  <!-- <Login /> -->
</template>
<script>
import { useRouter } from "vue-router";
export default {
  components: {
    // Login,
  },

  setup() {
    const router = useRouter();
    const naverLogin = () => {
      router.push("naverLogin");
    };
    return {
      naverLogin,
      imageStyle: {
        width: "6cm",
        height: "2cm",
        position: "absolute",
        top: "50%",
        right: "10%",
        transform: "translateY(-50%)",
      },
    };
  },
};
</script>
<style lang=""></style>
