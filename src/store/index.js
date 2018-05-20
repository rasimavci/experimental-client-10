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
    [types.SET_SELF] (state, self) {
      state.self = self
      console.log('self ' + self)
    },
    [types.SET_CALLEE] (state, callee) {
      state.callee = callee
      console.log('callee ' + callee)
    },
    [types.SET_PARTICIPANT] (state, participant) {
      state.participant = participant
    },
    [types.SET_STARTCALL] (state, startCall) {
      state.startCall = startCall
    },
    [types.SET_CONTACTSOURCE] (state, source) {
      state.contactSource = source
    },
    [types.SET_ISCONNECTED] (state, isConnected) {
      state.isConnected = isConnected
    },
    [types.SET_SORTBY] (state, sortBy) {
      state.sortBy = sortBy
    },
    [types.SET_LOGTYPE] (state, logType) {
      state.logType = logType
    },
    [types.UPDATE_CURRENTPAGE] (state, page) {
      state.currentPage = page
    },
    [types.SET_ACTIVECALLTAB] (state, tab) {
      state.activeCallTab = tab
      console.log('activeCallTab ' + tab)
    },
    [types.SET_INCOMING_CALL] (state, incomingCall) {
      state.incomingCall = incomingCall
    },
    [types.SET_CREDENTIALS] (state, credentials) {
      state.credentials = credentials
    },

    [types.REFRESH_DIRECTORY] (state, directory) {
      state.directory = directory
    },

    [types.REFRESH_CONTACTS] (state, contacts) {
      state.contacts = contacts
    },

    [types.ADD_CONVERSATION] (state, conv) {
      console.log('yeni conv')
      state.conversations.push(conv)
    },

    [types.SET_CONVERSATIONS] (state, conversations) {
      state.conversations = conversations
    },
    [types.ADD_ACTIVECONVERSATIONS] (state, conversationId) {
      state.activeConversations.indexOf(conversationId) === -1 ? state.activeConversations.push(conversationId) : console.log("This conv already exists");

      // state.conversations.forEach((conv) => {
      //   if (conv.conversationId = conversationId)
      // })
      // state.conversations = conversations
    },

    [types.CLEAR_ACTIVECONVERSATIONS] (state) {
      state.activeConversations = []
    },
    [types.REFRESH_CALLLOGS] (state, logs) {
      console.log('refresh call logs')
      state.history = logs
      console.log(logs)
    },

    [types.UPDATE_CALLS] (state, calls) {
      state.calls = calls
      calls.forEach(function (call) {
        if (
          call.id === state.activeCall.callId ||
          call.id === state.activeCall.id
        ) {
          state.activeCall = call
        }
      })
    },

    [types.UPDATE_SESSIONS] (state, calls) {
      state.sessions = calls
    },

    [types.SET_ACTIVE_CALL] (state, call) {
      state.activeCall = call
    },

    [types.SET_ACTIVECALLID] (state, to) {
      state.activeCall.to = to
    },

    [types.RINGING_SOUND] (state, options) {
      if (options.play) {
        state.sounds.ringing.loop = true
        state.sounds.ringing.play()
      } else {
        state.sounds.ringing.pause()
        state.sounds.ringing.load()
      }
    }
  }
})
export default store
