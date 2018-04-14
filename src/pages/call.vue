<template lang='pug'>
.page
  .navbar
    .navbar-inner
      .nav-left
        i.icon.material-icons.md-only.panel-open dehaze
      .title Call
      .right
        i.icon.material-icons.md-only dehaze
  // Additional "tabbar-labels" class
  .toolbar.tabbar-labels
    .toolbar-inner
      a.tab-link.b.tab-link-active(href='#tab-1')
        // Different icons for iOS and MD themes
        // Label text
        span.tabbar-label CHAT
      a.tab-link.b(href='#tab-2')
        span.tabbar-label VOICE
      a.tab-link.b(href='#tab-3')
        span.tabbar-label VIDEO
      a.tab-link.b(href='#tab-4')
        span.tabbar-label PEOPLE
  .tabs
    #tab-1.page-content.tab.tab-active
      .page-content.messages-content.a
        .messages.a
          div(v-for='message in getMessages', :key='message.key')
            | {{message.parts[0].text}}
      .toolbar.toolbar-bottom-md.messagebar
        .toolbar-inner
          a.link.toggle-sheet(href='#')
            i.icon.f7-icons.ios-only more_vert_fill
            i.icon.material-icons.md-only more_vert
          .messagebar-area
            textarea(v-model='message', placeholder='Message')
          a.link(href='#', @click='sendMessage()')
            i.icon.f7-icons.ios-only more_vert_fill
            i.icon.material-icons.md-only near_me
        .messagebar-sheet
    #tab-2.page-content.tab
      .call-button-container1
        .call-button-container(@click='openLeftPanel()')
          img.img1(src='../assets/demo/call_outline_white.png')
          | Call
    #tab-3.page-content.tab
      .call-button-container1
        .call-button-container(@click='openLeftPanel()')
          img(src='../assets/demo/camera_outline_white.png')
          | Call
    #tab-4.page-content.tab  4 

</template>


<script>
import { mapState, mapGetters } from 'vuex';
export default {
  data: function() {
    return {
      showData: 'all',
      message: '',
      showData: 'all',
      message: '',
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
        messages = [{
          parts: [
            {
              text: 'You have no messages.'
            }]
        }
        ]
      }
return messages
    }
  }
}
</script>
<style>
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
</style>