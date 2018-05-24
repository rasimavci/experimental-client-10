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
  f7-panel(right=getIncomingCall, cover='', theme-blue='', v-if="getPage === 'contact' || getPage === 'history' || getPage === 'messages' || getPage === 'favorites'")
    f7-view(url='/panel-right/')
  // Main View
  f7-view#main-view(url='/login/', main='')
  // Popup
  f7-popup(v-if="getIncomingCall")#popup
    f7-view
      f7-page
        f7-navbar(title='Popup')
          f7-nav-right
          f7-link(popup-close='') Close
        f7-block
          | Lorem ipsum dolor sit amet.
  f7-popups
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
import IncomingCallModal from './pages/ModalIncomingCall'
import { mapGetters } from 'vuex'
export default {
  name: 'mainApp',
  components: {
    login: Login,
    incomingCallModal: IncomingCallModal
  },
  watch: {
    getIncomingCall: function() {
      var that = this
var notificationCallbackOnClose = this.$f7.notification.create({
  icon: '<i class="icon demo-icon">7</i>',
  title: 'Incoming Call',
  titleRightText: 'now',
  subtitle: 'Incoming Call',
  text: 'Answer',
  closeOnClick: true,
  on: {
    close: () => {
      that.$store.commit('SET_STARTCALL', 'answer');
      this.$store.commit('SET_ACTIVECALLTAB', 'audio');
      that.$f7router.navigate('/history'); // if not route another page first, tabs are not working in call page
      that.$f7router.navigate('/call');
       let incomingCallData = {
      callId: '',
      active: true
    }
    this.$store.commit('SET_INCOMING_CALL', incomingCallData)
    }
  },
});

     let incoming = this.$store.state.incomingCall.active
      if (incoming) {
        notificationCallbackOnClose.open();
      }
      //return true;
    },

  },
};
</script>
<style>
.statusbar {
  background: pink;
}
</style>
