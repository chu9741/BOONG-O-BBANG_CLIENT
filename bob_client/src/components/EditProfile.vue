<template>
  <div :style="box1">
    <div :style="box2">
      <el-scrollbar height="100vh">
        <div>
          <img class="profile" :src="form.userPhoto" />
        </div>
        <div>{{ console.log(form) }}</div>
        <el-form :model="form" label-width="120px" :disabled="true">
          <el-form-item label="이름">
            <el-input v-model="form.userName" />
          </el-form-item>
          <el-form-item label="이메일">
            <el-input v-model="form.userEmail" />
          </el-form-item>
          <el-form-item label="출생년도">
            <el-input v-model="form.userBirthYear" />
          </el-form-item>
          <el-form-item label="성별">
            <el-input v-model="form.userGender" />
          </el-form-item>
        </el-form>

        <el-form :model="form" label-width="120px">
          <el-form-item label="닉네임">
            <el-input v-model="form.userNickName" />
          </el-form-item>
          <el-form-item label="거주희망지역">
            <el-select
              v-model="form.userLocation"
              placeholder="거주희망지역을 선택해주세요."
            >
              <div v-for="(region, idx) in regions" :key="idx">
                <el-option :label="region" :value="region">{{
                  region
                }}</el-option>
              </div>
            </el-select>
          </el-form-item>

          <el-form-item label="청소 빈도">
            <el-radio-group v-model="form.userCleanCount">
              <el-radio label="1~2회" />
              <el-radio label="3~4회" />
              <el-radio label="5회이상" />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="MBTI">
            <el-select
              v-model="form.userMBTI"
              placeholder="본인의 MBTI를 골라주세요."
            >
              <div v-for="mbti in mbtis" :key="mbti" class="mt-2">
                <el-option :label="mbti" :value="mbti">{{ mbti }}</el-option>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="반려동물 여부">
            <el-radio-group v-model="form.userHasPet">
              <el-radio :label="true" :value="true">반려동물이 있어요</el-radio>
              <el-radio :label="false" :value="false"
                >반려동물이 없어요</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="자취경험 여부">
            <el-radio-group v-model="form.userHasExperience">
              <el-radio :label="true" :value="true">자취경험 있어요</el-radio>
              <el-radio :label="false" :value="false">자취 처음이에요</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="흡연 여부">
            <el-radio-group v-model="form.userIsSmoker">
              <el-radio :label="true">흡연</el-radio>
              <el-radio :label="false">비흡연</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="기상시간">
            <el-radio-group v-model="form.userIsNocturnal">
              <el-radio :label="false">오전 기상[주]</el-radio>
              <el-radio :label="true">오후 기상[야]</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="자기소개">
            <el-input
              v-model="form.userIntroduction"
              type="textarea"
              :rows="10"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(form.userId)"
              >Update</el-button
            >
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
        <div>
          {{ console.log(myInfo) }}
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

export default {
  props: {
    userInfo: Object,
  },

  setup(props) {
    let myInfo = ref(props.userInfo);
    const form = reactive({});

    const mbtis = [
      "ENFJ",
      "ENTJ",
      "ENFP",
      "ENTP",
      "ESFP",
      "ESFJ",
      "ESTP",
      "ESTJ",
      "INFP",
      "INFJ",
      "INTP",
      "ISTP",
      "ISFP",
      "ISFJ",
      "ISTJ",
      "INTJ",
    ];
    const regions = [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ];

    const getUserInfo = async () => {
      const response = await axios.get("api/users", {
        headers: {
          token: localStorage.getItem("JWT"),
        },
      });
      console.log(response.data);
      myInfo.value = response.data;

      form.userId = myInfo.value.userId;
      form.userPhoto = myInfo.value.userPhoto;
      form.userName = myInfo.value.userName;
      form.userNickName = myInfo.value.userNickName;
      form.userEmail = myInfo.value.userEmail;
      form.userBirthYear = myInfo.value.userBirthYear;
      form.userGender = myInfo.value.userGender;
      form.userCleanCount = myInfo.value.userCleanCount;
      form.userLocation = myInfo.value.userLocation;
      form.userMBTI = myInfo.value.userMBTI;
      form.userHasPet = myInfo.value.userHasPet;
      form.userHasExperience = myInfo.value.userHasExperience;
      form.userIsSmoker = myInfo.value.userIsSmoker;
      form.userIsNocturnal = myInfo.value.userIsNocturnal;
      form.userIntroduction = myInfo.value.userIntroduction;
    };

    onMounted(() => {
      getUserInfo();
    });

    const onSubmit = (userId) => {
      for (const key in form) {
        if (form[key].length === 0) {
          alert(`반드시 모든 값을 입력해야합니다.`);
          return;
        }
        // console.log(JSON.stringify(form));
        // console.log(form);
      }

      try {
        axios
          .patch(`api/users/${userId}`, form, {
            headers: {
              token: localStorage.getItem("JWT"),
            },
          })
          .then(location.reload());
      } catch (err) {
        console.log(err);
      }
    };

    const onCancel = () => {
      location.reload();
    };
    return {
      box1: {
        height: "50%",
      },
      box2: {
        height: "80%",
      },
      form,
      onSubmit,
      mbtis,
      regions,
      myInfo,
      onCancel,
    };
  },
};
</script>
<style>
.profile {
  width: 150px;
  height: 150px;
  border-radius: 70%;
  object-fit: cover;
  background: #bdbdbd;
}
</style>
