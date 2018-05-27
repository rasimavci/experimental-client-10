<template lang="pug">
  p(v-if="incomingCall")

  //-   .incoming-call-container
  //-     .answer-call(@click='anserCall')
  //-       i.fas.fa-spinner.fa-pulse
  //-     .decline-call(@click='rejectCall')
  //-       //- i.fas.fa-phone
  //-       i.fas.fa-spinner.fa-pulse
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'modalIncomingCall',
  data () {
    return {

    }
  },
  created: function() {
    let hey = this.incomingCall
  },
  // computed: {
  //   ...mapGetters(['incomingCall'])
  // },

  methods: {
    ...mapActions(['toggleIncomingCallModal']),
    closeModal () {
      if (event.target.id === 'modalIncomingCall') {
        this.toggleIncomingCallModal()
      }
    },
    answerCall () {
      //this.$kandyJS.answerCall()
      //this.toggleIncomingCallModal()
    },
    rejectCall () {
      //this.$kandyJS.rejectCall()
      //this.toggleIncomingCallModal()
    },
  },
  computed: {
    incomingCall () {
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
      that.$store.commit('SET_PARTICIPANT', 'Sevda Aynaci');
      that.$store.commit('SET_STARTCALL', 'answer');
      //this.$store.dispatch('answer');
      that.$store.commit('SET_ACTIVECALLTAB', 'audio');

      //that.$f7router.navigate('/history'); // if not route another page first, tabs are not working in call page
      that.$f7router.navigate('/call');
       let incomingCallData = {
      callId: '',
      active: true
    }
    this.$store.commit('UPDATE_INCOMINGCALL')
    }
  },
});

     let incoming = this.$store.state.incomingCall.active
      if (incoming) {
        notificationCallbackOnClose.open();
      }
      return true
  }

}
}
</script>
<style scoped>
.incoming-call-container{
  width: 300px;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #ecf0f1;
  -webkit-box-shadow: 0 12px 15px 0 rgba(0,0,0,.24), 0 17px 50px 0 rgba(0,0,0,.19);
  box-shadow: 0 12px 15px 0 rgba(0,0,0,.24), 0 17px 50px 0 rgba(0,0,0,.19);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.answer-call{
  color: green;
  height: 40px;
  width: 40px;
  float: left;
  font-size: 40px;
  margin: 5px;
}

.decline-call {
  color: red;
  height: 40px;
  width: 40px;
  float: right;
  font-size: 40px;
  margin: 5px;
}
</style>
