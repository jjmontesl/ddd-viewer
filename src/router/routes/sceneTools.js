export default [
  {
    path: '/3d/tools/',
    name: 'sceneTools',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "sceneMain" */ '@/components/scene/SceneTools.vue')
  }
]

