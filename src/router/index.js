import { createRouter, createWebHistory } from "vue-router";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "active",
});

export default router;
