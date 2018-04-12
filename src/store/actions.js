import * as types from './mutation-types'
import createKandy from '../../kandy.link.js'
import store from './index'
import IMService from '../IMService'
import _ from 'lodash'

export const setCredentials = ({ commit }, credentials) => {
  if (credentials) {
    commit(types.SET_CREDENTIALS, credentials)
  }
}

export const connect = ({ commit }, credentials) => {
  addEventListeners()
  console.log(
    'credentials ' + credentials.username + ' ' + credentials.password
  )
  kandy.connect(credentials)
}
export const send = ({ commit }, message) => {
  // send;
  // context.commit (types.SEND, participant, message);
  console.log('sent message ' + message.text + ' to ' + message.participant)
  sendMessage(message.participant, message.text)
}

export const retrieveCallLogs = ({ commit }, message) => {
  // amount = 20, offset = 0
  kandy.call.history.fetch(amount, offset) // fetch
}

export const removeCallLog = recordId => {
  kandy.call.history.remove(recordId) // remove
}
export const removeCallHistory = ({ commit }) => {
  kandy.call.history.ckear('all') // clear
}
export const getCallLogs = ({ commit }) => {
  let logs = kandy.call.history.get()
  store.commit('REFRESH_CALLLOGS', logs)
}
function sendMessage (participant, messagetoSend) {
  // currentConvo = self.getConversation(participant)
  const currentConvo = kandy.conversation.get(participant)
  let convoExist = false
  const message = currentConvo.createMessage(messagetoSend)

  // dont add new conv if already exist
  store.state.conversations.forEach(function (conv) {
    if (conv.destination === currentConvo.destination) convoExist = true
  })
  if (!convoExist) {
    // store.commit('ADD_CONVERSATION', currentConvo)
  }
  message.send()
  Object.keys(currentConvo).forEach(function (key) {
    console.log('heyyo ' + key, currentConvo[key])
  })
  // console.log('currentConvo: ' + currentConvo)
}

function getMessages () {
  let messages = IMService.getMessages()
  // store.dispatch('setConversations', _.cloneDeep(messages))
  store.commit('SET_CONVERSATIONS', _.cloneDeep(messages))
}

function addEventListeners () {
  kandy.on('auth:change', function (data) {
    console.log('auth:change Event Data: ' + JSON.stringify(data))
    if (kandy.getConnection().isConnected === true) {
      //  store.dispatch ('refresh');
      kandy.contacts.refresh()
      getMessages()
      // this.refreshContacts ();
      kandy.call.history.fetch()
      // retrieveCallLogs()
      // Kandyjs.getCallLogs ();
      // Kandyjs.fetchConversations ();
      // Kandyjs.searchDirectory ();
    }
  })

  kandy.on('contacts:change', params => {
    store.commit('REFRESH_DIRECTORY', params.contacts)
    // store.dispatch ('refresh', params.contacts);
  })

  kandy.on('conversations:change', res => {
    let conv = kandy.conversation.get(res.conversationId)
    let messages = {
      conversationId: res.conversationId,
      messages: conv.getMessages()
    }
    IMService.saveMessage(messages)
    getMessages()
  })

  kandy.on('messages:change', res => {
    let conv = kandy.conversation.get(res.conversationId)
    let messages = {
      conversationId: res.conversationId,
      messages: conv.getMessages()
    }
    IMService.saveMessage(messages)
    getMessages()
  })

  //   kandy.on('callHistory:change', res => {
  //     let history = kandy.call.history.get()
  //     console.log('history ' + history)
  //   })

  kandy.on('callHistory:change', params => {
    let logs = kandy.call.history.get()
    store.commit('REFRESH_CALLLOGS', logs)
  })
}
// This line is used to create a new instans of Kandy
const kandy = createKandy({
  authentication: {
    subscription: {
      expires: 3600,
      service: ['IM', 'Presence', 'call'],
      protocol: 'https',
      server: 'spidr-ucc.genband.com',
      version: '1',
      port: '443'
    },
    websocket: {
      protocol: 'wss',
      server: 'spidr-ucc.genband.com',
      port: '443'
    }
  },
  logs: {
    logLevel: 'debug',
    enableFcsLogs: true
  },
  call: {
    chromeExtensionId: 'put real extension ID here',
    serverProvidedTurnCredentials: true,
    iceserver: [
      {
        url: 'stun:turn-ucc-1.genband.com:3478?transport=udp'
      },
      {
        url: 'stun:turn-ucc-2.genband.com:3478?transport=udp'
      },
      {
        url: 'turns:turn-ucc-1.genband.com:443?transport=tcp',
        credential: ''
      },
      {
        url: 'turns:turn-ucc-2.genband.com:443?transport=tcp',
        credential: ''
      }
    ]
  }
})

createKandy()
