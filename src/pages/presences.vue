<template lang="pug">
f7-page
  incomingCallModal
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{username}}
  f7-block-header {{ $t('PRESENCE') }}
  f7-list(form='', media-list="")
    f7-list-item(:media="presenceConnected", :key='1', radio='', name='my-radio', :checked='fruit === 1', :value='1', :title="$t('AVAILABLE')" @change="setPresence('0')" checked)
    f7-list-item(:media="presenceClosed", :key='2', radio='', name='my-radio', :checked='fruit === 1', :value='2', :title="$t('BUSY')" @change="setPresence('1')")
    f7-list-item(:media="presenceClosed", :key='3', radio='', name='my-radio', :checked='fruit === 1', :value='3', :title="$t('ON_VACATION')" @change="setPresence('2')")
    f7-list-item(:media="presenceClosedMessage", :key='4', radio='', name='my-radio', :checked='fruit === 1', :value='4', :title="$t('AWAY')" @change="setPresence('3')")
    f7-list-item(:media="presenceClosedMessage", :key='5', radio='', name='my-radio', :checked='fruit === 1', :value='5', :title="$t('OUT_TO_LUNCH')" @change="setPresence('4')")
    f7-list-item(:media="presenceClosedMessage", :key='6', radio='', name='my-radio', :checked='fruit === 1', :value='6', :title="$t('BE_RIGHT_BACK')" @change="setPresence('5')")
    f7-list-item(:media="PresenceOffline", :key='7', radio='', name='my-radio', :checked='fruit === 1', :value='7', :title="$t('OFFLINE')" @change="setPresence('6')")

  f7-block(strong='')
    f7-row.block_container
      f7-col(width='85')
        f7-button.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render(style="text-transform:capitalize", fill='', big='', raised='',@click="about") {{ $t('ABOUT') }}
    f7-row.block_container(tag='p')
      f7-col(width='85')
        f7-button.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render(style="text-transform:capitalize", fill='', big='', raised='', @click='doLogout') {{ $t('LOGOUT') }}
    f7-row.block_container(tag='p')
      f7-col(width='85')
        f7-button.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render(style="text-transform:capitalize", fill='', big='', raised='', popup-open='#popupSendFeedback') {{ $t('SEND_VIA_EMAIL') }}
    f7-row.block_container(tag='p')
      f7-col(width='85')
        f7-button.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render(style="text-transform:capitalize", fill='', big='', raised='', popup-open='#openPrivacyPolicy') {{ $t('PRIVACY_POLICY') }}
  f7-popup#popupSendFeedback
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='closePopupSendFeedback') {{ $t('BACK') }}
            .title {{ $t('SEND_FEEDBACK') }}
            .right
        f7-block
        f7-list
          f7-list-item
            f7-label {{ $t('ISSUE_DESC_LABEL') }}
            f7-input(type='textarea', placeholder='Enter your feedback')
          f7-row(tag='p')
            f7-col(width='85')
              f7-button(fill='', raised='', popup-open='#popupSendFeedback') {{ $t('SEND_FEEDBACK') }}
</template>

<script>
//import Framework7 from 'framework7/dist/framework7.esm.bundle.js';
import NoImg from '../assets/demo/noimage.jpg';
import IncomingCallModal from './ModalIncomingCall'
import PresenceConnected from '../assets/icon/presence_connected.png';
import PresenceClosed from '../assets/icon/presence_not.png';
import PresenceClosedMessage from '../assets/icon/presence_away.png';
import PresenceOffline from '../assets/icon/presence_offline.png';
export default {

  created: function() {
    this.username = this.$store.state.credentials.user;
  },
  data() {
    return {
      presenceConnected: PresenceConnected,
      presenceClosed: PresenceClosed,
      presenceClosedMessage: PresenceClosedMessage,
      PresenceOffline: PresenceOffline,
      noImg: NoImg,
      fruit: 'apple',
      username: '',
    };
  },
    components: {
    incomingCallModal: IncomingCallModal
  },
   methods: {
     openPrivacyPolicy() {
     },
    about() {
       this.$f7.dialog.alert('Version 4.0', 'Smart Office', false)
    },
    setPresence: function(mode) {
      this.$store.dispatch('setPresence', mode);
      this.$store.dispatch('getPresence', mode);
    },
    answer: function(mode) {
      this.$store.commit('SET_ACTIVECALLTAB', mode);
      this.$store.commit('SET_CALLEE', this.callee);
      //this.$store.commit('SET_STARTCALL', true);
      this.$f7router.navigate('/history'); // if not route another page first, tabs are not working in call page
      this.$f7router.navigate('/call');
    },
    doLogout() {
      this.$store.commit('SET_ISCONNECTED', false);
      this.$store.commit('SET_LOGOUT', true);
      this.$store.dispatch('disconnect');
      let vm = this;
      this.$f7.preloader.show();
      setTimeout(() => {
        vm.$f7.preloader.hide();
        vm.$f7router.navigate('/login');
      }, 2000);
    },
    closePopupSendFeedback() {
      this.$f7.popup.close('#popupSendFeedback', true);
    }
  },
};
</script>
<style scoped>
.block_container {
  margin: auto;
  width: 100%;
  padding: 5px;
  padding-top: 2px;
}
.my-cursor {
  cursor: default;
}
</style>
