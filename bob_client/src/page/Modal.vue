<template>
<div>

  <h3>모달-프로필상세 페이지</h3>
  <div class="allmodal">
    <el-dialog :visible="localVisible" :show-close="false" @update:visible="updateVisible">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">상암동불주먹</h4>
          <el-button type="danger" @click="close"> X </el-button>
        </div>
      </template>
      <div v-if="step == 3">
        <UserProfile :one="1" />
      </div>
      <!-- 유저 프로필사진 동그라미로 하기 -->
      <div class="box" style="background: #bdbdbd">
        <img class="profile" src="../assets/image.jpg" />
      </div>
      <Container @write="작성한글 = $event" />

      <Container :이미지="이미지" :게시물="게시물" :step="step" />

      <h1>여기는 모달창의 내용이 들어가야함.</h1>
      <!-- step이 3이면 UserProfile 실행 -->
    </el-dialog>
  </div>
</div>
</template>

<script>
// import { ref, watch } from "vue";
// import { ElButton, ElDialog } from "element-plus";
// import UserProfile from "./UserProfile.vue";

// export default {
//   name: "Modal",
//   components: {
//     ElButton,
//     ElDialog,
//     UserProfile,
//   },
//   props: {
//     visible: Boolean, // Props로 visible 값을 받음
//     UserProfile: UserProfile,
//     step: Number,
//   },
//   setup(props) {
//     const visible = ref(props.visible); // props의 visible 값에 따라 로컬 상태 초기화

//     watch(
//       () => props.visible,
//       (newVal) => {
//         visible.value = newVal; // props의 변경을 감시하여 로컬 상태 업데이트
//       }
//     );

//     return {
//       visible,
//     };
//   },
// };
import { ref, watch } from "vue";
import { ElButton, ElDialog } from "element-plus";
import UserProfile from "./UserProfile.vue";

export default {
  name: "Modal",
  components: {
    ElButton,
    ElDialog,
    UserProfile,
  },
  props: {
    visible: Boolean, // Props로 visible 값을 받음
    UserProfile: UserProfile,
    step: Number,
  },
  setup(props) {
    const localVisible = ref(props.visible);

    watch(
      () => props.visible,
      (newVal) => {
        localVisible.value = newVal;
      }
    );

    const updateVisible = (newValue) => {
      localVisible.value = newValue;
    };

    return {
      localVisible,
      updateVisible,
    };
  },
};
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.box {
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
}

.profile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.allmodal {
  width: 30%;
  margin: auto;
}</style>
