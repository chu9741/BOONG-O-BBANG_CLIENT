<template>
  <el-card class="box-card" style="margin-bottom: 10px">
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
  <Modal
    v-if="showModal"
    v-model:selectedUser="selectedUser"
    :showModal="showModal"
    @closeModal="closeModal"
    @close="closeModal"
  />
  <div style="text-align: center">아이콘 or 이미지 삽입</div>
  <el-card class="box-card" style="margin-top: 10px">
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
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card {
  width: 50%;
}
</style>
