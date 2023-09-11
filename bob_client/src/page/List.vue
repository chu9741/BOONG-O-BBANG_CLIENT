<template>
  <h3>룸메이트 찾기</h3>
  <div>
    <el-card
      v-for="nominee in paginatedData"
      :key="nominee.id"
      style="margin-bottom: 4px"
    >
      <div class="listcard-content">
        <el-avatar
          :style="spanStyle"
          :src="nominee.userPhoto"
          @click.stop="openModal(nominee)"
        />
        <span class="listleft-content">
          <span class="spanStyle">{{ nominee.username }}</span>
          <span style="margin-left: 2rem">MBTI: {{ nominee.userMBTI }}</span>
          <span>나이: {{ nominee.userAge }}</span>
          <span :style="spanStyle"> </span>
        </span>
        <span class="listright-content">
          <el-button
            type="warning"
            style="float: right"
            @click="onSubmit(nominee)"
            >신청</el-button
          >
        </span>
        <!-- 다른 속성들도 필요에 따라 출력할 수 있습니다 -->
      </div>
    </el-card>
    <div class="example-pagination-block">
      <div class="example-demonstration"></div>
      <el-pagination
        layout="prev, pager, next"
        :total="listLength"
        v-model:currentPage="currentPage"
        :default-page-size="7"
        style="margin-top: 10px"
      />
    </div>
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
import { ref, onMounted, computed } from "vue";
import Modal from "@/components/Modal.vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  components: {
    Modal,
  },
  setup() {
    const nominees = ref([]);
    const showModal = ref(false);
    let selectedUser = ref(null);
    let listLength = ref(null);
    const router = useRouter();
    let currentPage = ref(1);

    const reIssueToken = () => {
      const reIssueDto = {
        userNaverId: localStorage.getItem("userId"),
      };
      axios
        .post("api/users/reissue", reIssueDto, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("TOKEN REISSUED.");
          localStorage.removeItem("Authorization");
          localStorage.setItem("Authorization", res.headers.getAuthorization());
          // window.location.reload();
        })
        .catch(() => {
          router.push("/");
        });
    };

    const getAllRoommateNominees = async () => {
      try {
        const response = await axios.get("api/roommates/recommendation", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        });
        nominees.value = response.data; // 가져온 데이터를 nominees에 할당
        listLength.value = nominees.value.length;
      } catch (error) {
        console.error("Error fetching nominees:", error);
        if (error.response.data == "ExpiredJwtException") {
          reIssueToken();
          location.reload();
        } else {
          router.push("/");
        }
      }
    };

    onMounted(() => {
      getAllRoommateNominees();
    });

    const paginatedData = computed(() => {
      const startIndex = (currentPage.value - 1) * 7;
      const endIndex = startIndex + 7;
      return nominees.value.slice(startIndex, endIndex);
    });

    const openModal = (user) => {
      selectedUser.value = user;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedUser.value = null;
    };

    const onSubmit = async (nominee) => {
      const receiverEmail = nominee.userEmail;
      const url = `api/roommates/request/${receiverEmail}`;
      await axios
        .post(url, null, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then(() => {
          ElMessage({
            type: "success",
            message: "신청 완료",
            duration: 2000,
          });
        })
        .catch((err) => {
          if (err.response.data == "ExpiredJwtException") {
            reIssueToken();
            location.reload();
          } else {
            ElMessage({
              type: "error",
              message: "이미 신청을 보냈습니다.",
            });
          }
          console.log(err.response);
        });
    };

    return {
      nominees,
      openModal,
      showModal,
      closeModal,
      selectedUser,
      onSubmit,
      listLength,
      paginatedData,
      currentPage,
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
.listleft-content {
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1em;
}
.listright-content {
  justify-content: right;
  /* float: right; */
  vertical-align: middle;
  margin-top: 0.5%;
}
.listcard-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
