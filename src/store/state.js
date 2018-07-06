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
  favorites: [],
  favoritesLayout: 'tiles',
  sounds: {
    ringing: new Audio('./static/sounds/ringing.mp3')
  },
  currentPage: '',
  contactSource: 'personal',
  historyType: {
    incoming: true,
    outgoing: true,
    missed: true,
    message: true,
    conference: true
  },
  sortBy: 'firstName',
  sortFavorites: 'firstName',
  serviceShortcuts: {
    serviceMeetme: true,
    serviceCallGrap: true,
    serviceVoicemail: true,
  },
  logType: 'all',
  activeCallTab: 'chat',
  directory: [{firstName: '', lastName: ''}],
  self: {},
  callee: '',
  participant: '',
  target: '',
  startCall: false,
  startTransfer: false,
  contactData: null,
  incomingCall: {},
    callOptions: {
    isAudioEnabled: true,
    isVideoEnabled: true,
    sendInitialVideo: false,
    sendScreenShare: false,
    videoResolution: { height: 200, width: 200 },
    localVideoContainer: null,
    remoteVideoContainer: null
  },
}
