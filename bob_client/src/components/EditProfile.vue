<template>
  <div :style="box1">
    <div :style="box2">
      <el-scrollbar height="calc(100vh - 50px - 50px)">
        <div class="editphoto">
          <img
            class="profile"
            :src="
              form.userPhotoUrl == 'empty'
                ? 'https://cdn0.iconfinder.com/data/icons/lagotline-user-and-account/64/User-43-1024.png'
                : form.userPhotoUrl
            "
          />
        </div>
        <el-form :model="form" label-width="120px">
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
              v-model="form.userMbti"
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
            <el-button type="primary" @click="onSubmit">Update</el-button>
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
        <div></div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  props: {},

  setup() {
    let form = ref({});

    const router = useRouter();

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
          router.push("/");
        });
    };

    const exceptionHandling = (error) => {
      if (error.response.data == "ExpiredJwtException") {
        reIssueToken();
        location.reload();
      } else {
        router.push("/");
      }
    };
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`api/users/detail`, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        });
        form.value = response.data;
      } catch (error) {
        exceptionHandling(error);
      }
    };

    onMounted(() => {
      getUserInfo();
    });

    const onSubmit = async () => {
      let requestDto = {
        userNickname: null,
        userMobile: null,
        userCleanCount: null,
        userLocation: null,
        userMbti: null,
        userHasPet: null,
        userHasExperience: null,
        userIsSmoker: null,
        userIsNocturnal: null,
        userIntroduction: null,
        userPhotoUrl: null,
      };

      try {
        requestDto.userCleanCount =
          form.value.userCleanCount === "1~2회"
            ? "ONE_TO_TWO"
            : form.value.userCleanCount === "3~4회"
            ? "THREE_TO_FOUR"
            : "MORE_THAN_FOUR";

        (requestDto.userNickname = form.value.userNickname),
          (requestDto.userMobile = form.value.userMobile),
          (requestDto.userLocation = form.value.userLocation),
          (requestDto.userMbti = form.value.userMbti),
          (requestDto.userHasExperience = form.value.userHasExperience),
          (requestDto.userHasPet = form.value.userHasPet),
          (requestDto.userIsNocturnal = form.value.userIsNocturnal),
          (requestDto.userPhotoUrl = form.value.userPhotoUrl),
          (requestDto.userIsSmoker = form.value.userIsSmoker),
          (requestDto.userIntroduction = form.value.userIntroduction);

        for (const key in requestDto) {
          if (requestDto[key] === null || requestDto[key] === "") {
            ElMessage({
              type: "error",
              message: "반드시 모든 값을 입력해 주세요.",
            });
            return;
          }
        }
        await axios
          .patch(`api/users`, requestDto, {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            ElMessage({
              type: "success",
              message: "수정 완료",
            });
            location.reload();
          })
          .catch((err) => {
            console.log(err);
            exceptionHandling(err);
          });
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

.editphoto {
  text-align: center;
}

.el-radio__input.is-checked + .el-radio__label {
  color: rgb(101, 69, 31) !important;
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: rgb(101, 69, 31) !important;
  background: rgb(101, 69, 31) !important;
}
</style>
