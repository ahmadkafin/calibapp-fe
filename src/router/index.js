import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import VerifyTfa from '@/views/VerifyTfa.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Home'
    },
    meta: { requiresAuth: true },
  },
  {
    path: '/home',
    name: "Home",
    meta: { requiresAuth: true },
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    meta: { guest: true },
    component: LoginView,
  },
  {
    path: '/verify-tfa',
    name: 'verifyTfa',
    meta: { guest: true },
    component: VerifyTfa,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const guestOnly = to.matched.some(r => r.meta.guest)
  const loggedIn = !!localStorage.getItem('userdata')

  if (requiresAuth && !loggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (guestOnly && loggedIn) {
    return { name: 'home' }
  }
})

export default router
