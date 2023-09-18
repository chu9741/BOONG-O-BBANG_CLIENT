<template>
  <div class="elMenuDemo">
    <div class="navcenter">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <router-link to="/main" style="text-decoration: none"
          ><el-menu-item>
            <img class="logo" src="@/assets/blacklogo.png" /> </el-menu-item
        ></router-link>
        <router-link to="/list" style="text-decoration: none"
          ><el-menu-item index="1">룸메이트 찾기</el-menu-item></router-link
        >
        <!-- <router-link to="/findroom" style="text-decoration: none"
          ><el-menu-item index="2">부동산 찾기</el-menu-item></router-link
          > -->
        <router-link to="/alarm" style="text-decoration: none"
          ><el-menu-item index="3">알림</el-menu-item></router-link
        >
        <router-link to="/mypage" style="text-decoration: none"
          ><el-menu-item index="4">마이페이지</el-menu-item></router-link
        >

        <el-menu-item index="5" v-show="isAdmin" @click="toGrafana"
          >관리자 페이지</el-menu-item
        >
      </el-menu>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "Menu",
  setup() {
    let user = ref();
    const router = useRouter();
    const isAdmin = ref(false);

    const reIssueToken = () => {
      const reIssueDto = {
        userNaverId: localStorage.getItem("userId"),
      };
      axios
        .post("api/users/reissue", reIssueDto, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("TOKEN REISSUED.");
          localStorage.removeItem("Authorization");
          localStorage.setItem("Authorization", res.headers.getAuthorization());
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          router.push("/");
        });
    };

    const exceptionHandling = (error) => {
      if (error.response) {
        if (error.response.data == "ExpiredJwtException") {
          reIssueToken();
        }
      } else {
        router.push("/");
      }
    };

    const checkAdmin = async () => {
      try {
        const response = await axios.get(`api/users/detail`, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        });
        if (response.data.role === "ROLE_ADMIN") {
          isAdmin.value = true;
        } else {
          isAdmin.value = false;
        }
      } catch (err) {
        exceptionHandling(err);
      }
    };

    const toGrafana = () => {
      window.open(
        "https://boongobbang.grafana.net/d/c84e98b8-2126-43b3-9303-8d189425fbb6/boong-o-bbang-monitoring?orgId=1&from=1694933700171&to=1694955300171&viewPanel=1",
        "_blank"
      );
    };

    onMounted(() => {
      checkAdmin();
    });

    return { user, isAdmin, toGrafana };
  },
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

.navcenter {
  text-align: center;
}
.logo {
  width: 50px;
  height: 50px;
}

.el-menu {
  background-color: rgb(234, 198, 150) !important;
  border-right: solid 0px var(--el-menu-border-color) !important;
}

.el-menu-demo {
  font-size: 36pt;
}

.el-menu-item {
  color: rgb(101, 69, 31);
  font-family: "Cafe24Ssurround";
}

.elMenuDemo {
  background-color: "blanchedalmond";
  width: 100%;
  height: 50% !important;
  margin: auto;
}

ul.el-menu.el-menu--horizontal.el-menu-demo {
  text-align: center;
  margin: auto;
  padding: revert;
}

.el-menu--horizontal {
  background-color: rgb(234, 198, 150) !important;
  border-radius: 20px;
}

.el-menu-item-active {
  color: rgb(101, 69, 31) !important;
}

.el-menu-item.is-active {
  color: rgb(234, 198, 150);
  background-color: rgb(234, 198, 150);
  color: rgb(118, 88, 39);
}
.el-main {
  margin: 5%;
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: content-box;
}

.el-menu-item {
  --el-menu-active-color: rgb(118, 88, 39);
  ---el-menu-active-color: rgb(116, 116, 116);
  --el-menu-text-color: rgb(116, 116, 116);
  --el-menu-hover-text-color: rgb(101, 69, 31);
  /* --el-menu-bg-color: var(--el-fill-color-blank); */
  --el-menu-hover-bg-color: rgb(200, 174, 125);
  --el-menu-item-height: 66px;
  --el-menu-sub-item-height: calc(var(--el-menu-item-height) - 6px);
  --el-menu-horizontal-sub-item-height: 36px;
  --el-menu-item-font-size: var(--el-font-size-base);
  --el-menu-item-hover-fill: rgb(118, 88, 39);
  --el-menu-border-color: rgb(118, 88, 39);
  --el-menu-border-color: transparent;
  --el-menu-level-padding: 0px !important;
}

.el-menu-item * {
  vertical-align: bottom;
  background-color: transparent !important;
}

.el-menu--horizontal.el-menu {
  border-bottom: solid 3px rgb(118, 88, 39) !important;
}
</style>
