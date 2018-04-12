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
  mutations: {
    [types.SET_CREDENTIALS] (state, credentials) {
      state.credentials = credentials
    },

    [types.REFRESH_DIRECTORY] (state, contacts) {
      //   contacts.forEach(contact => console.log(contact.firstName))
      //
      state.contacts = contacts
    },

    [types.ADD_CONVERSATION] (state, conv) {
      console.log('yeni conv')
      state.conversations.push(conv)
    },

    [types.SET_CONVERSATIONS] (state, conversations) {
      state.conversations = conversations
    },

    [types.REFRESH_CALLLOGS] (state, logs) {
      console.log('refresh call logs')
      state.history = logs
      console.log(logs)
    }
  }
})
export default store
