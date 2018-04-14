<template lang='pug'>
// App
#app
  //- .preloader
  //-   span.preloader-inner
  //-     span.preloader-inner-gap
  //-     span.preloader-inner-left
  //-       span.preloader-inner-half-circle
  //-     span.preloader-inner-right
  //-       span.preloader-inner-half-circle
  // Statusbar
  f7-statusbar
  // Left Panel
  f7-panel(left='', reveal='', theme-dark='')
    f7-view(url='/panel-left/')
  // Right Panel
  f7-panel(right='', cover='', theme-dark='')
    f7-view(url='/panel-right/')
  // Main View
  f7-view#main-view(url='/', main='')
  // Popup
  f7-popup#popup
    f7-view
      f7-page
        f7-navbar(title='Popup')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block
          | Lorem ipsum dolor sit amet.
  login
</template>

<script>
import Login from './pages/login'
export default {
  name: 'mainApp',
  components: {
    login: Login
  }
}
</script>
