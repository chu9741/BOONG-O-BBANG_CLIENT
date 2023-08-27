<template>
<div>
  <h3>마이페이지 소메뉴입니다.</h3>
  <el-row class="tac">
    <el-col :span="5">
      <h5 class="mb-2">마이페이지</h5>
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-menu-item index="1">
          <el-icon>
          </el-icon>
          <span>프로필수정</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span>룸메이트 내역</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span>로그아웃</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span>회원탈퇴</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="10">
      <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
        text-color="#fff" @open="handleOpen" @close="handleClose">
      </el-menu>
    </el-col>
  </el-row>
</div>
</template>

<script>
// import { SwitchButton, Memo, MagicStick, setting } from "@element-plus/icons-vue";

export default {
  name: "SmallMenu",
  components: {},
  //   methods: {
  //     handleOpen(key, keyPath) {
  //       console.log(key, keyPath);
  //     },
  //     handleClose(key, keyPath) {
  //       console.log(key, keyPath);
  //     },
  //   },
  //   data() {
  //     return {};
  //   },
};
</script>

<style></style>
