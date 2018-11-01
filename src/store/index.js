import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app
  }
})
//热重载
if (module.hot) {
  // 使 mutations 和 modules 成为可热重载模块
  module.hot.accept(['./modules/app'], () => {
    // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
    const newApp = require('./modules/app').default
    // 加载新模块
    store.hotUpdate({
      modules: {
        app: newApp
      }
    })
  })
}
export default store
