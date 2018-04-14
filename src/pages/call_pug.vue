<template lang='pug'>
f7-page
  navbar
    navbar-inner
     .center.tab-button2
      .buttons-row
       a.tab-link.active.button.tab-button(href="#tab1") CHAT
       a.tab-link.button.tab-button(href="#tab2") VOICE
       a.tab-link.button.tab-button(href="#tab3") VIDEO
       a.tab-link.button.tab-button(href="#tab4") PEOPLE
    .pages
      .page
        .page-content
          // Tabs animated wrapper, required to switch tabs with transition
          .tabs-animated-wrap
            // Tabs, tabs wrapper
            .tabs
              // Tab 1, active by default
              #tab1.tab.active
                .empty-space
                  p Here is the Message page!
                f7-messagebar(placeholder="Message" send-link="Send" @submit="onSubmit")
              // Tab 2
              #tab2.tab
                .call-button-container1
                  .center
                    .call-button-container
                      .center
                        img(slot="icon" src="../assets/demo/call_outline_white.png")
                        | Call
              // Tab 3
              #tab3.tab
                .call-button-container1
                  .center
                    .call-button-container
                      .center
                        img(slot="icon" src="../assets/demo/camera_outline_white.png")
                        | Video
              // Tab 4
              #tab4.tab
                .call-button-container1
                  .center
                    .call-button-container
                      .center
                        img(slot="icon" src="../assets/demo/camera_outline_white.png")
                        | People
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import LeftChatBubble from './LeftChatBubble'
import RightChatBubble from './RightChatBubble'
import NoImg from '../assets/demo/noimage.jpg'

export default {
  data: function() {
    return {
      showData: 'all',
      message: '',
      conversations: [],
      contacts: [],
      test: 5,
      activeDialog: false,
      message: '',
      renderMessages: true,
      selectedContacts: [],
      noImg: NoImg,
      search: {
        criteria: ''
      },
      conversationId: 'saynaci@genband.com', // this.$route.params.id,
      contactSelected: false      
    }
  },

  methods: {
    openLeftPanel: function() {
      this.$f7.popup.open(popupLanguage, true)
    },
    sendMessage() {
      let messageToSend = {
        type: 'IM',
        text: this.message,
        participant: 'saynaci@genband.com'
      }
      console.log('send message ' + this.message)
      this.message = ''
      this.$store.dispatch('send', messageToSend)
    },
    makeCall (mode) {
      //     //  this.SET_CALL_OPTIONS(options)
      //     //    let incomingCallData = {
      //     //      callId: this.incomingCall.callId,
      //     //      active: false
      //     //    }
      //   this.$store.commit('SET_USER_WITHID', 'saynaci@genband.com')
      // console.log('activeCall State ' + this.activeCallState)
      console.log('activeCall State ' + this.activeCall.state)
      console.log('make call to ' + this.callee)
      if (!this.activeCallState || this.activeCallState === 'ENDED' || this.activeCallState === '') {
        const params = {
          callee: this.callee, // 'saynaci@genband.com',
          mode: mode
        }
        let options = [{ key: 'localVideoContainer', value: document.getElementById('localVideoContainer') },
        { key: 'remoteVideoContainer', value: document.getElementById('remoteVideoContainer') }
        ]
        params.options = options
        //    let incomingCallData = {
        //      callId: this.incomingCall.callId,
        //      active: false
        //    }
        // this.setIncomingCall(incomingCallData)
        this.$store.dispatch('call', params)
        //  this.$store.dispatch.answer(this.incomingCall.callId)
        // } else {
        //   this.$store.dispatch('end')
      } else {
        // debugger
        // this.toggleActiveCall()
        // debugger
        this.$store.dispatch('end')
      }
      console.log('make call operation finished.')
    },    
  },
  computed: {
    getMessages() {
      let convs = this.$store.state.conversations
      console.log('conv obj ' + JSON.stringify(convs))
      let messages = []
      if (convs && convs[0]) {
        convs.forEach((conv, index) => {
          if(conv.conversationId === 'saynaci@genband.com') {
            messages = this.$store.state.conversations[index].messages
          } 
        })
      } else {
        return [{
          parts: [
            {
              text: 'wassup'
            }]
        }
        ]
      }
return messages
    },
    filtredContacts () {
      this.contacts = this.$store.state.contacts
      let resultArray = []
      if (this.search.criteria !== '') {
        for (let i = 0; i < this.contacts.length; i++) {
          let find = false
          if (this.contacts[i].firstName.toLowerCase().indexOf(this.search.criteria.toLowerCase()) > -1) find = true
          else if (this.contacts[i].lastName.toLowerCase().indexOf(this.search.criteria.toLowerCase()) > -1) find = true
          else if (this.contacts[i].nickname.toLowerCase().indexOf(this.search.criteria.toLowerCase()) > -1) find = true
          else if (this.contacts[i].primaryContact.toLowerCase().indexOf(this.search.criteria.toLowerCase()) > -1) find = true
          if (find) resultArray.push(this.contacts[i])
        }
        return resultArray
      } else {
        return this.contacts
      }
    },    
    filtredMessages () {
      this.conversations = this.$store.state.conversations
      let resultArray = []
      for (let i = 0; i < this.conversations.length; i++) {
        if (this.conversations[i].conversationId === this.conversationId) {
          resultArray = this.conversations[i].messages
        }
      }
      // process.nextTick(() => {
      //   $('.messages-container').scrollTop($('.messages-container').height())
      // })
      console.log('resultArray ' + resultArray)
      return resultArray
    },    
  }
}
</script>
<style scoped>
.tab-button {
  width: 90px;
}

.tab-button2 {
  width: 450px;
}

.call-button-container1 {
  padding-top: 160px;
}

.call-button-container {
  margin: auto;
  width: 233px;
  height: 80px;
  vertical-align: middle;
  padding: 10px;
  background: #29A3D8;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  font-family: lato-bold;
  font-size: 17px;
  color: white;
}

.img1 {
  height: 50%;
  width: 50
}

.a {
  max-height: 700px
}

.b {
  max-height: 40px
}
.messages-container{
  height: calc(100vh - 50px);
  overflow-y: scroll;
}
.messages-container ul{
  width: 400px;
}
.bottombar{
  height: 50px;
  width: 100vw;
  margin-left: 80px;
  background-color: #465A69;
}
.md-dialog ul{
  list-style-type: none;
  overflow-y: scroll;
  padding: 10px;
}
.md-dialog ul li{
  padding-bottom: 5px;
}
.selected-contact{
  background: lightsteelblue;
}

.right-chatBuble {
    background: #29A3D8;
}
</style>
