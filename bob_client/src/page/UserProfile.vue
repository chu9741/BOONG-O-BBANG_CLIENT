<template>
  <div style="padding: 10px">
    <h4>유저프로필</h4>
    <div class="post-header" v-for="(a, i) in user" :key="i">
      <!-- <div class="profile">
        <el-skeleton-item variant="circle" :style="`background-image:url(${a.image})`" />
      </div> -->

      <el-skeleton style="--el-skeleton-circle-size: 200px">
        <!-- <div class="profile" :style="`background-image:url(${a.image})`"></div> -->
        <!--  -->
        <template #template>
          <el-skeleton-item class="profile" variant="circle" :style="`background-image:url(${a.image})`" />
        </template>
      </el-skeleton>

      <span class="profile-name">{{ a.name }}</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'userprofile',
  props: {
    one: Number,
  },
  setup() {
    let user = ref([]);

    onMounted(() => {
      axios.get('/user.json').then((a) => {
        user.value = a.data;
      });
    });
    return { user };
  },
};
</script>

<style>
.profile {
  background-image: url('https://picsum.photos/100?random=0');
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}

.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
</style>
