import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/list.vue'),
    },
    {
      path: '/about/:id',
      name: 'about',
      component: () => import('../views/detail.vue'),
    },
  ],
});

export default router;
