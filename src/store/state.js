export default {
  credentials: {
    user: null,
    admin: null,
    loged: false,
    token: null
  },
  isConnected: false,
  contacts: [],
  activeCall: {},
  conversations: [{conversationId: 'no conversations', messages:[]}],
  activeConversations: [],
  messages: [],
  history: [],
  calls: [],
  sessions: [],
  sounds: {
    ringing: new Audio('./static/sounds/ringing.mp3')
  },
  currentPage: '',
  contactSource: 'personal',
  sortBy: 'firstName',
  logType: 'all',
  activeCallTab: 'chat',
  directory: [{firstName: '', lastName: ''}],
  self: {},
  callee: '',
  participant: '',
  startCall: false,
  incomingCall: {},
  logout:false,
}
