<template lang="">
  <div class="largebox">
    <div class="logobox">
      <img class="logomain" src="@/assets/blacklogo.png" />
    </div>
    <div class="naverbox">
      <img
        class="loginimage"
        src="@/assets/btnG_naverLogin.png"
        alt="Image"
        :style="imageStyle"
        @click.stop="naverLogin()"
      />
    </div>
    <br />
    <div class="textbox">
      <p style="font-size: 32px">
        <b> 붕어빵, 공간과 사람을 담다!</b>
      </p>
      <br />
      <p style="font-size: 20px">
        <font color="765827">룸메이트</font>는 한 공간을 함께하는 특별한
        동반자입니다.
      </p>
      <p style="font-size: 20px">"붕어빵" 은 마치 붕어빵틀에서 만들어지듯,</p>
      <p style="font-size: 20px">
        공간을 함께할 분위기 따뜻한 룸메이트들을 찾아내는 특별한
        <font color="765827">매칭 서비스</font>입니다.
      </p>
    </div>
  </div>

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
      },
    };
  },
};
//absolute
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
  width: 50%;
  height: calc(100vh - 10px - 10px);
  float: center;
  transform: "translateY(50%)";
  align-items: center;
  margin: auto;
  background-color: rgb(234, 198, 150);
}

.logobox {
  text-align: center;
}

.logomain {
  margin-top: 13%;
  height: 300px;
  width: 300px;
  margin: auto;
}

.naverbox {
  text-align: center;
  /* padding: 5% 5% 0% 5%; */
}

.textbox {
  background-color: rgb(234, 198, 150);
  padding: 5% 5% 5% 5%;
}
</style>
