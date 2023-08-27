<!--참고 : https://element-plus.org/en-US/component/alert.html#basic-usage -->

<template>
  <h3>알림 페이지</h3>
  <el-alert title="상암동불주먹님과 룸메이트 매칭되었습니다." type="success" :closable="false">
    <button>수락</button> <button>거절</button></el-alert>
  <el-alert title="customized close-text" type="info" close-text="Gotcha" />
  <el-alert title="alert with callback" type="warning" @close="hello" />

  <el-alert title="unclosable alert" type="success" :closable="false" />
</template>

<script>
export default {
  setup() {
  },
};
</script>
<style scoped>
.el-alert {
  margin: 20px 0 0;
}

.el-alert:first-child {
  margin: 0;
}
</style>
