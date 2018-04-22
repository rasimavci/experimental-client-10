export default {
  credentials: {
    user: null,
    admin: null,
    loged: false,
    token: null
  },
  contacts: [],
  activeCall: {},
  conversations: [],
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
  activeCallTab: 'chat',
  directory: [{firstName: '', lastName: ''}]
}
