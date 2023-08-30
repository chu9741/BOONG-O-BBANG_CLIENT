import { createRouter, createWebHistory } from "vue-router";
// import Home from "../page/HomeView.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import Root from "../page/LoginView.vue";
import List from "@/page/List.vue";
import FindRoom from "@/page/FindRoom.vue";
import MyPage from "@/page/MyPage.vue";
import Alarm from "@/page/Alarm.vue";
import Main from "@/page/Main.vue";

export const router = new createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "root",
      component: Root,
    },
    {
      path: "/naverLogin",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },

    {
      path: "/home",
      component: Main,
      children: [
        {
          //누가 /list로 접속하면 <List> 보여주자
          path: "/list",
          component: List,
        },

        {
          path: "/findroom",
          component: FindRoom,
        },

        {
          path: "/alarm",
          component: Alarm,
        },
        {
          path: "/mypage",
          component: MyPage,
        },
      ],
    },
  ],
});
