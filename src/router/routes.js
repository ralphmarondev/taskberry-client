export default [
  {
    path: '/',
    name: 'default',
    meta: {
      title: 'TaskBerry',
    },
    component: () => import('@/views/home/homeIndex.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: 'Dashboard',
    },
    component: () => import('@/views/dashboard/dashboardIndex.vue'),
  },
];
