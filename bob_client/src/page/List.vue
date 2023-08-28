<template>
  <h3>룸메이트 찾기 페이지</h3>

  <el-card
    v-for="nominee in nominees"
    :key="nominee.id"
    style="margin-bottom: 4px"
    @click.stop="openModal(nominee)"
  >
    <el-avatar :style="spanStyle" :src="nominee.userPhoto" />
    <span :style="spanStyle">{{ nominee.userName }}</span>
    <span :style="spanStyle">{{ nominee.userMBTI }}</span>
    <span :style="spanStyle">{{ nominee.userBirthYear }}</span>
    <span :style="spanStyle">
      <el-button type="warning" style="float: right">신청</el-button>
    </span>
    <!-- 다른 속성들도 필요에 따라 출력할 수 있습니다 -->
  </el-card>
  <Modal
    v-if="showModal"
    v-model:selectedUser="selectedUser"
    :showModal="showModal"
    @closeModal="closeModal"
    @close="closeModal"
  />
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
    const nominees = ref([]);
    const showModal = ref(false);
    let selectedUser = ref(null);

    const getAllRoommateNominees = async () => {
      try {
        console.log(JSON.parse(localStorage.getItem("JWT")).data);

        const response = await axios.get("api/users/search", {
          headers: {
            token: encodeURIComponent(localStorage.getItem("JWT")),
          },
        });
        console.log(response.data);
        nominees.value = response.data; // 가져온 데이터를 nominees에 할당
      } catch (error) {
        console.error("Error fetching nominees:", error);
      }
    };

    onMounted(() => {
      getAllRoommateNominees();
    });

    const openModal = (user) => {
      selectedUser.value = user;
      console.log(selectedUser.value);
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedUser.value = null;
    };

    return {
      nominees,
      spanStyle: {
        marginRight: "1em",
      },
      openModal,
      showModal,
      closeModal,
      selectedUser,
    };
  },
};
</script>

<style>
.profile {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.button {
  padding: 10px 20px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 80%;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  background-color: sandybrown;
}
</style>
