<template>
  <div class="elMenuDemo">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <router-link to="/home" style="text-decoration: none"
        ><el-menu-item>
          <img class="logo" src="@/assets/image.jpg" /> </el-menu-item
      ></router-link>
      <router-link to="/list" style="text-decoration: none"
        ><el-menu-item index="1">룸메이트 찾기</el-menu-item></router-link
      >
      <router-link to="/findroom" style="text-decoration: none"
        ><el-menu-item index="2">부동산 찾기</el-menu-item></router-link
      >
      <router-link to="/alarm" style="text-decoration: none"
        ><el-menu-item index="3">알림</el-menu-item></router-link
      >
      <router-link to="/mypage" style="text-decoration: none"
        ><el-menu-item index="4">마이페이지</el-menu-item></router-link
      >
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Menu",
};
</script>

<style>
.logo {
  width: 50px;
  height: 50px;
}

.elMenuDemo {
  background-color: "blanchedalmond";
}
</style>
