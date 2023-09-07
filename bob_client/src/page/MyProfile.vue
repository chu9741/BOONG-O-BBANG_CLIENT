<template>
  <div class="largemyprofile">
    <el-row class="row-bg" justify="center">
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6" style="text-align: center"
        ><div class="grid-content ep-bg-purple-light">
          <img class="profile" :src="form.userPhoto" /></div
      ></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
    <el-row class="row-bg" justify="center">
      <el-col :span="2"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="20"
        ><div class="grid-content ep-bg-purple-light" />
        <span>
          <div class="myprofiletext">이름 : {{ form.userName }}</div>
          <div class="myprofiletext">MBTI : {{ form.userMBTI }}</div>
          <div class="myprofiletext">출생년도 : {{ form.userBirthYear }}</div>
          <div class="myprofiletext">선호 지역 : {{ form.userLocation }}</div>
          <div class="myprofiletext">청소 빈도 : {{ form.userCleanCount }}</div>
          <div class="myprofiletext">
            반려동물 여부 :
            {{ form.userHasPet ? "반려동물이 있어요" : "반려동물이 없어요" }}
          </div>
          <div class="myprofiletext">
            자취경험 여부 :
            {{ form.userHasExperience ? "자취경험 있어요" : "자취 처음이에요" }}
          </div>
          <div class="myprofiletext">
            흡연 여부 : {{ form.userIsSmoker ? "흡연자" : "비흡연자" }}
          </div>
          <div class="myprofiletext">
            기상시간 :
            {{ form.userIsNocturnal ? "오후기상[야]" : "오전기상[주]" }}
          </div>
          <div class="myprofiletext">
            평균 점수 : {{ form.userAverageScore }}
          </div>
          <div class="myprofiletext">
            자기소개 : {{ form.userIntroduction }}
          </div>
        </span>
      </el-col>
      <el-col :span="2"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  setup() {
    let form = ref({});
    const userId = localStorage.getItem("userId");
    const getUserInfo = async () => {
      const response = await axios.get(`api/users/${userId}/profile`);

      form.value = response.data;
    };

    onMounted(() => {
      getUserInfo();
    });
    return { form };
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.profile {
  width: 150px;
  height: 150px;
  border-radius: 70%;
  object-fit: cover;
  background: #bdbdbd;
}

.myprofiletext {
  font-size: 18px;
  /* margin-top: 11hv; */
  line-height: 1.8em;
}
</style>
