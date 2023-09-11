<template lang="">
  <p>현재 룸메이트</p>
  <el-card style="margin-bottom: 20px">
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div style="display: flex; align-items: center">
        <el-avatar :style="spanStyle" @click.stop="openModal(myBob)" />

        <span>{{ myBob.username }}</span>
      </div>
      <div>
        <el-button type="danger" @click.stop="onCancelRoommate(myBob)"
          >룸메이트 종료하기</el-button
        >
      </div>
    </div>
  </el-card>
  <hr />

  <p>과거 룸메이트</p>
  <el-card
    v-for="(history, idx) in histories"
    :key="history"
    style="margin-bottom: 8px; text-align: center"
  >
    <div class="historycard-content">
      <span
        class="listleft-content"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        "
      >
        <span :style="spanStyle">{{ history.roommateName }}</span>
        <el-rate
          v-model="histories[idx].userScore"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value} 점"
        />
        <span class="historyright-content">
          <el-button
            type="warning"
            style="margin-right: 10px"
            @click="openRateModal(history)"
            :disabled="history.isRated"
            >평가하기</el-button
          >
        </span>
      </span>
    </div>
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
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";

export default {
  components: {
    Modal,
    RateModal,
  },
  setup() {
    const histories = ref([]);
    const showModal = ref(false);
    const showRateModal = ref(false);
    let selectedUser = ref(null);
    let ratedUser = ref(null);
    const router = useRouter();
    const currentPage = ref(1);

    const temp = ref(3);

    let myBob = ref({
      userPhotoUrl:
        "https://cdn0.iconfinder.com/data/icons/lagotline-user-and-account/64/User-43-1024.png",
      username: "현재 매칭된 룸메이트가 없습니다.",
    });

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
          console.log("ERROR APPEARS DURING REISSUING TOKEN");
        });
    };

    const exceptionHandling = (error) => {
      console.log(error);
      if (error.response.data == "ExpiredJwtException") {
        reIssueToken();
        location.reload();
      } else {
        router.push("/");
      }
    };

    const getMyBob = async () => {
      try {
        const response = await axios.get("api/roommates/matching", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        });

        if (response.data.length == 2) {
          myBob.value = response.data[1];
        }
      } catch (error) {
        exceptionHandling(error);
      }
    };

    const getAllHistories = async () => {
      try {
        const response = await axios.get(
          `api/roommates/history/${currentPage.value}`,
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        );

        histories.value = response.data.map((history) => {
          return {
            ...history,
            isRated: false,
          };
        });
      } catch (error) {
        exceptionHandling(error);
      }
    };

    onMounted(() => {
      getMyBob();
      getAllHistories();
    });

    const openModal = (user) => {
      selectedUser.value = user;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedUser.value = null;
    };

    const openRateModal = (history) => {
      ratedUser.value = history;
      showRateModal.value = true;
    };

    const closeRateModal = () => {
      showRateModal.value = false;
      ratedUser.value = null;
    };

    const onCancelRoommate = (myBob) => {
      ElMessageBox.confirm(
        `${myBob.username}님과의 룸메이트 관계를 종료하시겠습니까?`,
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      ).then(() => {
        axios
          .patch("api/roommates", null, {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          })
          .then(() => {
            ElMessage({
              type: "success",
              message: `${myBob.username}님과의 룸메이트가 종료되었습니다.`,
            });

            console.log(myBob);
            console.log(myBob.value);
          })
          .catch((err) => {
            exceptionHandling(err);
          });
      });
    };

    return {
      spanStyle: {
        marginRight: "1em",
        cursor: "pointer",
      },
      openModal,
      showModal,
      closeModal,
      selectedUser,
      closeRateModal,
      openRateModal,
      showRateModal,
      ratedUser,
      currentPage,
      histories,
      myBob,
      onCancelRoommate,
      temp,
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

.historyleft-content {
  justify-content: flex-start;
  /* vertical-align: middle; */
  margin: auto;
  margin-top: auto;
  margin-bottom: auto;
}
.historyright-content {
  justify-content: right;
  /* float: right; */
  vertical-align: middle;
  margin-top: 0.5%;
}
</style>
