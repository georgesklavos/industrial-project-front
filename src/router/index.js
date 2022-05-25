import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Users from "../views/Users.vue";

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/profile',
    name: "profile",
    component: Profile
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
