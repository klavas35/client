import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/register",
    name: "regUser",
    component: () =>
      import(/*webpackChekName: "register" */ "../views/RegisterUser.vue")
  },
  {
    path: "/secret",
    name: "secret",
    component: () => import("../views/secret.vue"),
    beforeEnter: (to, from, next) => {
      store.dispatch("isLogged").then(() => {
        if (store.getters.getAuth) {
          next();
        } else {
          next({
            path: "/"
          });
        }
      });
    }
  },
  {
    path: "/commenttest",
    name: "comment",
    component: () => import("../views/CommentsTest.vue"),
    props: async data => {
      const routeId = data.params.postId;
      await store.dispatch("setPost", routeId);
    }
  },
  {
    path: "/posting",
    name: "AddPost",
    component: () => import("../views/AddPost.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("../views/NotFound.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
