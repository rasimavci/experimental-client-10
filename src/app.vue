<template lang='pug'>
// App
#app
  incomingCallModal(v-if='getIncomingCall')
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
  f7-panel(right='', cover='', theme-blue='', v-if="currentPage === 'contact' || currentPage === 'history' || currentPage === 'messages' || currentPage === 'favorites'")
    f7-view(url='/panel-right/')
  // Main View
  f7-view#main-view(url='/login/', main='')
  popup-contact-detail
  // notifications(group="foo")
  //-vm.$refs.foo.doSomething();
</template>

<script>
import IncomingCallModal from './pages/ModalIncomingCall'
import { mapGetters } from 'vuex'
import PopupContactDetail from './pages/popups/contact-detail'

// setInterval(
//   function(){

//     getIncomingCall ()
//   }, 3000);

export default {
  name: 'mainApp',
  components: {
    incomingCallModal: IncomingCallModal,
    popupContactDetail: PopupContactDetail
  },
  computed: {
    ...mapGetters(['incomingCall', 'currentPage']),
    getIncomingCall () {
      var that = this
      if (this.$f7) {
        debugger
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
            that.$store.commit('SET_ACTIVECALLTAB', 'audio');
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
      return true;
      }
    }
  }
}
</script>
<style>
.statusbar {
  background: pink;
}
</style>
