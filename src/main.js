// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js'

// Import F7 Styles
import Framework7Styles from 'framework7/dist/css/framework7.css'

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css'
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import Moment
import moment from 'moment'

// Import Moment
import _ from 'lodash'

// Import App Component
import App from './app'

// Import Store
import store from './store'
//import Notifications from 'vue-notification'

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)
//Vue.use(Notifications)
Vue.prototype.$moment = moment
Vue.prototype.$_ = _
// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  store,
  // Init Framework7 by passing parameters here
  framework7: {
    id: 'com.base.app', // App bundle ID
    name: 'BaseApp', // App name
    theme: 'auto', // Automatic theme detection
    // App routes
    routes: Routes
  },
  // Register App Component
  components: {
    app: App
  }
})
