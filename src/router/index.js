import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
// import NotFound from "../views/NotFound.vue";
import DashBoard from "../layouts/DashBoard.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Product from "../views/Product.vue";

import CategoryRoutes from "../views/category/category-route.js";

const routes = [
  {
    path: "/",
    name: "DashBoard",
    component: DashBoard,
    meta: { requireAuth: true },
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "about",
        name: "About",
        component: About,
      },
      {
        path: "product",
        name: "Product",
        component: Product,
      },
      ...CategoryRoutes,
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  // {
  //   path: "*",
  //   name: "NotFound",
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    const token = localStorage.getItem("token");
    if (!token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
