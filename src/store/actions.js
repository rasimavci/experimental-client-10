import * as types from './mutation-types'
import createKandy from '../../kandy.link.js'
import store from './index'

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

function addEventListeners () {
  kandy.on('auth:change', function (data) {
    console.log('auth:change Event Data: ' + JSON.stringify(data))
    if (kandy.getConnection().isConnected === true) {
      //  store.dispatch ('refresh');
      kandy.contacts.refresh()
      // this.refreshContacts ();
      // retrieveCallLogs ();
      // Kandyjs.getCallLogs ();
      // Kandyjs.fetchConversations ();
      // Kandyjs.searchDirectory ();
    }
  })

  kandy.on('contacts:change', params => {
    store.commit('REFRESH_DIRECTORY', params.contacts)
    // store.dispatch ('refresh', params.contacts);
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
