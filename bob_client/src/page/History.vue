<template lang="">
  <el-card
    v-for="nominee in nominees"
    :key="nominee.id"
    style="margin-bottom: 4px"
  >
    <el-avatar
      :style="spanStyle"
      :src="nominee.userPhoto"
      @click.stop="openModal(nominee)"
    />
    <span :style="spanStyle">{{ nominee.userName }}</span>
    <span :style="spanStyle">{{ nominee.userMBTI }}</span>
    <span :style="spanStyle">{{ nominee.userBirthYear }}</span>
    <span :style="spanStyle">
      <el-button
        type="warning"
        style="float: right"
        @click="openRateModal(nominee)"
        :disabled="nominee.isRated"
        >평가하기</el-button
      >
      <!-- <el-button type="info" style="float: right" @click="onSubmit"
        >취소</el-button
      > -->
    </span>
  </el-card>
  <Modal
    v-if="showModal"
    :selectedUser="selectedUser"
    :showModal="showModal"
    @closeModal="closeModal"
    @close="closeModal"
  />
  <RateModal
    v-if="showRateModal"
    v-model:ratedUser="ratedUser"
    :showRateModal="showRateModal"
    @closeModal="closeRateModal"
    @close="closeRateModal"
  />
</template>
<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import Modal from "@/components/Modal.vue";
import RateModal from "@/components/RateModal.vue";

export default {
  components: {
    Modal,
    RateModal,
  },
  setup() {
    const nominees = ref([]);
    const showModal = ref(false);
    const showRateModal = ref(false);
    let selectedUser = ref(null);
    let ratedUser = ref(null);

    const getAllRoommateNominees = async () => {
      try {
        console.log(JSON.parse(localStorage.getItem("JWT")).data);

        const response = await axios.get("api/users/search", {
          headers: {
            token: localStorage.getItem("JWT"),
          },
        });

        nominees.value = response.data.map((nominee) => ({
          ...nominee,
          isRated: false,
        }));
        console.log(response.data);
        // nominees.value = response.data; // 가져온 데이터를 nominees에 할당
      } catch (error) {
        console.error("Error fetching nominees:", error);
      }
    };

    onMounted(() => {
      getAllRoommateNominees();
    });

    const openModal = (user) => {
      selectedUser.value = user;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedUser.value = null;
    };

    const openRateModal = (user) => {
      ratedUser.value = user;
      showRateModal.value = true;
      console.log(showRateModal.value);
    };

    const closeRateModal = () => {
      showRateModal.value = false;
      ratedUser.value = null;
      console.log(showRateModal.value);
    };

    // const rateStatus = (nominee) => {
    //   // nominee.value.isRated = status;
    // };

    return {
      nominees,
      spanStyle: {
        marginRight: "1em",
      },
      openModal,
      showModal,
      closeModal,
      selectedUser,
      closeRateModal,
      openRateModal,
      showRateModal,
      ratedUser,
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
