export default [
  {
    path: '/game/fly/',
    name: 'gameFly',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "gameFly" */ '@/components/game/fly/FlyGame.vue')
  }
]

