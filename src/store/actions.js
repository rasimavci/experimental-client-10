import * as types from './mutation-types'
import createKandy from '../../kandy.link.js'
import store from './index'
import state from './state'
import IMService from '../IMService'
import FavoritesService from '../FavoritesService'

import _ from 'lodash'
var kandy
var logout = false

export const setCredentials = ({ commit }, credentials) => {
  if (credentials) {
    commit(types.SET_CREDENTIALS, credentials)
  }
}

export const connect = ({ commit }, credentials) => {
  logout = true
  addEventListeners()
  console.log(
    'credentials ' + credentials.username + ' ' + credentials.password
  )
  kandy.connect(credentials)
}

export const disconnect = ({ commit }) => {
  logout = false
  kandy.disconnect()
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

export const call = ({ commit, state }, params) => {
  console.log('start call to:' + params.callee)
  kandy.call.make(params.callee, state.callOptions)
  // store.commit("SET_CALLEE", callee);
}

export const callVideo = ({ commit }, callee) => {
  console.log('call to:' + callee)
  options.isVideoEnabled = true
  options.sendInitialVideo = true

  kandy.call.make(callee, options)
  // store.commit("SET_CALLEE", callee);
}

export const answer = ({ commit, state }) => {
  kandy.call.answer(state.incomingCall.callId, state.callOptions)
}

export const reject = ({ commit }) => {}

export const ignore = ({ commit }) => {}

export const end = ({ commit, state }) => {
  if (state.activeCall) {
    kandy.call.end(state.activeCall.id)
  }
}

export const hold = ({ commit, state }) => {
  kandy.call.hold(state.activeCall.id)
}

export const unhold = ({ commit, state }) => {
  kandy.call.unhold(state.activeCall.id)
}

export const mute = ({ commit }) => {
  kandy.call.mute(state.activeCall.id)
}

export const unmute = ({ commit }) => {
  kandy.call.unmute(state.activeCall.id)
}

export const updateContact = ({ commit }, id, editContact) => {
  kandy.contacts.update(btoa(id), editContact)
}
export const addContact = ({ commit }, newContact) => {
  kandy.contacts.add(newContact)
}
export const removeContact = ({ commit }, id) => {
  kandy.contacts.remove(String(id))
}

export const search = ({ commit }, query) => {
  kandy.contacts.search(query, 'FIRSTNAME')
}
function sendMessage (participant, messagetoSend) {
  const currentConvo = kandy.conversation.get(participant)
  let convoExist = false
  const message = currentConvo.createMessage(messagetoSend)
  message.send()
  Object.keys(currentConvo).forEach(function (key) {
    //console.log(key, currentConvo[key])
  })
}

export const startVideo = ({commit}) => {
  kandy.call.startVideo(state.activeCall.id);
}

export const stopVideo = ({commit} )=> {
  kandy.call.stopVideo(state.activeCall.id);
}

export const startScreenshare = ({commit}) => {
  var callId = firstCallId; //getSelectedCall();
  getMediaStreamId()
      .then(function (mediaSourceId) {
          kandy.startScreenshare(callId, {
              mediaSourceId: mediaSourceId
          });
      })
      .catch();
}

export const stopScreenshare =({commit}) => {
  kandy.stopScreenshare(state.activeCall.id);
}

export const directTransfer = ({commit, state}) => {
  kandy.call.directTransfer(state.activeCall.id, state.target);
}

/**
* Do consultative transfer as a two-step process, just like
*      the join operation.
*/

export const consultativeTransfer = ({commit}, firstCallId, destination) => {
  /*
  if (step === 'select') {
      transferCallOne = firstCallId; //getSelectedCall();
  } else if (step === 'transfer') {
      */
  var destination = firstCallId; //getSelectedCall();
  console.log('Consul. transfering call (' + transferCallOne + ') to call (' + destination + '.');
  kandy.consultativeTransfer(transferCallOne, destination);
  //  transferCallOne = undefined;
  // }
}

/*
  Join Call functionality. Intended UI usage:
      1. Select first call using 'Active Calls' select list.
      2. Click 'Select First Call' (step === 'select').
      3. Select second call using 'Active Calls' select list.
      4. Click 'Join Second Call' (step === 'join').
*/

export const joinCall = ({commit}, step) => {
  if (step === 'select') {
      callOne = firstCallId; //getSelectedCall();
  } else if (step === 'join') {
      var callTwo = firstCallId; //getSelectedCall();
      console.log('Joining callOne (' + callOne + ') to callTwo (' + callTwo + ').');
      kandy.joinCall(callOne, callTwo);
      callOne = undefined;
  }
}

export const sendDtmf = ({commit}, tone) => {
  if (tone !== '#') {
      tone = parseInt(tone);
      if (tone < 0 || tone > 9 || isNaN(tone)) {
          console.error('Invalid DTMF tone.');
          return;
      }
  }
  kandy.sendDTMF(state.activeCall.id, tone);
};

  // Devices.
  export const getDevices = () => {
      let devices =  kandy.media.getDevices();
  }

  export const selectDevice= () => {
      var device = getSelectedDevice();
      var defaultDevice = {};
      defaultDevice[device.type] = device.id;
      kandy.setDefaultDevices(defaultDevice);
  }

  export const changeSpeaker= () => {
      // No guarentee that the selected device is a speaker.
      var device = getSelectedDevice();
      kandy.changeSpeaker(device.id);
  }

  export const changeInputDevices= () => {
      kandy.changeInputDevices(state.activeCall.id);
  }

  export const saveFavorites= ({commit}, favItems) => {
    FavoritesService.setSpeedDialContacts(favItems)
  }

  export const getFavorites= ({commit}) => {
    let favItems = FavoritesService.getSpeedDialContacts()
    store.commit('SET_FAVORITES', favItems)
  }

  function getFavoritesFromStorage () {
    let favItems = FavoritesService.getSpeedDialContacts()
    store.commit('SET_FAVORITES', favItems)
  }

// Functions

// Service functions
function getMessages () {
  let messages = IMService.getMessages()
  // store.dispatch('setConversations', _.cloneDeep(messages))
  store.commit('SET_CONVERSATIONS', _.cloneDeep(messages))
}

function getMediaStreamId() {
  return new Promise(function (resolve, reject) {
      var extId = document.getElementById('extension-id').value;
      // Send our extension a message, asking for the media source id.
      window.chrome.runtime.sendMessage(extId, {
          message: 'chooseDesktopMedia'
      },
          function (response) {
              if (response && response.mediaSourceId) {
                  resolve(response.mediaSourceId);
              } else {
                  console.error('Could not get mediaSourceId.');
                  reject();
              }
          });
  });
}

function addEventListeners () {
  kandy.on('auth:change', function (data) {
    console.log('auth:change Event Data: ' + JSON.stringify(data))
    // store.state.logout did not worked here
    if (logout && kandy.getConnection().isConnected === true) {
      store.commit('CLEAR_ACTIVECONVERSATIONS')
      store.commit('SET_ISCONNECTED', true)
      getDevices()
      getMessages()
      fetchCallHistory()
      getFavoritesFromStorage()
      kandy.contacts.refresh()
      kandy.call.history.fetch()
    }
  })

  kandy.on('call:stateChange', call => {
    const calls = kandy.call.getAll()
    store.commit('UPDATE_CALLS', calls)

    const activeCall = calls.filter(function (call) {
      return call.state !== 'ENDED'
    })
    store.commit('UPDATE_SESSIONS', activeCall)
  })

  kandy.on('call:start', function (params) {
    store.commit('SET_ACTIVE_CALL', params)
  })

  kandy.on('call:receive', params => {
    let incomingCallData = {
      callId: params.callId,
      active: true
    }
    store.commit('SET_INCOMING_CALL', incomingCallData)
    //store.commit('TOGGLE_INCOMING_CALL_MODAL')
  })

  kandy.on('contacts:change', params => {
    store.commit('REFRESH_CONTACTS', params.contacts)
  })

  kandy.on('directory:change', params => {
    store.commit('REFRESH_DIRECTORY', params.results)
  })

  kandy.on('conversations:change', res => {
    store.commit('ADD_ACTIVECONVERSATIONS', res.conversationId)
    let conv = kandy.conversation.get(res.conversationId)
    let messages = {
      conversationId: res.conversationId,
      messages: conv.getMessages()
    }
    IMService.saveMessage(messages)
    getMessages()
  })

  kandy.on('messages:change', res => {
    store.commit('ADD_ACTIVECONVERSATIONS', res.conversationId)
    let conv = kandy.conversation.get(res.conversationId)
    let messages = {
      conversationId: res.conversationId,
      messages: conv.getMessages()
    }
    IMService.saveMessage(messages)
    getMessages()
  })

  kandy.on('user:fetch', res => {
    console.log('user fetch ' + JSON.stringify(res))
    let dene = kandy.user.get()
    store.commit('SET_SELF', res)
  })

  kandy.on('user:get', res => {
    console.log('user fetch ' + JSON.stringify(res))
    let dene = kandy.user.get(res)
    store.commit('SET_SELF', res)
  })

  //   kandy.on('callHistory:change', res => {
  //     let history = kandy.call.history.get()
  //     console.log('history ' + history)
  //   })

  kandy.on('callHistory:change', params => {
    let logs = kandy.call.history.get()
    store.commit('REFRESH_CALLLOGS', logs)
  })

  kandy.on('presence:change', res => {
    // console.log(res)
    // store.dispatch('setContactPresence', res)
  })
}

function fetchCallHistory (amount = 50, offset = 0) {
  kandy.call.history.fetch(amount, offset)
}

function start () {
  console.log('>>>>>STARTING KANDY<<<<<<')
  loadClientConfig().then(res => {
    // This line is used to create a new instans of Kandy
    kandy = createKandy(res)
  }).catch(err => {
    console.log(err)
  })
}

function loadClientConfig () {
  return new Promise((resolve, reject) => {
    var xobj = new XMLHttpRequest()
    xobj.overrideMimeType('application/json')
    xobj.open('GET', 'static/js/config.json', true)
    xobj.onreadystatechange = function () {
      if (xobj.readyState === 4) {
        if (xobj.status === 200) {
          resolve(JSON.parse(xobj.responseText))
        } else {
          reject(xobj.statusText)
        }
      }
    }
    xobj.send(null)
  })
}

start()
//createKandy()

export const setPresence = ({ commit }, args) => {
  var params = {
    status: '',
    activity: '',
    note: '' // args.note
  }

  switch (args) {
    case '0':
      params.status = 'open'
      params.activity = 'unknown'
      break
    case '1':
      params.status = 'closed'
      params.activity = 'unknown'
      break
    case '2':
      params.status = 'open'
      params.activity = 'away'
      break
    case '3':
      params.status = 'open'
      params.activity = 'lunch'
      break
    case '4':
      params.status = 'closed'
      params.activity = 'busy'
      break
    case '5':
      params.status = 'closed'
      params.activity = 'vacation'
      break
    case '6':
      params.status = 'open'
      params.activity = 'other'
      params.note = 'be right Back'
      break

    default:
      break
  }
  console.log(
    'Peer: setPresence state.. : ' + params.status + '' + params.activity
  )
  kandy.presence.update(params.status, params.activity, params.note)
}

export const getPresence = ({ commit }, args) => {
  const deneme = kandy.presence.get('ravci@genband.com')
  console.log('presence' + deneme)
}

