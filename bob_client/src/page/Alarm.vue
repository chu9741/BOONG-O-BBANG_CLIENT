<template>
  <h3>알림 페이지</h3>
  <div v-for="notification in notifications" :key="notification.id">
    <el-card
      v-if="!notification.isClicked"
      :closable="false"
      :body-style="{ padding: '20px' }"
      style="margin-bottom: 10px"
    >
      <div class="card-content">
        <span class="left-content">
          <span
            class="user-name"
            style="height: 40px; line-height: 40px; cursor: pointer"
            @click.stop="openModal(notification)"
            >{{ notification.message }}</span
          >
        </span>
        <span class="right-content">
          <el-button
            type="success"
            @click="onAccept(notification)"
            v-show="notification.notificationType == 'REQUEST'"
            >수락</el-button
          >
          <el-button
            type="danger"
            @click="onReject(notification)"
            v-show="notification.notificationType == 'REQUEST'"
            >거절</el-button
          >

          <el-button
            type="info"
            @click="onDelete(notification)"
            v-show="notification.notificationType == 'ROOMMATE'"
            >알림 삭제</el-button
          >
        </span>
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
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import Modal from "@/components/Modal.vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

export default {
  components: {
    Modal,
  },
  setup() {
    const notifications = ref([]);
    const showModal = ref(false);
    let selectedUser = ref(null);
    const router = useRouter();
    let currentPage = ref(1);

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

    const getAllNotifications = async () => {
      try {
        const response = await axios.get(
          `api/notifications/${currentPage.value}`,
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        );
        notifications.value = response.data.map((notification) => {
          return {
            ...notification,
            isClicked: false,
          };
        }); // 가져온 데이터를 nominees에 할당
        console.log(notifications.value);
        console.log(response);
      } catch (error) {
        if (error.response.data == "ExpiredJwtException") {
          reIssueToken();
          // location.reload();
        } else {
          console.log(error.response);
          router.push("/");
        }
      }
    };

    onMounted(() => {
      getAllNotifications();
    });

    const openModal = (notification) => {
      axios
        .get(`api/users/${notification.relatedUserEmail}`, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          selectedUser.value = res.data;
          showModal.value = true;
        })
        .catch((error) => {
          exceptionHandling(error);
        });
    };

    const closeModal = () => {
      showModal.value = false;
      selectedUser.value = null;
    };

    const onAccept = async (notification) => {
      //백엔드연결 (request상태 변경)
      await axios
        .post(
          `api/roommates/request/accept/${notification.notificationId}`,
          null,
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        )
        .then(() => {
          ElMessage({
            type: "success",
            message: `${notification.message.slice(
              0,
              3
            )}님의 요청을 수락하였습니다.`,
          });
          notification.isClicked = true;
        })
        .catch((error) => {
          exceptionHandling(error);
        });
    };

    const onReject = async (notification) => {
      //백엔드연결 (request상태 변경)
      await axios
        .delete(`api/roommates/request/${notification.notificationId}`, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then(() => {
          ElMessage({
            type: "error",
            message: `${notification.message.slice(
              0,
              3
            )}님의 요청을 거절하였습니다.`,
          });
          notification.isClicked = true;
        })
        .catch((error) => {
          if (error.response.data == "ExpiredJwtException") {
            reIssueToken();
            location.reload();
          } else {
            router.push("/");
          }
        });
    };

    const onDelete = async (notification) => {
      await axios
        .delete(`api/notifications/${notification.notificationId}`, {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then(() => {
          ElMessage({
            type: "info",
            message: `알림이 삭제되었습니다.`,
          });
          notification.isClicked = true;
        })
        .catch((error) => {
          exceptionHandling(error);
        });
    };

    return {
      notifications,
      spanStyle: {
        marginRight: "1em",
      },
      openModal,
      showModal,
      closeModal,
      selectedUser,
      currentPage,
      onAccept,
      onReject,
      exceptionHandling,
      onDelete,
    };
  },
};
</script>

<style>
.avatarStyle {
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin-right: 10px;
  align-items: center;
  vertical-align: middle;
}

.user-name {
  font-weight: bold;
  align-items: center;
}

.left-content {
  align-items: center;
  vertical-align: middle;
}
.right-content {
  justify-content: right;
  /* float: right; */
  vertical-align: middle;
  margin-top: 0.5%;
}
.card-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
