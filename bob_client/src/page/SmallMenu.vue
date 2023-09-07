<template>
  <div>
    <el-row class="tac">
      <el-col :span="5">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" @click="chooseMenu(0)">
            <span>내 프로필</span>
          </el-menu-item>
          <el-menu-item index="2" @click="chooseMenu(1)">
            <span>프로필수정</span>
          </el-menu-item>
          <el-menu-item index="3" @click="chooseMenu(2)">
            <span>룸메이트 내역</span>
          </el-menu-item>
          <el-menu-item index="4" @click="chooseMenu(3)">
            <span>로그아웃</span>
          </el-menu-item>
          <el-menu-item index="5" @click="chooseMenu(4)">
            <span>회원탈퇴</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18" style="overflow-wrap: break-word; margin-left: 10px">
        {{ console.log(menuNumber) }}
        <div v-show="menuNumber == 0">
          <MyProfile />
        </div>
        <div v-show="menuNumber == 1">
          <EditProfile />
        </div>
        <div v-show="menuNumber == 2">
          <History />
        </div>
        <div v-show="menuNumber == 3"></div>
        <div v-show="menuNumber == 4"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EditProfile from "@/components/EditProfile.vue";
import MyProfile from "@/page/MyProfile.vue";
import History from "@/page/History.vue";
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "SmallMenu",
  components: { EditProfile, MyProfile, History },
  setup() {
    let userInfoSmallMenu = reactive(null);
    let menuNumber = ref(0);

    const router = useRouter();
    const chooseMenu = (number) => {
      menuNumber.value = number;
      console.log(userInfoSmallMenu);
      if (number == 3) {
        ElMessageBox.confirm("로그아웃 하시겠습니까?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            ElMessage({
              type: "success",
              message: "로그아웃 되었습니다.",
            });
            const accessToken = localStorage.getItem("token");
            console.log(accessToken);
            const url = `/oauth2.0/token?grant_type=delete&client_id=I0fXbGMKugcUoTHBS7cX&client_secret=4EfdKMCHCe&access_token=${accessToken}&service_provider=NAVER`;
            axios.get(url).then((res) => {
              console.log(res.data);
            });
            localStorage.clear();
            router.push("/");
          })
          .catch(() => {});
      }

      if (number == 4) {
        ElMessageBox.confirm("회원탈퇴 하시겠습니까?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        })
          .then(() => {
            ElMessage({
              type: "success",
              message: "회원탈퇴 되었습니다.",
            });

            axios.delete("api/users", {
              headers: {
                token: localStorage.getItem("JWT"),
              },
            });

            localStorage.clear();
            router.push("/");
          })
          .catch(() => {});
      }
    };

    const getUserInfo = async () => {
      console.log("Hello");
      const response = await axios.get("api/users", {
        headers: {
          token: localStorage.getItem("JWT"),
        },
      });
      console.log("Bye");
      console.log(response.data);
      userInfoSmallMenu = response.data;
    };

    onMounted(() => {
      getUserInfo();
    });

    return {
      chooseMenu,
      menuNumber,
      userInfoSmallMenu,
    };
  },
};
</script>

<style></style>
