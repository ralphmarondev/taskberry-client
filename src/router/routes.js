export default [
  {
    path: '/',
    name: 'default',
    meta: {
      title: 'TaskBerry',
    },
    component: () => import('@/views/home/homeIndex.vue'),
  },
];
