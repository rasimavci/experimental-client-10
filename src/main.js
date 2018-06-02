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
const vuxLocales = require('json-loader!yaml-loader!./locales/all.yml')
const componentsLocales = require('json-loader!yaml-loader!./locales/components.yml')

const en = require('json-loader!yaml-loader!./locales/en.yml')
const es = require('json-loader!yaml-loader!./locales/es.yml')
const fr = require('json-loader!yaml-loader!./locales/fr.yml')
const pt = require('json-loader!yaml-loader!./locales/pt.yml')
// const finalLocales = {
//   'en': objectAssign(vuxLocales['en'], componentsLocales['en']),
//   'es': objectAssign(vuxLocales['es'], componentsLocales['es']),
//   'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
// }

// for (let i in finalLocales) {
//   Vue.i18n.add(i, finalLocales[i])
// }

// )
//Vue.i18n.add(vuxLocales['en'], componentsLocales['en'])

//Vue.use(LocalePlugin)
//const nowLocale = Vue.locale.get()

const translationsEn = {
  "content": "This is some {type} content",
  "login": "Login please"
};

// translations can be kept in separate files for each language
// i.e. resources/i18n/de.json.
const translationsDe = {
	"My nice title": "Ein schöner Titel",
	"content": "Dies ist ein toller Inhalt"
};

// add translations directly to the application
Vue.i18n.add('en', en);
Vue.i18n.add('es', es);
Vue.i18n.add('fr', fr);
Vue.i18n.add('pt', pt);
Vue.i18n.set('en')

// if (/zh/.test(nowLocale)) {
//   Vue.i18n.set('zh-CN')
// } else if (/es/.test(nowLocale)) {
//   Vue.i18n.set('es')
// } else {
//   Vue.i18n.set('en')
// }

//Vue.use(Notifications)
Vue.prototype.$moment = moment
Vue.prototype.$_ = _
// Init App
var vm = new Vue({
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
