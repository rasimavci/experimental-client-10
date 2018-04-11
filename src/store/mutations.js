import * as types from './mutation-types'

const mutations = {
  [types.SET_CREDENTIALS] (state, credentials) {
    debugger
    state.credentials = credentials
  }
}

export {
  mutations
}
