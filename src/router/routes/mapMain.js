export default [
  {
    path: '/maps/:position(@[^\/]+)?',
    name: 'mapMain',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import( /* webpackChunkName: "mapMain" */ '@/components/MapMain.vue' )
  }
]
