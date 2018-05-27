<template lang='pug'>
.page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{getParticipant}}
    f7-nav-right.end-button-color(v-if="activeCall.state !== 'ENDED'")
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:call_end', panel-open='right',@click="end")
    f7-nav-right(v-if="activeCall.state === 'ENDED'")
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:phone_in_talk', panel-open='right', @click="makeCall(false)")
  // Additional "tabbar-labels" class
  .toolbar.tabbar-labels
    .toolbar-inner
      a.tab-link.b(href='#tab-1', :class="getActiveTabChat")
        // Different icons for iOS and MD themes
        // Label text
        span.tabbar-label CHAT
      a.tab-link.b(href='#tab-2', :class="getActiveTabAudio")
       span.tabbar-label VOICE
      a.tab-link.b(href='#tab-3', :class="getActiveTabVideo")
        span.tabbar-label VIDEO
      a.tab-link.b(href='#tab-4')
        span.tabbar-label PEOPLE
  .tabs
    #tab-1.page-content.tab.sheet-open(:class="tabActiveChat", data-sheet=".my-sheet2")
      .page-content.messages-content.a
        .chat-div(v-for='message in filtredMessages', :key='message.timestamp', v-if='renderMessages')
          left-chat-bubble.leftBBl.messageLine(:message='message', v-if='message.sender === conversationId', :contact='selectedContacts[0]')
          right-chat-bubble.rightBBl.messageLine(:message='message', v-else)
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
    #tab-2.page-content.tab(:class="tabActiveAudio")
      .page-content.messages-content.a
        //-f7-block(strong='')
        p.a2altta2.my-font1(v-if="activeCall.state === 'RINGING'") Calling {{getCalleeName}}
        p.a2altta2.my-font2(v-if="activeCall.state === 'RINGING'", @click="end") CANCEL
        p.a2altta2.my-font1(v-if="activeCall.state !== 'RINGING' && activeCall.state !== 'ENDED'") {{activeCall.state}}
        p.a2altta2.my-font1(v-if="callStarted && activeCall.state === 'ENDED'") Connecting...
        .keypad(v-if="checkActiveCall")
          .keypad-container
            div
              button(@click='press(1)')
                .keypad-button-number 1
                .keypad-button-text
              button(@click='press(2)')
                .keypad-button-number 2
                .keypad-button-text
                  | ABC
              button(@click='press(3)')
               .keypad-button-number 3
               .keypad-button-text
                  | DEF
            div
              button(@click='press(4)')
                .keypad-button-number 4
                .keypad-button-text
                  | GHI
              button(@click='press(5)')
                .keypad-button-number 5
                .keypad-button-text
                  | JKL
              button(@click='press(6)')
                .keypad-button-number 6
                .keypad-button-text
                  | MNO
            div
              button(@click='press(7)')
                .keypad-button-number 7
                .keypad-button-text
                  | PQRS
              button(@click='press(8)')
                .keypad-button-number 8
                .keypad-button-text
                  | TUV
              button(@click='press(9)')
                .keypad-button-number 9
                .keypad-button-text
                  | WXYZ
            div
              button(@click="press('*')")
                | *
              button(@click='press(0)')
                | 0
              button(@click="press('#')")
                | #
        .call-button-container.action.my-cursor(v-if="!callStarted && activeCall.state === 'ENDED'" @click='makeCall(false)')
          img.my-size(src='../assets/demo/call_outline_white.png')
          p.my-font1s Call {{getCalleeName}}
      .toolbar.toolbar-bottom-md.tabbar-labels
        .toolbar-inner
          a.tab-link.tab-link-active.b.sheet-open(href='#tab-5', data-sheet=".my-sheet2")
            i.icon.f7-icons.ios-only volume_up_fill
            i.icon.material-icons.md-only volume_up
          a.tab-link.b(href='#tab-6', @click='add()')
            i.icon.f7-icons.ios-only person_add_fill
            i.icon.material-icons.md-only person_add
          a.tab-link.b(href='#tab-7', @click='hold()')
            i.icon.f7-icons.ios-only phone_paused_fill
            i.icon.material-icons.md-only(v-if="activeCall.state !== 'ON_HOLD'") phone_paused
            i.icon.material-icons.md-only.my-color(v-if="activeCall.state === 'ON_HOLD'") phone_paused
          a.tab-link.b(href='#tab-8', @click='mute()')
            i.icon.f7-icons.ios-onlymic_off_fill
            i.icon.material-icons.md-only(v-if="!activeCall.muted") mic_off
            i.icon.material-icons.md-only.my-color(v-if="activeCall.muted") mic_off
    #tab-3.page-content.tab(:class="tabActiveVideo")
      .page-content.messages-content.a
        p.a2altta2.my-font1(v-if="activeCall.state === 'RINGING'") Calling {{getCalleeName}}
        p.a2altta2.my-font2(v-if="activeCall.state === 'RINGING'", @click="end") CANCEL
        p.a2altta2.my-font1(v-if="activeCall.state !== 'RINGING' && activeCall.state !== 'ENDED'") {{activeCall.state}}
        p.a2altta2.my-font1(v-if="callStarted && activeCall.state === 'ENDED'") Connecting...
        .call-button-container.action.my-cursor(v-if="getVideoCallOption", @click='makeCall(true)')
          img.my-size2(src='../assets/demo/camera_outline_white.png')
          p.my-font1s Video {{getCalleeName}}
      .toolbar.toolbar-bottom-md.tabbar-labels
        .toolbar-inner
          a.tab-link.tab-link-active.b.sheet-open(href='#tab-5', data-sheet=".my-sheet2")
            i.icon.f7-icons.ios-only volume_up_fill
            i.icon.material-icons.md-only volume_up
          a.tab-link.b(href='#tab-6', @click='add()')
            i.icon.f7-icons.ios-only person_add_fill
            i.icon.material-icons.md-only person_add
          a.tab-link.b(href='#tab-7', @click='hold()')
            i.icon.f7-icons.ios-only phone_paused_fill
            i.icon.material-icons.md-only phone_paused
          a.tab-link.b(href='#tab-8', @click='mute()')
            i.icon.f7-icons.ios-only mic_off_fill
            i.icon.material-icons.md-only mic_off
    #tab-4.page-content.tab
      //-f7-list(media-list='')
      //- f7-list-item(media="../assets/demo/avatar_generic.png", text="Some text", @click='openContactDetailsPopup(contact)' :title="callee" href="#popupAddContact") Corporate
      f7-list
        .item-content
          .item-media
            img.avatar-circle(:src="contact.photoUrl || noImg" width="44")
              //- img(:src='presenceConnected', v-if='contact.presence.status === "open"')
              //- img(:src='presenceClosed', v-if='contact.presence.status === "closed"')
          .item-inner
            .item-title-row
              .item-title {{callee}}
               .item-subtitle {{contactType}}
        //- f7-list-item(@click='makeCall(false)' :title="callee" href="#popupAddContact") Corporate
        //-  img.avatar-circle.test-icon-left(:src="noImg")

  .sheet-modal.my-sheet2
    .toolbar
      .toolbar-inner
        .left
        .right
          a.link.sheet-close.Linklarge(href="#") Cancel
    .sheet-modal-inner
      .block
        f7-list(form='')
         f7-list-item(:key='1', radio='', name='my-radio', :checked='1 === 1', :value='1', :title="'Spearkerphone'")
         f7-list-item(:key='2', radio='', name='my-radio', :checked='2 === 1', :value='2', :title="'Earpiece'")
         f7-list-item(:key='3', radio='', name='my-radio', :checked='3 === 1', :value='3', :title="'Blootooth Headset'")
</template>


<script>
import LeftChatBubble from './LeftChatBubble';
import RightChatBubble from './RightChatBubble';
import { mapState, mapGetters } from 'vuex';
import NoImg from '../assets/demo/noimage1.jpg';
export default {
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'call');
    // let contacts = this.$store.state.contacts;
    // this.contactType = 'corporate'
    // contacts.forEach(contact1 => {
    //   if (contact1.primaryContact === this.callee) {
    //     this.contact = contact1;
    //     this.contactType = 'personal'
    //   }
    // })
  },
  data: function() {
    return {
      callStarted: false,
      noImg: NoImg,
      renderMessages: false,
      showData: 'all',
      message: '',
      showData: 'all',
      message: '',
      callee: '',
      showbottombar: false,
      conversationId: '',
      selectedContacts: [],
      contact: {},
      contactType: '',
      activeTab: false,
      getActiveTab: true,
    };
  },
  components: {
    leftChatBubble: LeftChatBubble,
    rightChatBubble: RightChatBubble,
  },
  mounted() {
    let contacts = this.$store.state.contacts;
    const startCall = this.$store.state.startCall
    this.$store.commit('SET_STARTCALL', false);
    this.contactType = 'corporate';
    contacts.forEach(contact1 => {
      if (contact1.primaryContact === this.$store.state.callee) {
        this.contact = contact1;
        this.contactType = 'personal';
      }
    });
    this.getContactInfo();
    this.callee = this.$store.state.callee;
    this.conversationId = this.$store.state.callee;
    if (this.$store.state.activeCallTab === 'audio' & startCall) {
      console.log('call with audio to ' + this.$store.state.callee);
      this.makeInitialCall(false);
    } else if (this.$store.state.activeCallTab === 'video' && startCall) {
      console.log('call with video');
    } else if (this.$store.state.activeCallTab === 'audio' && startCall === 'answer') {
      this.answer()
      console.log('call with video');
    }
  },
  methods: {
    openLeftPanel: function() {
      this.$f7.popup.open(popupLanguage, true);
    },
    checkCallee: function() {
       return new Promise(function (resolve, reject) {
            this.callee = this.$store.state.callee
            if (this.callee) {
              resolve
            }
        });
    },
    end() {
      this.callStarted = false
      this.$store.dispatch('end');
    },
    getContactInfo() {
      let primaryContact = this.$store.state.callee; // this.conversationId;
      let contact = this.$_.find(this.contacts, c => {
        return c.primaryContact === primaryContact;
      });
      if (contact) {
        contact.photoUrl = contact.photoUrl || this.noImg;
      }

      this.selectedContacts.push(this.$_.cloneDeep(contact));
      this.$nextTick(() => {
        this.renderMessages = true;
      });
    },
    sendMessage() {
      let messageToSend = {
        type: 'IM',
        text: this.message,
        participant: this.callee,
      };
      console.log('send message ' + this.message);
      this.message = '';
      this.$store.dispatch('send', messageToSend);
    },
    hold() {
      this.$f7.preloader.show();
      if(this.activeCall.state === 'ON_HOLD') {
        this.$store.dispatch('unhold', '');
      } else {
        this.$store.dispatch('hold', '');
      }

    },
    mute() {
      console.log(JSON.stringify(this.activeCall))
      if(this.activeCall.muted === true) {
        this.$store.dispatch('unmute', '');
      } else {
        this.$store.dispatch('mute', '');
      }
    },
    add() {
      console.log('sorry, not implemented yet');
      this.$store.commit('SET_STARTCALL', false);
      this.$f7router.navigate('/history');
      this.$f7router.navigate('/contact');
    },
    volumeUp() {
      console.log('sorry, not implemented yet');
    },
    answer() {
      this.$f7.preloader.show();
      this.$store.dispatch('answer', false);
      console.log('call answer');
    },
    makeCall(mode) {
      // SET_ACTIVE_CALLID
      if (!this.activeCall || this.activeCall.state === 'ENDED') {
        this.callee = this.$store.state.callee;
        const params = {
          callee: this.callee,
          mode: mode,
        };
        let options = [
          {
            key: 'localVideoContainer',
            value: document.getElementById('localVideoContainer'),
          },
          {
            key: 'remoteVideoContainer',
            value: document.getElementById('remoteVideoContainer'),
          },
        ];
        params.options = options;
        this.$f7.preloader.show();
        this.callStarted = true
        this.$store.dispatch('call', params);
      }
      else if(mode && this.activeCall.state !== 'ENDED' && !this.activeCall.sendingVideo) {
          this.$store.dispatch('startVideo');
        } else {
          this.callStarted = false
          this.$store.dispatch('end');
        }
    },
    makeInitialCall(mode) {
      // SET_ACTIVE_CALLID
     // if there is no already session with the contact
     // if (!this.activeCall || this.activeCall.state === 'ENDED') {
        this.callStarted = true
        this.$f7.preloader.show();
        this.callee = this.$store.state.callee;
        const params = {
          callee: this.callee,
          mode: mode,
        };
        let options = [
          {
            key: 'localVideoContainer',
            value: document.getElementById('localVideoContainer'),
          },
          {
            key: 'remoteVideoContainer',
            value: document.getElementById('remoteVideoContainer'),
          },
        ];
        params.options = options;
        this.$store.dispatch('call', params);
      //}
    }
  },
  computed: {
    ...mapGetters(['contacts', 'conversations', 'activeCall']),
    filtredMessages() {
      let resultArray = [];
      if (this.conversations) {
        for (let i = 0; i < this.conversations.length; i++) {
          if (this.conversations[i].conversationId === this.conversationId) {
            resultArray = this.conversations[i].messages;
          }
        }
        this.$nextTick(() => {
          $('.messages-container').scrollTop($('.messages-container').height());
        });

        return resultArray;
      }
    },
    getCalleeName() {
      let activeState = this.$store.state.activeCall.state;
      if (activeState === 'RINGING' || activeState === 'IN_CALL'|| activeState === 'ON_HOLD') {
        this.$f7.preloader.hide();
      } else if (activeState === 'ENDED') {
        this.callStarted = false;
      }

      return '  ' + this.$store.state.activeCall.calleeName;
    },
    getParticipant() {
      return this.$store.state.participant;
    },
    checkActiveCall() {
      const ActiveCallState = this.$store.state.activeCall.state;
      if (ActiveCallState === 'IN_CALL') {
        return true;
      } else {
        return false;
      }
    },
    getActiveTabAudio() {
      const activeTab = this.$store.state.activeCallTab;
      if (activeTab === 'audio') {
        return 'tab-link-active'
      } else {
        return ''
      }
    },
    getActiveTabVideo() {
      const activeTab = this.$store.state.activeCallTab;
      if (activeTab === 'video') {
        return 'tab-link-active'
      } else {
        return ''
      }
    },
    getActiveTabChat() {
      const activeTab = this.$store.state.activeCallTab;
      if (activeTab === 'chat') {
        return 'tab-link-active'
      } else {
        return ''
      }
    },
    tabActiveChat() {
      const activeTab = this.$store.state.activeCallTab;
      if (activeTab === 'chat') {
        return 'tab-active'
      } else {
        return ''
      }
    },
    tabActiveAudio() {
      const activeTab = this.$store.state.activeCallTab;
      if (activeTab === 'audio') {
        return 'tab-active'
      } else {
        return ''
      }
    },
    tabActiveVideo() {
      const activeTab = this.$store.state.activeCallTab;
      if (activeTab === 'video') {
        return 'tab-active'
      } else {
        return ''
      }
    },
    getVideoCallOption() {
      //v-if="activeCall.state === 'ENDED' || (activeCall.state === 'IN_CALL' && !activeCall.sendingVideo)"
      if(!this.callStarted && this.activeCall.state === 'ENDED') {
        return true
      } else if (this.activeCall.state !== 'ENDED' && this.activeCall.state !== 'RINGING' && !this.activeCall.sendingVideo) {
        return true
      } else {
        return false
      }
    }
  },
};
</script>
<style>
.call-button-container0 {
  padding-top: 1px;
}

.call-button-container2 {
  padding-top: 160px;
}

.call-button-container1 {
  padding-top: 590px;
}

.call-button-container {
  margin: auto;
  width: 233px;
  height: 80px;
  vertical-align: middle;
  padding: 10px;
  background: #29a3d8;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  font-family: lato-bold;
  font-size: 17px;
  color: white;
}

.end-button-color {
  color: red;
}

.img1 {
  height: 50%;
  width: 50;
}

.a {
  max-height: 700px;
}

.messageLine {
  max-height: 20px;
}

.a2altta {
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.a2altta2 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.b {
  max-height: 40px;
  min-height: 40px;
}

.my-class {
  cursor: default;
}

.my-color {
  color: red;
}
.action {
  display: flex;
  align-items: center;
  justify-content: center;
}
.my-cursor {
  cursor: default;
}

.my-font[type="text"]
{
    font-size:24px;
    font-weight: bold;
}

.my-font2 {
  cursor: default;
  font-size:24px;
  color:#29a3d8;
  font-family: Arial;
}

.my-font1 {
  cursor: default;
  font-size:24px;
  font-family: Arial;
}

.my-font1s {
  cursor: default;
  font-family: Arial;
  font-size: 17px
}

.my-size {
 width: 24px;
 height: 24px;
}

.my-size2 {
 width: 24px;
 height: 24px;
}
.flex {
  display: flex;
  margin: 10px;
  padding: 5px;
  border: 0px solid black;
}

.column {
  flex-direction: column;
  padding: 0px;
}

.link {
  color: blue;
  font-size: 30px;
}

.flex2 {
  display: flex;
  margin: 40px;
  padding: 5px;
  border: 0px solid black;
  width: 100%;
}
</style>
