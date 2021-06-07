export default [
  {
    path: '/play/',
    name: 'sequencePlay',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import( /* webpackChunkName: "sceneSequenceEdit" */ '@/components/seq/SequencePlay.vue' )
  }
]

