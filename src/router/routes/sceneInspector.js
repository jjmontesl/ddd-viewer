export default [
  {
    path: '/3d/inspector/',
    name: 'sceneDebug',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "mapMain" */ '@/components/scene/SceneDebug.vue')
  }
]
