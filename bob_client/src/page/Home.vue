<template>
  <div class="largebox">
    <div style="justify-content: center; display: flex">
      <el-card class="mainbox-card" style="margin-bottom: 10px">
        <template #header>
          <div v-if="user" class="card-header">
            <span><el-avatar :src="user.userPhoto"> </el-avatar></span>
            <span>{{ user.userName }}</span>
            <el-button class="button" text @click="openModal(user)"
              >상세정보 보기</el-button
            >
          </div>
        </template>
        <div v-if="user">
          <div class="text item">{{ user.userBirthYear }}</div>
          <div class="text item">{{ user.userMBTI }}</div>
        </div>
      </el-card>
    </div>
    <Modal
      v-if="showModal"
      v-model:selectedUser="selectedUser"
      :showModal="showModal"
      @closeModal="closeModal"
      @close="closeModal"
    />
    <div style="justify-content: center; display: flex">
      <span class="mainiconbox1">
        <img class="mainicon1" src="@/assets/icon2.png"
      /></span>
      <span class="mainiconbox2">
        <img class="mainicon2" src="@/assets/icon.png" />
      </span>
    </div>
    <!-- <div style="text-align: center">
  </div> -->
    <div style="justify-content: center; display: flex">
      <el-card class="mainbox-card" style="margin-top: 10px">
        <template #header>
          <div v-if="myBob" class="card-header">
            <span><el-avatar :src="myBob.userPhoto"> </el-avatar></span>
            <span>{{ myBob.userName }}</span>
            <el-button class="button" text @click="openModal(myBob)"
              >상세정보 보기</el-button
            >
          </div>
        </template>
        <!-- <div v-for="o in 4" :key="o" class="text item">{{ "List item " + o }}</div> -->
        <div v-if="user">
          <div class="text item">{{ myBob.userBirthYear }}</div>
          <div class="text item">{{ myBob.userMBTI }}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal,
  },
  setup() {
    const showModal = ref(false);
    let user = ref(null);
    let selectedUser = ref(null);
    let myBob = ref({
      userName: "BOB",
      userPhoto: "",
      userMBTI: "None",
      userBirthYear: "None",
    });
    const getUserInfo = async () => {
      const response = await axios.get("api/users", {
        headers: {
          token: localStorage.getItem("JWT"),
        },
      });
      user.value = response.data;
    };

    onMounted(() => {
      getUserInfo();
    });

    const openModal = (user) => {
      selectedUser.value = user;
      showModal.value = true;
      console.log(showModal.value);
    };

    const closeModal = () => {
      showModal.value = false;
      selectedUser.value = null;
    };
    return {
      user,
      myBob,
      closeModal,
      openModal,
      selectedUser,
      showModal,
    };
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
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mainbox-card {
  width: 50%;
  /* position:relative; */
  /* top: 50%; */
  /* left: 50%; */
  /* right: 50%; */
}

.button {
  font-family: "Cafe24Ssurround";
  background-color: rgb(200, 174, 125);
}

.mainicon1 {
  height: 100px;
  width: 100px;
  margin: auto;
  margin-right: 15px;
}
.mainicon2 {
  height: 100px;
  width: 100px;
  margin: auto;
  align-content: right;
  margin-left: 15px;
}

.mainiconbox {
  /* margin: auto; */
}
.mainiconbox1 {
  /* margin: auto; */
  align-items: start;
}
.mainiconbox2 {
  /* margin: auto; */
  align-items: end;
}
</style>
