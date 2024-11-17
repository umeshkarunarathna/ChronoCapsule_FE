import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../components/LogIn.vue';
import UserRegister from '../components/UserRegister.vue';
import Dashboard from '../components/TimeCapsuleDashboard.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LogIn },
  { path: '/register', name: 'Register', component: UserRegister },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
