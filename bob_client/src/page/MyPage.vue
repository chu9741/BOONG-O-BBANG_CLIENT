<template>
  <h3>마이 페이지 입니다. </h3>
  <div class="allpage">
    <div class="common-layout">
      <el-container class="layout-container">
        <el-header class="layout-header">
          <Menu></Menu>
        </el-header>
        <el-container class="layout-container">
          <el-aside width="200px" class="layout-aside">
            <el-row class="tac">
              <el-col :span="5">
                <h5 class="mb-2">마이페이지</h5>
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                  <el-menu-item index="1">
                    <el-icon>
                      <Memo />
                    </el-icon>
                    <span>프로필수정</span>
                  </el-menu-item>
                  <el-menu-item index="2">
                    <el-icon>
                      <MagicStick />
                    </el-icon>
                    <span>룸메이트 내역123</span>
                  </el-menu-item>
                  <el-menu-item index="3">
                    <el-icon>
                      <SwitchButton />
                    </el-icon>
                    <span>로그아웃</span>
                  </el-menu-item>
                  <el-menu-item index="4">
                    <el-icon>
                      <setting />
                    </el-icon>
                    <span>회원탈퇴</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
              <el-col :span="10">
                <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                  default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose">
                </el-menu>
              </el-col>
            </el-row>
          </el-aside>

          <el-container class="layout-container">
            <el-main class="layout-main">
              <router-view />
            </el-main>
          </el-container>
        </el-container>
        <div>
          <el-footer class="layout-footer">Footer</el-footer>
        </div>
      </el-container>


    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Menu from '@/page/Menu.vue';

export default {
  name: 'MyPage',

  data() {
    return {
      value: null,
      step: 3,
    };
  },
  components: {
    Menu,
  },
  setup() {
    const activeIndex = ref('1');
    const activeIndex2 = ref('1');

    // Variables for modals
    const isModalOpen = ref(false);

    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };


    return {
      activeIndex,
      activeIndex2,
      handleSelect,
      openModal,
      closeModal,
      isModalOpen,
    };
  },
};
</script>

<style>
.list-box {
  background-color: rgb(255, 255, 255);
}

.layout-container {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}

.layout-header {
  background-color: #2196f3;
  color: white;
  padding: 10px;
}

.layout-aside {
  background-color: #4caf50;
  color: white;
  padding: 10px;
}

.layout-main {
  background-color: rgb(255, 255, 128);
  padding: 10px;
}

.layout-footer {
  background-color: #f44336;
  color: white;
  padding: 10px;
  text-align: center;
}

.allpage {
  width: 70%;
  margin: auto;
}
</style>
