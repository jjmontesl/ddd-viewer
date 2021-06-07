export default [
  {
    path: '/3d/mapinsert',
    name: 'sceneMapInsert',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import( /* webpackChunkName: "mapMain" */ '@/components/scene/SceneMapInsert.vue' )
  }
]
