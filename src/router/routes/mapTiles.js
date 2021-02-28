export default [
  {
    path: '/maps/tiles',
    name: 'mapTiles',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "mapTiles" */ '@/components/MapTiles.vue')
  }
]
