import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
// import mutations from './mutations'
import * as types from './mutation-types'
import _ from 'lodash'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state,
  actions,
  getters,
  mutations : {
    [types.SET_CREDENTIALS] (state, credentials) {
      state.credentials = credentials
    }
  }
})
export default store
