<template>
  <h3>룸메이트 찾기 페이지</h3>
  <el-card v-for="nominee in nominees" :key="nominee.id">
    <div>{{ nominee.userName }}</div>
    <!-- 다른 속성들도 필요에 따라 출력할 수 있습니다 -->
  </el-card>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
export default {
  name: "List",
  props: {
    유저: Object,
  },
  methods: {
    send() {
      this.$emit("openModal", this.유저.id);
    },
  },
  setup() {
    const nominees = ref([]);

    const getAllRoommateNominees = async () => {
      try {
        console.log(localStorage.getItem("JWT"));

        const response = await axios.get("api/users/search", {
          headers: {
            token: localStorage.getItem("JWT"),
          },
        });
        nominees.value = response.data; // 가져온 데이터를 nominees에 할당
      } catch (error) {
        console.error("Error fetching nominees:", error);
      }
    };

    onMounted(() => {
      getAllRoommateNominees();
    });

    return {
      nominees,
    };
  },
};
</script>

<style>
.profile {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.button {
  padding: 10px 20px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 80%;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  background-color: sandybrown;
}
</style>
