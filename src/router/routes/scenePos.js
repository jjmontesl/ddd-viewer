export default [
  {
    path: '/3d/pos/',
    name: 'scenePos',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "mapMain" */ '@/components/scene/ScenePosition.vue')
  }
]
