<template>
  <h3>알림 페이지</h3>
  <div v-for="nominee in nominees" :key="nominee.id">
  <el-card :closable="false" :body-style="{ padding: '20px'}" style="margin-bottom: 10px;"> 

    <div class="card-content">
      <span class="left-content">
        <el-avatar class="avatarStyle" :src="nominee.userPhoto" @click.stop="openModal(nominee)"  />
        <span class="user-name" style="height: 40px; line-height: 40px;">{{ nominee.userName }}님에게 요청되었습니다.</span>
      </span>
      <span class="right-content" >
        <el-button type="success" @click="onClick(nominee)">수락</el-button>
        <el-button type="danger" @click="onClick(nominee)">거절</el-button>
      </span>
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
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import Modal from "@/components/Modal.vue";
import { ElMessage } from "element-plus";

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
        // console.log(response.data);
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

    const onSubmit = () => {
      ElMessage({
        type: "success",
        message: "신청 완료",
      });
    };

    const onClick = (nominee)=>{
      console.log(nominee);
      //백엔드연결 (request상태 변경)
    }

    return {
      nominees,
      spanStyle: {
        marginRight: "1em",
      },
      openModal,
      showModal,
      closeModal,
      selectedUser,
      onSubmit,onClick
    };
  },
};
</script>

<style>
.avatarStyle {
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin-right: 10px;
  align-items: center;
  vertical-align: middle;
}

.user-name {
  font-weight: bold;
  align-items: center;
}

.left-content{
  align-items: center;
  vertical-align: middle;
}
.right-content{
  justify-content: right;
  /* float: right; */
  vertical-align: middle;
  margin-top: 0.5%;

}
.card-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

</style>
