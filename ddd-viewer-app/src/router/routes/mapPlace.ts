export default [
  {
    path: '/maps/place/:name/:position(@[^\/]+)?',
    name: 'mapPlace',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import( /* webpackChunkName: "mapPlace" */ '@/components/map/MapPlace.vue' )
  }
]
