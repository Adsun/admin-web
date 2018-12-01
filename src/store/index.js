import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import supplier from './modules/supplier'
import project from './modules/project'
import common from './modules/common'
import system from './modules/system'
import userHandleLog from './modules/dashboard'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    supplier,
    project,
    common,
    system,
    userHandleLog
  },
  getters
})

export default store
