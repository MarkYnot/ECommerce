import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// set URLs for different webpages
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "normalMain",
      component: () => import("./views/Mainpage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/logIn.vue"),
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("./views/signIn.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("./views/cart.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/profile.vue"),
    },
  ],
});
