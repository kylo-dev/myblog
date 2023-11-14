import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Join from "@/views/Join.vue";
import Write from "@/views/board/Write.vue";
import Detail from "@/views/board/Detail.vue";
import BoardUpdate from "@/views/board/Update.vue";
import UserUpdate from "@/views/user/Update.vue";

const routes = [
  {path: '/', component: Home},
  {path: '/auth/loginForm', component: Login},
  {path: '/auth/joinForm', component: Join},
  {path: '/auth/updateForm', component: UserUpdate},
  {path: '/board/saveForm', component: Write},
  {path: '/board/:id', component: Detail},
  {path: '/board/:id/updateForm', component: BoardUpdate},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
