import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LogIn.vue';
import Register from '../components/UserRegister.vue';
import Dashboard from '../components/TimeCapsuleDashboard.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
