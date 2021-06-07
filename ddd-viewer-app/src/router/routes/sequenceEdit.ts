export default [
  {
    path: '/seq/',
    name: 'sceneSequenceEdit',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import( /* webpackChunkName: "sceneSequenceEdit" */ '@/components/seq/SequenceEditor.vue' )
  }
]

