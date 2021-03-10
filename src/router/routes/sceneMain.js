export default [
  {
    path: '/3d/:position(@[^\/]+)?',
    name: 'sceneMain',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "sceneMain" */ '@/components/SceneMain.vue')
  }
]
