export default [
  {
    path: '/3d/item/:id(.*)',
    name: 'sceneItem',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "sceneMain" */ '@/components/scene/SceneItem.vue')
  }
]

