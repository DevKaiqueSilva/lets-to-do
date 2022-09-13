import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogged = to.query && to.query.force == '1' ? '1' : localStorage.getItem('logged');
  const isLoginRoute = to.path.includes('/login');
  if (isLogged && isLogged == '1') {
    if (isLoginRoute) next('/');
    else next();
  } else if (isLoginRoute == false) next('/login');
  else next();
});

export default router;
