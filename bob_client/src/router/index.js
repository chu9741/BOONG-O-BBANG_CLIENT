import { createRouter, createWebHistory } from "vue-router";
import Home from "../page/HomeView.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import Root from "../page/LoginView.vue";

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
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  ],
});
