import Login from './pages/login.vue'
import HomePage from './pages/home.vue'
import AboutPage from './pages/about.vue'
import FormPage from './pages/form.vue'
import DynamicRoutePage from './pages/dynamic-route.vue'
import NotFoundPage from './pages/not-found.vue'

import PanelLeftPage from './pages/panel-left.vue'
import PanelRightPage from './pages/panel-right.vue'

import History1 from './pages/history.vue'
import Dialpad from './pages/dialpad.vue'
import Message from './pages/message.vue'
import Sessions from './pages/sessions'
import Favorites from './pages/favorites'
import Collaboration from './pages/collaboration'
import Presences from './pages/presences'
import Call from './pages/call'
import Settings from './pages/settings.vue'
import Contact from './pages/contact.vue'
import newMessage from './pages/newMessage.vue'

export default [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/newMessage',
    component: newMessage
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
    path: '/about/',
    component: AboutPage
  },
  {
    path: '/form/',
    component: FormPage
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
    path: '/collaboration',
    name: 'Collaboration',
    component: Collaboration
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
