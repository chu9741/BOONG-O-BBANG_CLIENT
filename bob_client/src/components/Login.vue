<template>
  <div>
    <div id="naverIdLogin"></div>
    <!-- <button type="button" @click="naverLogout">로그아웃</button> -->
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

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
    });
    this.naverLogin.init();
    console.log(this.naverLogin);

    const router = useRouter();
    this.naverLogin.getLoginStatus((status) => {
      if (!status) {
        this.naverLogin.authorize();
      }
    });
    this.naverLogin.getLoginStatus((status) => {
      if (status) {
        // console.log(this.naverLogin);

        const email = this.naverLogin.user.getEmail();
        const user = this.naverLogin.user;
        const userDTO = {
          userId: user.id,
          userEmail: user.email,
          userName: user.name,
          userMobile: user.mobile,
          userBirthYear: user.birthyear,
          userGender: user.gender,
          userPhoto: user.profile_image,
        };
        if (email === undefined || email === null) {
          alert("이메일은 필수 정보입니다. 정보 제공을 동의해주세요.");
          this.naverLogin.reprompt();
        } else {
          try {
            localStorage.setItem(
              "token",
              this.naverLogin.accessToken.accessToken
            );
            sessionStorage.setItem("userDTO", JSON.stringify(userDTO));
            axios.post(`api/users/validation`, userDTO).then((res) => {
              if (res.data) {
                router.push({
                  name: "home",
                });
              } else {
                router.push("signup");
              }
            });
            // console.log(res);
          } catch (err) {
            console.log(err);
          }
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
