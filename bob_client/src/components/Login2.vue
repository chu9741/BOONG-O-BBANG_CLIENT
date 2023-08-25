<template>
  <div>
    <div id="naverIdLogin"></div>
    <button type="button" @click="naverLogout">로그아웃</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      naverLogin: null,
    };
  },
  mounted() {
    this.naverLogin = new window.naver.LoginWithNaverId({
      clientId: "I0fXbGMKugcUoTHBS7cX",
      callbackUrl: "http://localhost:5000/naverLogin",
      isPopup: false,
      loginButton: {
        color: "green",
        type: 3,
        height: 60,
      },
    });

    this.naverLogin.getLoginStatus((status) => {
      if (status) {
        console.log(status);
        console.log(this.naverLogin.user);

        const email = this.naverLogin.user.getEmail();
        if (email === undefined || email === null) {
          alert("이메일은 필수 정보입니다. 정보 제공을 동의해주세요.");
          this.naverLogin.reprompt();
        }
      } else {
        console.log("callback 처리에 실패하였습니다.");
      }
    });
  },
  methods: {
    naverLogout() {
      const accessToken = this.naverLogin.accessToken.accessToken;
      console.log(accessToken);
      const url = `/oauth2.0/token?grant_type=delete&client_id=I0fXbGMKugcUoTHBS7cX&client_secret=4EfdKMCHCe&access_token=${accessToken}&service_provider=NAVER`;
      axios.get(url).then((res) => {
        console.log(res.data);
      });
    },
  },
};
</script>
