import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '*', name: 'page-not-found', component: () => import('../components/page-not-found/page-not-found') },
  { path: '/', name: 'home', component: () => import('../components/interface/home') },
  { path: '/about', name: 'about', component: () => import('../components/post/about') },
  { path: '/profile', name: 'view-profile', component: () => import('../components/profile/view-profile') },
  { path: '/profile/edit', name: 'edit-profile', component: () => import('../components/profile/edit-profile') },
  { path: '/profile/premium', name: 'change-to-premium', component: () => import('../components/profile/change-to-premium') },
  { path: '/profile/cancel-premium', name: 'cancel-premium', component: () => import('../components/profile/cancel-premium') },
  { path: '/booking-intents', name: 'view-booking-intents', component: () => import('../components/booking/view-booking-intents') },
  { path: '/booking-intent/:id', name: 'view-booking-intent', component: () => import('../components/booking/view-booking-intent') },
  { path: '/posts', name: 'view-posts', component: () => import('../components/post/view-posts') },
  { path: '/offices', name: 'view-offices', component: () => import('../components/post/view-offices') },
  { path: '/offices/add', name: 'add-office', component: () => import('../components/post/add-office') },
  { path: '/offices/:id', name: 'view-office', component: () => import('../components/post/view-office') },
  { path: '/offices/:id/edit', name: 'edit-office', component: () => import('../components/post/edit-office') },
  { path: '/posts/:id', name: 'view-post', component: () => import('../components/post/view-post') },
  { path: '/posts/:id/booking', name: 'add-booking-intent', component: () => import('../components/post/add-booking-intent') },
  { path: '/posts/:id/booking-intents', name: 'view-booking-intent-by-post', component: () => import('../components/post/view-booking-intent-by-post') },
  { path: '/offices/:id/post', name: 'add-post', component: () => import('../components/post/add-post') },
  { path: '/my-reservations', name: 'view-reservations', component: () => import('../components/reservation/view-reservations') },
  { path: '/users/:id', name: 'view-profile-offiprovider', component: () => import('../components/reservation/view-profile-offiprovider') },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
