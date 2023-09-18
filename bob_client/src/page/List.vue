<template>
  <h3>룸메이트 찾기</h3>
  <div
    v-loading.fullscreen.lock="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.9)"
  >
    <el-carousel
      type="card"
      height="600px"
      indicator-position="none"
      :autoplay="false"
    >
      <el-carousel-item v-for="(nominee, idx) in nominees" :key="idx">
        <div style="align-content: center; margin-left: 20px; margin-top: 20px">
          <div class="modal-profile-box">
            <el-avatar
              size="large"
              class="modalprofile"
              :src="nominee.userPhotoUrl"
            />
          </div>
          <span>
            <div class="modaltext">이름: {{ nominee.username }}</div>
            <div class="modaltext">MBTI: {{ nominee.userMBTI }}</div>
            <div class="modaltext">나이: {{ nominee.userAge }}</div>
            <div class="modaltext">선호 지역: {{ nominee.userLocation }}</div>
            <div class="modaltext">
              청소 빈도:
              {{
                (nominee.userCleanCount =
                  nominee.userCleanCount === "ONE_TO_TWO"
                    ? "1~2회"
                    : nominee.userCleanCount === "THREE_TO_FOUR"
                    ? "3~4회"
                    : "5회 이상")
              }}
            </div>
            <div class="modaltext">
              반려동물 여부:
              {{
                nominee.userHasPet ? "반려동물이 있어요" : "반려동물이 없어요"
              }}
            </div>
            <div class="modaltext">
              자취경험 여부:
              {{
                nominee.userHasExperience
                  ? "자취경험 있어요"
                  : "자취 처음이에요"
              }}
            </div>
            <div class="modaltext">
              흡연 여부:
              {{ nominee.userIsSmoker ? "흡연자" : "비흡연자" }}
            </div>
            <div class="modaltext">
              기상시간:
              {{ nominee.userIsNocturnal ? "오후기상[야]" : "오전기상[주]" }}
            </div>
            <div class="modaltext" v-if="nominee.userAverageScore !== -1">
              평균 점수: {{ nominee.userAverageScore }}
            </div>
            <div class="modaltext">
              자기소개: {{ nominee.userIntroduction }}
            </div>
          </span>
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            text-align: center;
            margin-top: 50px;
          "
        >
          <el-button
            type="warning"
            style="float: right"
            @click="onSubmit(nominee)"
            >신청</el-button
          >
        </div>
        <!-- <template #footer> -->
        <!-- <span class="dialog-footer"> -->
        <!-- </template> -->
      </el-carousel-item>
    </el-carousel>
  </div>
  <!-- <div>
  <el-card
    v-for="nominee in paginatedData"
    :key="nominee.id"
    style="margin-bottom: 4px"
  >
    <div class="listcard-content">
      <el-avatar :src="nominee.userPhotoUrl" size="large" />
      <span class="listleft-content" @click.stop="openModal(nominee)">
        <span class="spanStyle">{{ nominee.username }}</span>
        <span style="margin-left: 2rem">MBTI: {{ nominee.userMBTI }}</span>
        <span style="margin-left: 1rem">나이: {{ nominee.userAge }}</span>
      </span>
      <span class="listright-content">
        <el-button
          type="warning"
          style="float: right"
          @click="onSubmit(nominee)"
          >신청</el-button
        >
      </span>
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
  </div> -->
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
    const loading = ref(true);

    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

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
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          router.push("/");
        });
    };

    const exceptionHandling = (error) => {
      if (error.response) {
        if (error.response.data == "ExpiredJwtException") {
          reIssueToken();
        }
      } else {
        router.push("/");
      }
    };

    const getAllRoommateNominees = async () => {
      try {
        const response = await axios.get("api/users/recommendations", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        });
        nominees.value = response.data; // 가져온 데이터를 nominees에 할당
        listLength.value = nominees.value.length;
      } catch (error) {
        console.log(error);
        exceptionHandling(error);
      }
    };

    onMounted(() => {
      getAllRoommateNominees();
      setTimeout(() => {
        loading.value = false;
      }, 400);
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
          exceptionHandling(err);
          {
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
      loading,
      svg,
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
  cursor: pointer;
  width: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  border-radius: 20px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  border-radius: 20px;
}

.modalprofile {
  width: 50px;
  height: 50px;
  object-fit: cover;
  /* margin-left: 50%; */
}

.modaltext {
  font-size: 14px;
  text-align: left;
  line-height: 1.8em;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.modal-profile-box {
  text-align: center;
  margin-bottom: 5%;
}

.el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 10px calc(var(--el-dialog-padding-primary) + 5px) 20px !important;
}
</style>
