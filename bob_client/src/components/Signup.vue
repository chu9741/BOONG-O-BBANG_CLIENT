<template>
  <div class="largebox">
    <el-scrollbar height="100vh">
      <div>
        <div style="display: flex; justify-content: center">
          <img
            class="profile"
            :src="res.userPhoto"
            style="
              width: 100px;
              height: auto;
              border-radius: 70%;
              object-fit: cover;
              background: #bdbdbd;
              margin: 10px;
            "
          />
        </div>

        <el-form
          :model="form"
          label-width="120px"
          :disabled="true"
          style="width: 80%"
        >
          <el-form-item label="이름">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="이메일">
            <el-input v-model="form.userEmail" />
          </el-form-item>
          <el-form-item label="생년월일">
            <el-input v-model="form.userBirth" />
          </el-form-item>
          <el-form-item label="성별">
            <el-input v-model="form.userGender" />
          </el-form-item>
        </el-form>

        <el-form :model="form" label-width="120px" style="width: 80%">
          <el-form-item label="닉네임">
            <el-input v-model="form.userNickname" />
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
              :rows="5"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
        <!-- </div> -->
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  mounted() {
    if (!localStorage.getItem("refreshed")) {
      localStorage.setItem("refreshed", true);
      location.reload(); // 페이지 자동으로 새로 고침
    }
  },
  setup() {
    const res = JSON.parse(sessionStorage.getItem("userDTO"));
    const form = reactive({
      userNaverId: res.userId,
      username: res.username,
      userNickname: "닉네임을 적어주세요.",
      userEmail: res.userEmail,
      userBirth: res.userBirthYear + "-" + res.userBirthday,
      userMobile: res.userMobile,
      userGender: res.userGender == "M" ? "MAN" : "WOMAN",
      userCleanCount: "",
      userLocation: "",
      userMBTI: "",
      userHasPet: "",
      userHasExperience: "",
      userIsSmoker: "",
      userIsNocturnal: "",
      userIntroduction: "",
    });

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
    const onSubmit = () => {
      for (const key in form) {
        if (form[key].length === 0) {
          ElMessageBox.alert(
            "반드시 모든 값을 입력해야합니다.",
            "회원가입 오류",
            {
              confirmButtonText: "확인",
              type: "error",
            }
          );
          return;
        }
      }
      if (form.userCleanCount == "1~2회") {
        form.userCleanCount = "ONE_TO_TWO";
      } else if (form.userCleanCount == "3~4회") {
        form.userCleanCount = "THREE_TO_FOUR";
      } else {
        form.userCleanCount = "MORE_THAN_FOUR";
      }

      try {
        axios.post(`/api/users/signup`, form).then((res) => {
          ElMessage({
            message: res.data,
            type: "success",
            duration: 2000,
          });
        });
        router.push("/");
      } catch (err) {
        console.log("다시 로그인 해주세요" + err.response);
      }
    };

    const router = useRouter();
    const onCancel = () => {
      router.push("/");
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
      res,
      onCancel,
    };
  },
};
</script>
<style>
@font-face {
  font-family: "Cafe24Ssurround";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.largebox {
  font-family: "Cafe24Ssurround";
  /* width:640px;   */
  width: 100%;
  max-width: 700px;
  height: calc(100vh - 10px - 10px);
  float: center;
  transform: "translateY(50%)";
  align-items: center;
  margin: auto;
  background-color: rgb(234, 198, 150);
}
</style>
