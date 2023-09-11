<template>
  <el-dialog v-model="rateModalShow" v-if="rateModalShow" width="25%">
    <div class="demo-rate-block">
      <div class="centered">
        <span class="demonstration"
          >{{ you.roommateName }}의 평점을 입력해주세요</span
        >
        <el-rate v-model="value2" :colors="colors" size="large" />
        <el-button
          type="primary"
          @click.stop="submitRate(you)"
          :disabled="you.isRated"
          >평가하기</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  props: { ratedUser: Object, showRateModal: Boolean },

  setup(props, { emit }) {
    const value2 = ref(null);
    const rateModalShow = ref(props.showRateModal);
    const you = ref(props.ratedUser);
    const router = useRouter();

    const colors = ref(["#99A9BF", "#F7BA2A", "#FF9900"]);

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
    const submitRate = (you) => {
      axios
        .post(`api/roommates/score/${you.userScoreId}`, null, {
          params: {
            score: value2.value,
          },
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then(() => {
          ElMessage({
            showClose: true,
            message: `${you.roommateName} : ${value2.value}점 입력완료`,
            type: "success",
            duration: 1500,
          });

          you.isRated = true;
        })
        .catch((error) => {
          exceptionHandling(error);
        });
    };

    const onClose = () => {
      this.$emit("closeModal"); // 이벤트 발생
    };

    const closeRateModal = () => {
      emit("closeRateModal");
    };

    onMounted(() => {
      console.log(props);
    });
    return {
      value2,
      colors,
      submitRate,
      onClose,
      you,
      closeRateModal,
      rateModalShow,
      status,
    };
  },
};
</script>
<style scoped>
.demo-rate-block {
  padding: 60px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  box-sizing: border-box;
}
.demo-rate-block:last-child {
  border-right: none;
}
.demo-rate-block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 15px;
  margin-bottom: 20px;
}
.centered {
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.centered-container {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; /* 가로로 중앙정렬 시키기 위해 필요한 설정 */
}
</style>
