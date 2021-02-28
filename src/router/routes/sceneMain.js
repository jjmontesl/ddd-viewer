export default [
  {
    path: '/3d',
    name: 'sceneMain',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "sceneMain" */ '@/components/SceneMain.vue')
  }
]
