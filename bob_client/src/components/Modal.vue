<template>
  <el-dialog
    class="modal-form"
    v-model="modalShow"
    v-if="modalShow"
    :title="title"
    width="20%"
    center
    style="width: 400px"
  >
    <div style="align-content: center">
      <div class="modal-profile-box">
        <el-avatar class="modalprofile" :src="userSelected.userPhoto" />
      </div>
      <span>
        <div class="modaltext">이름: {{ userSelected.username }}</div>
        <div class="modaltext">MBTI: {{ userSelected.userMBTI }}</div>
        <div class="modaltext">나이: {{ userSelected.userAge }}</div>
        <div class="modaltext">선호 지역: {{ userSelected.userLocation }}</div>
        <div class="modaltext">
          청소 빈도: {{ userSelected.userCleanCount }}
        </div>
        <div class="modaltext">
          반려동물 여부:
          {{
            userSelected.userHasPet ? "반려동물이 있어요" : "반려동물이 없어요"
          }}
        </div>
        <div class="modaltext">
          자취경험 여부:
          {{
            userSelected.userHasExperience
              ? "자취경험 있어요"
              : "자취 처음이에요"
          }}
        </div>
        <div class="modaltext">
          흡연 여부: {{ userSelected.userIsSmoker ? "흡연자" : "비흡연자" }}
        </div>
        <div class="modaltext">
          기상시간:
          {{ userSelected.userIsNocturnal ? "오후기상[야]" : "오전기상[주]" }}
        </div>
        <div class="modaltext">
          자기소개: {{ userSelected.userIntroduction }}
        </div>
      </span>

      <!-- 다른 유저 정보 필드도 추가할 수 있습니다 -->
    </div>
    <template #footer>
      <!-- <span class="dialog-footer"> -->
      <el-button @click="closeModal">Close</el-button>
      <!-- </span> -->
    </template>
  </el-dialog>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    selectedUser: Object, // 유저 정보를 받는 props 추가
    showModal: Boolean,
  },
  setup(props, { emit }) {
    const modalShow = ref(props.showModal);
    const userSelected = ref(props.selectedUser);

    const title = userSelected.value.username + "님의 상세정보";
    const onClose = () => {
      this.$emit("closeModal"); // 이벤트 발생
    };

    const closeModal = () => {
      emit("closeModal");
    };

    onMounted(() => {
      if (userSelected.value.userCleanCount == "ONE_TO_TWO") {
        userSelected.value.userCleanCount = "1~2회";
      } else if (userSelected.value.userCleanCount == "THREE_TO_FOUR") {
        userSelected.value.userCleanCount = "3~4회";
      } else {
        userSelected.value.userCleanCount = "5회 이상";
      }
    });
    return {
      onClose,
      closeModal,
      modalShow,
      userSelected,
      title,
    };
  },
};
</script>

<style scoped>
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
