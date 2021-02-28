export default [
  {
    path: '/3d/ar/surface',
    name: 'sceneARSurface',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "sceneARSurface" */ '@/components/SceneARSurface.vue')
  }
]
