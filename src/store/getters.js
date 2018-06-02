const credentials = state => state.credentials
const contacts = state => state.contacts
const mystate = state => state
const conversations = state => state.conversations
const activeConversations = state => state.activeConversations
const activeCall = state => state.activeCall
const incomingCall = state => state.incomingCall.active
const startCall = state => state.startCall
const currentPage = state => state.currentPage
//const callAnswer = state => state.callAnswer
export { credentials, contacts, mystate, conversations, activeConversations, activeCall, incomingCall, startCall, currentPage }
