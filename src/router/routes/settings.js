export default [
  {
    path: '/settings/',
    name: 'settings',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "mapPlace" */ '@/components/Settings.vue')
  }
]
