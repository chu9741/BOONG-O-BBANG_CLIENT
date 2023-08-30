<template>
  <div>
    <el-row class="tac">
      <el-col :span="5">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" @click="chooseMenu(1)">
            <span>프로필수정</span>
          </el-menu-item>
          <el-menu-item index="2" @click="chooseMenu(2)">
            <span>룸메이트 내역</span>
          </el-menu-item>
          <el-menu-item index="3" @click="chooseMenu(3)">
            <span>로그아웃</span>
          </el-menu-item>
          <el-menu-item index="4" @click="chooseMenu(4)">
            <span>회원탈퇴</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="17" style="overflow-wrap: break-word; margin-left: 10px">
        {{ console.log(menuNumber) }}
        <div v-show="menuNumber == 0">
          <h2>유저 정보</h2>
        </div>
        <div v-show="menuNumber == 1">
          <EditProfile v-model:userInfo="userInfoSmallMenu" />
        </div>
        <div v-show="menuNumber == 2">룸메 내역</div>
        <div v-show="menuNumber == 3">로그아웃</div>
        <div v-show="menuNumber == 4">회원탈퇴</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EditProfile from "@/components/EditProfile.vue";
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
export default {
  name: "SmallMenu",
  components: { EditProfile },
  setup() {
    let userInfoSmallMenu = reactive(null);
    let menuNumber = ref(0);

    const chooseMenu = (number) => {
      menuNumber.value = number;
      console.log(userInfoSmallMenu);
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
