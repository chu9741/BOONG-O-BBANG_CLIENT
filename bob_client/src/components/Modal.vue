<template>
  <el-dialog
    v-model="modalShow"
    v-if="modalShow"
    :title="title"
    width="20%"
    center
  >
    <div style="align-content: center">
      <span>
        <el-avatar class="profile" :src="userSelected.userPhoto" />
      </span>
      <span>
        <div class="text">이름: {{ userSelected.userName }}</div>
        <div class="text">MBTI: {{ userSelected.userMBTI }}</div>
        <div class="text">출생년도: {{ userSelected.userBirthYear }}</div>
        <div class="text">선호 지역: {{ userSelected.userLocation }}</div>
        <div class="text">청소 빈도: {{ userSelected.userCleanCount }}</div>
        <div class="text">
          반려동물 여부:
          {{
            userSelected.userHasPet ? "반려동물이 있어요" : "반려동물이 없어요"
          }}
        </div>
        <div class="text">
          자취경험 여부:
          {{
            userSelected.userHasExperience
              ? "자취경험 있어요"
              : "자취 처음이에요"
          }}
        </div>
        <div class="text">
          흡연 여부: {{ userSelected.userIsSmoker ? "흡연자" : "비흡연자" }}
        </div>
        <div class="text">
          기상시간:
          {{ userSelected.userIsNocturnal ? "오후기상[야]" : "오전기상[주]" }}
        </div>
        <div class="text">자기소개: {{ userSelected.userIntroduction }}</div>
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
import { ref } from "vue";
export default {
  props: {
    selectedUser: Object, // 유저 정보를 받는 props 추가
    showModal: Boolean,
  },
  setup(props, { emit }) {
    const modalShow = ref(props.showModal);
    const userSelected = ref(props.selectedUser);

    const title = userSelected.value.userName + "님의 상세정보";
    const onClose = () => {
      this.$emit("closeModal"); // 이벤트 발생
    };

    const closeModal = () => {
      emit("closeModal");
    };
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
.profile {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.text {
  font-size: 14px;
  text-align: left;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
