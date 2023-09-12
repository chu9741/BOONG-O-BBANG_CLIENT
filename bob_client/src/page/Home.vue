<template>
  <div class="largebox">
    <div style="justify-content: center; display: flex">
      <el-card class="mainbox-card" style="margin-bottom: 10px">
        <template #header>
          <div v-if="user" class="card-header">
            <span><el-avatar :src="user.userPhoto"> </el-avatar></span>
            <span>{{ user.username }}</span>
            <el-button class="button" text @click="openModal(user)"
              >상세정보 보기</el-button
            >
          </div>
        </template>
        <div v-if="user">
          <div class="text item">{{ user.userAge }}</div>
          <div class="text item">{{ user.userMBTI }}</div>
        </div>
      </el-card>
    </div>
    <Modal
      v-if="showModal"
      v-model:selectedUser="selectedUser"
      :showModal="showModal"
      @closeModal="closeModal"
      @close="closeModal"
    />
    <div style="justify-content: center; display: flex">
      <span class="mainiconbox1">
        <img class="mainicon1" src="@/assets/icon2.png"
      /></span>
      <span class="mainiconbox2">
        <div v-if="myBob">
          <img class="mainicon2" src="@/assets/icon.png" />
        </div>
      </span>
    </div>
    <div style="justify-content: center; display: flex">
      <el-card class="mainbox-card" style="margin-top: 10px">
        <template #header>
          <div v-if="user" class="card-header">
            <span
              ><el-avatar :src="myBob ? myBob.userPhoto : noneUser.userPhoto">
              </el-avatar
            ></span>
            <span>{{ myBob ? myBob.username : noneUser.username }}</span>
            <div v-if="myBob">
              <el-button class="button" text @click="openModal(myBob)"
                >상세정보 보기</el-button
              >
            </div>
          </div>
        </template>
        <div v-if="user">
          <div class="text item">
            {{ myBob ? myBob.userAge : noneUser.userAge }}
          </div>
          <div class="text item">
            {{ myBob ? myBob.userMBTI : noneUser.userMBTI }}
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal,
  },
  setup() {
    const showModal = ref(false);
    let user = ref({});
    let selectedUser = ref(null);
    let myBob = ref({});
    const router = useRouter();
    const noneUser = ref({
      username: "",
      userPhoto:
        "https://cdn0.iconfinder.com/data/icons/lagotline-user-and-account/64/User-43-1024.png",
      userAge: "매칭된 룸메이트가 없습니다.",
      userMBTI: "",
      userBirthYear: "None",
    });

    const reIssueToken = async () => {
      const reIssueDto = {
        userNaverId: localStorage.getItem("userId"),
      };
      await axios
        .post("api/users/reissue", reIssueDto, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("TOKEN REISSUED.");
          localStorage.removeItem("Authorization");
          localStorage.setItem("Authorization", res.headers.getAuthorization());
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          router.push("/");
        });
    };

    const exceptionHandling = (error) => {
      if (error.response) {
        if (error.response.data == "ExpiredJwtException") {
          reIssueToken();
        }
      }
    };

    const getUserInfo = async () => {
      await axios
        .get("api/roommates/matching", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          user.value = res.data[0];
          myBob.value = res.data[1];
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          exceptionHandling(err);
        });
      console.log(user.value);
      console.log(myBob.value);
    };

    onMounted(() => {
      getUserInfo();
    });

    const openModal = (user) => {
      if (user == undefined || user == null) {
        user = noneUser;
      }
      selectedUser.value = user;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedUser.value = null;
    };
    return {
      user,
      myBob,
      closeModal,
      openModal,
      selectedUser,
      showModal,
      noneUser,
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
  width: 50%;
  height: calc(100vh - 10px - 10px);
  float: center;
  transform: "translateY(50%)";
  align-items: center;
  margin: auto;
  background-color: rgb(234, 198, 150);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mainbox-card {
  width: 50%;
}

.button {
  font-family: "Cafe24Ssurround";
  background-color: rgb(200, 174, 125);
}

.mainicon1 {
  height: 100px;
  width: 100px;
  margin: auto;
  margin-right: 15px;
}
.mainicon2 {
  height: 100px;
  width: 100px;
  margin: auto;
  align-content: right;
  margin-left: 15px;
}

.mainiconbox1 {
  /* margin: auto; */
  align-items: start;
}
.mainiconbox2 {
  /* margin: auto; */
  align-items: end;
}
</style>
