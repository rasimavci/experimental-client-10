import Login from './pages/login.vue'
import DynamicRoutePage from './pages/dynamic-route.vue'
import NotFoundPage from './pages/not-found.vue'

import PanelLeftPage from './pages/panel-left.vue'
import PanelRightPage from './pages/panel-right.vue'

import History1 from './pages/history.vue'
import Dialpad from './pages/dialpad.vue'
import Message from './pages/message.vue'
import Sessions from './pages/sessions'
import Favorites from './pages/favorites/favorites.vue'
import Conference from './pages/conference'
import Presences from './pages/presences'
import Call from './pages/call'
import Settings from './pages/settings.vue'
import Contact from './pages/contact.vue'
import ContactEdit from './pages/contact-edit.vue'

export default [
  {
    path: '/',
    component: Favorites,
    on: {
      pageBeforeIn: (event, page) => {
        alert('Check router.js file. path:"/" to manage router guard on HOME')
        // Validate with store TOKEN, uncomment when implemented!
        // if (!store.state.credentials.token) this.navigate('/login/')
      }
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage
  },
  {
    path: '/panel-right/',
    component: PanelRightPage
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/contact-edit',
    name: 'Contact-Edit',
    component: ContactEdit
  },
  {
    path: '/history',
    name: 'History',
    component: History1
  },
  {
    path: '/dialpad',
    name: 'Dialpad',
    component: Dialpad
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/sessions/',
    name: 'Sessions',
    component: Sessions
  },
  {
    path: '/conference',
    name: 'Conference',
    component: Conference
  },
  {
    path: '/presences',
    name: 'Presences',
    component: Presences
  },
  {
    path: '/call',
    name: 'Call',
    component: Call
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage
  },
  {
    path: '(.*)',
    component: NotFoundPage
  }
]
