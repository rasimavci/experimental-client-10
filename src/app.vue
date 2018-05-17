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
  f7-panel(left='', reveal='', theme-blue='')
    f7-view(url='/panel-left/')
  // Right Panel
  f7-panel(right='', cover='', theme-blue='', v-if="getPage === 'contact' || getPage === 'history' || getPage === 'messages' || getPage === 'favorites'")
    f7-view(url='/panel-right/')
  // Main View
  f7-view#main-view(url='/login/', main='')
  // Popup
  f7-popup#popup
    f7-view
      f7-page
        f7-navbar(title='Popup')
          f7-nav-right
          f7-link(popup-close='') Close
        f7-block
          | Lorem ipsum dolor sit amet.
  f7-popup#popupAbout
    f7-view
      f7-page
        f7-navbar(title='About')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block(strong='')
        p Smart Office
        p
          | You can go
          f7-link(back='') back
          | .
        p
          | Version Number 4.0.0
        p
          | Platform: Web/Mobile.
  .popup.popup-about
    .block
      p About
        // Close Popup
      p
        a.link.popup-close(href='#') Close popup
      p Lorem ipsum dolor sit amet...
  login
</template>

<script>
import Login from './pages/login';
export default {
  name: 'mainApp',
  components: {
    login: Login,
  },
  computed: {
    getPage() {
      return this.$store.state.currentPage;
    },
  },
};
</script>
<style>
.statusbar {
  background: pink;
}
</style>
