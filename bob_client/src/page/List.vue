<template>
  <h3>룸메이트 찾기 페이지</h3>
  <!-- <li>
      <img :src="유저.image" class="room-img" />
      <h4 @click="send">이름 : {{ 유저.name }}</h4>
      <p>생일 : {{ 유저.birthday }}</p>
        <img class="profile" :src="유저.image" h4 @click="send" /> 이름 : {{ 유저.name }}
    </li> -->
  <!-- <el-card class="box-card">
    <div v-for="o in 1" :key="o" class="text item">
      {{ "이미지넣기 " + o }}<button>신청</button>
    </div>
  </el-card> -->



  <div v-for="o in 1" :key="o" class="text item">
    <el-card class="box-card" shadow="hover" style="cursor: pointer">dsdf
      <!-- <img class="profile" :src="유저.image" h4 @click="send" /> 이름 : {{ 유저.name }} -->
      <button>신청</button>
    </el-card>
  </div>
</template>

<script>

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
