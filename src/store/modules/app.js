const app = {
  state: {
    isShowShare: false,
    user: {}
  },
  mutations: {
    APP_TOGGLE_SHARE ( state) {
      state.isShowShare = !state.isShowShare
    },
    APP_SET_USER ( state, payload) {
      state.user = payload
    }
  }
}
export default app
