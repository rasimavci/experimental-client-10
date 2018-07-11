const credentials = state => state.credentials
const contacts = state => state.contacts
const mystate = state => state
const conversations = state => state.conversations
const activeConversations = state => state.activeConversations
const activeCall = state => state.activeCall
const incomingCall = state => state.incomingCall.active
const startCall = state => state.startCall
const startTransfer = state => state.startTransfer
const currentPage = state => state.currentPage
const participant = state => state.participant
const contactSource = state => state.contactSource
const historyType = state => state.historyType
const favorites = state => state.favorites
const favoritesLayout = state => state.favoritesLayout
const serviceShortcuts = state => state.serviceShortcuts
const contactData = state => state.contactData
const activeCallTab = state => state.activeCallTab
const callee = state => state.callee
//const callAnswer = state => state.callAnswer
export { serviceShortcuts,
  favorites,
  favoritesLayout,
  credentials,
  contacts,
  mystate,
  conversations,
  activeConversations,
  activeCall,
  incomingCall,
  startCall,
  startTransfer,
  currentPage,
  contactSource,
  contactData,
  callee,
  activeCallTab,
  historyType }
  