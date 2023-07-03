import { createRouter, createWebHistory } from 'vue-router';

import list from '../views/list.vue';
import detail from '../views/detail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: list,
    },
    {
      path: '/about/:id',
      name: 'about',
      component: detail,
    },
  ],
});

export default router;
