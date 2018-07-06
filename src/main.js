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

import vuexI18n from 'vuex-i18n'

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)
Vue.use(vuexI18n.plugin, store)

const en = require('json-loader!yaml-loader!./locales/en.yml')
const es = require('json-loader!yaml-loader!./locales/es.yml')
const fr = require('json-loader!yaml-loader!./locales/fr.yml')
const pt = require('json-loader!yaml-loader!./locales/pt.yml')

const finalLocales = {
  'en': en,
  'es': es,
  'fr': fr,
  'pt': pt
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}

// todo read initial locale from localStorage
Vue.i18n.set('en')

//Vanilla JavaScript
document.addEventListener('deviceready', function() {

  var permissions = cordova.plugins.permissions;
  permissions.requestPermission(permissions.CAMERA, success, error);

  function error() {
    console.warn('Camera permission is not turned on');
  }

  function success( status ) {
    if( !status.hasPermission ) error();
  }
  //console.log('cordova.plugins.CordovaCall is now available');
  //var cordovaCall = cordova.plugins.CordovaCall; //not necessary, but might be more convenient
});

//Vue.use(Notifications)
Vue.prototype.$moment = moment
Vue.prototype.$_ = _
// Init App
window.vm = new Vue({
  el: '#app',
  template: '<app/>',
  store,
  // Init Framework7 by passing parameters here
  framework7: {
    id: 'com.base.app', // App bundle ID
    name: 'BaseApp', // App name
    theme: 'md', // Automatic theme detection
    // App routes
    routes: Routes
  },
  // Register App Component
  components: {
    app: App
  }
})
