<template>
  <div class="allmodal">
    <el-dialog :visible="localVisible" :show-close="false" @update:visible="updateVisible">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">상암동불주먹님 평가하기</h4>
          <el-button type="danger" @click="close"> X </el-button>
        </div>
      </template>
      <h1>상암동불주먹님은 어떠셨나요?</h1>
      <div class="center-container">
        <div class="demo-rate-block">
          <span class="demonstration">별을 클릭해라</span>
          <el-rate v-model="value1" size="large" />
          <button @click="localVisible  = false">평가제출</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { ref, watch } from "vue";
// import { ElButton, ElDialog } from "element-plus";

// const value1 = ref(null);

// export default {
//   name: "Modal",
//   components: {
//     ElButton,
//     ElDialog,
//   },
//   props: {
//     visible: Boolean, // Props로 visible 값을 받음
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

export default {
  name: "Modal",
  components: {
    ElButton,
    ElDialog,
  },
  props: {
    visible: Boolean, // Props로 visible 값을 받음
  },
  setup(props) {
    // v-model에 의해 사용되는 로컬 상태 변수
    const localVisible = ref(props.visible);

    // 부모로부터 전달된 props를 감시하여 로컬 상태 업데이트
    watch(
      () => props.visible,
      (newVal) => {
        localVisible.value = newVal;
      }
    );

    return {
      localVisible, // 로컬 상태를 반환하면서 부모 컴포넌트로부터 분리
    };
  },
};

</script>

<style scoped>
.allmodal {
  width: 20%;
}
.demo-rate-block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
}
.demo-rate-block:last-child {
  border-right: none;
}
.demo-rate-block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.demo-rate-block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
}
.demo-rate-block:last-child {
  border-right: none;
}
.demo-rate-block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.center-container {
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  /* align-items: center; 수직 가운데 정렬 */
  /* height: 100vh; 화면 높이만큼 세로로 확장 */
}
</style>
