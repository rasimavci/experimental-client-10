<template lang='pug'>
.page.dialpad-page
  incomingCallModal
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{ $t('DIALPAD') }}
  .modal-container2
    f7-input(autofocus=true, name='callee', :placeholder="$t('PLACEHOLDER_DIALPAD')", type='text', :value='callee', @input='callee = $event.target.value')
    span.input-group-btn(v-show='hasInput')
      button.backspace-button(type='button', @click="callee = ''")
        i
        img(slot='icon', src='../assets/demo/backspace_blue.png')
  .modal-container1.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render
    .modal-container.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render(display='none')
      .h3(align='center')
        img.media-object.pull-center(:src='user')
      .keypad.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render
        .keypad-container.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render
          div.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render
            button(type='button', @click="press(1)")
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
          div.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render
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
          div.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render
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
          div.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render
            button(@click='press(1)')
              | *
            button(@click='press(1)')
              | 0
            button(@click='press(1)')
              | #
          div.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render
            button(@click='press(1)')
              |
            button(@click='transfer()',v-if="startTransfer")
              i.icon.material-icons.md-only phone_in_talk
  // Additional "tabbar-labels" class
  .toolbar.toolbar-bottom-md.tabbar-labels.tabBackground(v-if="!startTransfer")
    .toolbar-inner
      a.tab-link.b(href='#tab-1')
        i.icon.f7-icons.ios-only
          | keyboard_fill
        i.icon.material-icons.md-only
          | keyboard
      a.tab-link.tab-link.b(href='#tab-2',@click='goCallPage("chat")')
        // Different icons for iOS and MD themes
        i.icon.f7-icons.ios-only email_fill
        i.icon.material-icons.md-only chat_bubble
        span.badge.color-red 5
        // Label text
      a.tab-link.b.tab-link-active(href='#tab-3',@click='goCallPage("audio")')
        //-img(slot='icon', src='../assets/demo/camera_outline_white.png')
        i.icon.f7-icons.ios-only phone_fill
        i.icon.material-icons.md-only phone
      a.tab-link.b(href='#tab-4',@click='goCallPage("video")')
        i.icon.f7-icons.ios-only videocam_fill
        i.icon.material-icons.md-only videocam
      a.tab-link.b(href='#tab-5')
        i.icon.f7-icons.ios-only voicemail_fill
        i.icon.material-icons.md-only voicemail
  .tabs
    #tab-1.page-content.tab
    #tab-2.page-content.tab
    #tab-3
    //-.page-content.tab.tab-active
    #tab-4.page-content.tab
    #tab-4.page-content.tab

</template>

<script>
import { mapState, mapGetters } from 'vuex';
import IncomingCallModal from './ModalIncomingCall'
export default {
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'dialpad');
  },
  mounted() {
    this.callee = ''
    this.$nextTick(() => {
      document.getElementsByClassName('modal-container1')[0].style.width =
        document.body.offsetWidth + 'px';
    });
    console.log('startTransfer ' + this.startTransfer)
  },
  components: {
    incomingCallModal: IncomingCallModal
  },
  computed: {
    ...mapGetters(['startTransfer']),
  },
  methods: {
        transfer: function() {
          this.$store.commit('SET_ACTIVECALLTAB', 'audio');
          this.$store.commit('SET_TARGET', this.callee);
          this.$store.commit('SET_STARTTRANSFER', false);
          this.$store.commit('SET_STARTCALL', 'transfer');

          this.$f7router.navigate('/history');
          this.$f7router.navigate('/call');
        },
    goCallPage: function(mode) {
      const callee1 = this.$store.state.callee
      if(this.callee === '') {
        this.callee = callee1 // this.$store.state.callee

      } else {
      console.log('callee ' + this.callee)
      this.$store.commit('SET_ACTIVECALLTAB', mode);
      this.$store.commit('SET_CALLEE', this.callee);
      if(mode === 'audio' || mode === 'video') {
        this.$store.commit('SET_STARTCALL', true);
      } else if (mode === 'chat') {
      let contacts = this.$store.state.contacts;
      let calleeName;
      contacts.forEach(contact => {
          if (contact.primaryContact === this.callee) {
            calleeName = contact.firstName + ' ' + contact.lastName;
          }
        });
      this.$store.commit('SET_ACTIVECALLCALLEE', calleeName);
      }
      this.$f7router.navigate('/history'); // if not route another page first, tabs are not working in call page
      this.$f7router.navigate('/call');

      }

    },
    openLeftPanel: function() {
      this.$f7.popup.open(popupLanguage, true);
    },
    press(character) {
      console.log('pressed ' + character)
      this.callee = this.callee + character;
      // vm.dialValue = vm.dialValue + '6'
    },
  },
  data() {
    return {
      activeCallState: 'IN_CALL',
      callee: '',
      user: '',
      hasInput: false,
      callee: ''
    };
  },
};
</script>
<style>
#aPage {
  background-color: #fff;
}

.b {
  max-height: 30px;
}

.h3 {
  color: #1abc9c;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container1 {
  position: absolute;
  bottom: 50px;
  padding: 1px 1px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-container2 {
  padding-top: 200px;
  background-color: #fff;
}

.modal-container {
  /* width: 400px; */
  background-color: #fff;
  border-radius: 0px;
  box-shadow: 0;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0;
}

.keypad {
  text-align: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border: 0px solid black;
}

.input-number {
  width: 100%;
  margin: 0 auto;
  /* margin-top: 5px; */
  border: 0;
  background-color: #eceff0;
  height: 50px;
  font-size: 1.5em;
  text-align: center;
}

.keypad-container {
  overflow: hidden;
  border: 0px solid black;
  padding: 1px;
}

.keypad-container div {
  width: 90%;
  padding: 1px;
}

.keypad-container div button {
  width: 33.33%;
  padding: 0;
  margin: 0;
  display: block;
  float: left;
  height: 70px;
  border: 1px solid gray;
  background: white;
  color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  font-size: 1.5em;
  margin: 5px 0;
}

.keypad-button-number {
  font-size: 28px;
  display: block;
  margin: 18px auto 5px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 22px;
  text-align: center;
}

.keypad-button-text {
  font-size: 12px;
  display: block;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.5);
  line-height: 12px;
  text-align: center;
  height: 12px;
}

.dialpad-page .button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  height: 50px;
  width: 10px;
}

.dialpad-button {
  width: 84px;
  height: 72px;
  border-bottom: 1px solid;
  float: left;
}

.keypad-menu {
  text-align: center;
}

.keypad-menu button {
  width: 64px;
  height: 64px;
  margin: 10px;
  border-radius: 32px;
  background-color: gray;
  padding: 0;
}

.keypad-menu button:hover {
  background-color: #1e90ff;
}

.keypad-menu myhover {
  background-color: #1abc9c;
}

.dialpad-button:hover {
  background-color: blue;
}

.dialpad-button .number {
  font-size: 28px;
  display: block;
  margin: 18px auto 5px;
  color: black;
  line-height: 22px;
  text-align: center;
}

.dialpad-button .letters {
  font-size: 12px;
  display: block;
  margin: 0 auto;
  color: darkgray;
  line-height: 12px;
  text-align: center;
}

.hide-keypad {
  max-height: 0px;
  transition: max-height 0.25s ease-in;
}

.backspace-button {
  background: white;
  border: 0px;
}

.keypad-container button {
  border: none !important;
  border-radius: 0px !important;
  color: #1e90ff !important;
}

.keypad-container button div {
  color: #1e90ff !important;
}

.keypad-container button:hover {
  background-color: #1abc9c;
}

.keypad-container button:hover div {
  /* background-color: #1abc9c; */
  color: white !important;
}

#block_container {
  text-align: center;
}

#bloc1 {
  position: absolute;
  bottom: 0;
}

#bloc2 {
  display: inline;
}

#localVideoContainer,
#remoteVideoContainer {
  height: 200px;
}

.flex {
  display: flex;
  margin: 10px;
  padding: 5px;
  border: 0px solid black;
}

.flex1 {
  border: 0px solid black;
}

.my-class {
  cursor: default;
}

.tabBackground {
  background-color: white;
  color: white;
}


input[type="text"]
{
    font-size:20px;
    color: #1e90ff;
    font-style: italic;
}
</style>
