<template>
  <div class="page">
    <div class="navbar">
      <div class="navbar-inner">
        <div class="nav-left">
          <i class="icon material-icons md-only" @click='openLeftPanel()'>dehaze</i>
          </f7-link>

        </div>
        <div class="title">Call</div>
        <div class="right">
          <i class="icon material-icons md-only">dehaze</i>
        </div>
      </div>
    </div>
    <!-- Additional "tabbar-labels" class -->
    <div class="toolbar tabbar-labels">
      <div class="toolbar-inner">
        <a href="#tab-1" class="tab-link b tab-link-active">
          <!-- Different icons for iOS and MD themes -->
          <!-- Label text -->
          <span class="tabbar-label">CHAT</span>
        </a>
        <a href="#tab-2" class="tab-link b">
          <span class="tabbar-label">VOICE</span>
        </a>
        <a href="#tab-3" class="tab-link b">
          <span class="tabbar-label">VIDEO</span>
        </a>
        <a href="#tab-4" class="tab-link b">
          <span class="tabbar-label">PEOPLE</span>
        </a>
      </div>
    </div>
    <div class="tabs">
      <div id="tab-1" class="page-content tab tab-active">
        <div class="page-content messages-content a">
          <div class="messages a">
            <div v-for="message in getMessages" :key="message.key">
              {{message.parts[0].text}}
            </div>
          </div>
        </div>
        <div class="toolbar toolbar-bottom-md messagebar">
          <div class="toolbar-inner">
            <a class="link toggle-sheet" href="#">
              <i class="icon f7-icons ios-only">more_vert_fill</i>
              <i class="icon material-icons md-only">more_vert</i>
            </a>
            <div class="messagebar-area">
              <textarea v-model='message' placeholder="Message"></textarea>
            </div>
            <a class="link" href="#" @click="sendMessage()">
              <i class="icon f7-icons ios-only">more_vert_fill</i>
              <i class="icon material-icons md-only">near_me</i>
            </a>
          </div>
          <div class="messagebar-sheet"></div>
        </div>
      </div>
      <div id="tab-2" class="page-content tab">
        <div class="call-button-container1">
          <div class="call-button-container" @click="openLeftPanel()">
            <img src="../assets/demo/call_outline_white.png" class="img1"></img>Call
          </div>
        </div>
      </div>
      <div id="tab-3" class="page-content tab">
        <div class="call-button-container1">
          <div class="call-button-container" @click="openLeftPanel()">
            <img src="../assets/demo/camera_outline_white.png"></img>Call
          </div>
        </div>
      </div>
      <div id="tab-4" class="page-content tab"> 4 </div>
    </div>

  </div>
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