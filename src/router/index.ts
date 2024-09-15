import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "../components/Home.vue";
import Deals from "../components/Deals.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Home },
  { path: "/deals", name: "Deals", component: Deals },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
