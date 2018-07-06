<template lang='pug'>
.popup.popupContactDetails
  .view
    pre {{contactData}}
    .page(v-if='contactData')
      .navbar
        .navbar-inner
          .left.my-cursor(@click='backContactDetails') {{ $t('BACK') }}
          .title Contact Details
          .right.my-cursor(@click='openEditContactPopup') {{ $t('EDIT') }}
      .flex
        .flex2
          img(src="../../assets/demo/avatar_generic.png" width="115" height="115")
        .flex.column
          .flex
            h3  {{contactData.firstName}} {{contactData.lastName}}
          .flex
            img.imgSize(src="../../assets/demo/call_outline_blue.png" @click="callTypeSelection($t('SELECT_MODE'), $t('CHANGE_DEFAULT_MODE'), $t('CALL_MY_FIRST_MOBILE'), $t('CELLULAR'), $t('VoIP'))")
            img.imgSize(src="../../assets/demo/video_outline_blue.png" hspace="20" @click="goCallPage('video')")
            div(hspace="20")
            img.imgSize(src="../../assets/demo/bubble-clipart-chat-box-15d.png" @click="goCallPage('chat')")
      .page-content
        f7-block-title {{ $t('CONTACT') }}
        f7-list(form='')
          f7-list-item(v-if='contactData.homePhone')
            f7-label {{ $t('HOME') }}
            f7-input(type='text', :value="contact.homePhone") {{contactData.homePhone}}
            i.icon.f7-icons.ios-only.test-icon-right phone_in_talk_full
          f7-list-item
            f7-label {{ $t('MOBILE') }}
            f7-input(type='mobile', :value='mobile') {{contactData.mobilePhone}}
          f7-list-item
            f7-label {{ $t('WORK') }}
            f7-input(type='home', :value='home') {{contactData.workPhone}}
          f7-list-item
            f7-label {{ $t('NICKNAME') }}
            f7-input(type='tel', :value='Phone') {{contactData.nickname}}
          f7-list-item(v-if='contact.homePhone')
            f7-label {{ $t('USER_ID') }}
            f7-input(type='text', :value="contact.homePhone") {{contactData.primaryContact}}
          f7-list-item
            f7-label {{ $t('EMAIL') }}
            f7-input(type='email', :value='E-mail') {{contactData.emailAddress}}
        f7-block-title {{ $t('SETTINGS_BIG') }}
        f7-list
          f7-list-item(@click='openManageFavorites()', :title="$t('MANAGE_FAVS')")
          f7-list-item(@click='removeContact(contact)', :title="$t('REMOVE_FROM_PAB')")
          f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="$t('SHOW_AVAILABILITY')")
</template>

<script>
import NoImg from '../../assets/demo/noimage.jpg';
import PresenceConnected from '../../assets/icon/presence_connected.png';
import PresenceClosed from '../../assets/icon/presence_not.png';
import PresenceClosedMessage from '../../assets/icon/presence_away.png';
import { mapGetters } from 'vuex';
export default {
  name: 'pupupContactDetail',
  data () {
    return {
      checkboxChat: false,
      checkboxVoice: false,
      checkboxVideo: false,
      checkboxWork: false,
      foundItems: [],
      contacts: [],
      noImg: NoImg,
      presenceConnected: PresenceConnected,
      presenceClosed: PresenceClosed,
      presenceClosedMessage: PresenceClosedMessage,
      showData: 'all',
      isSearch: false,
      id: null,
      firstName: null,
      lastName: null,
      nickname: null,
      mobilePhone: null,
      userId: null,
      username: null,
      emailAddress: null,
      homePhone: null,
      workPhone: null,
      fax: null,
      pager: 'netas',
      friendStatus: false,
      primaryContact: null,
    }
  },
  computed: {
    ...mapGetters(['contactData'])
  },
  mounted () {
  },
  methods: {
    backContactDetails() {
      this.$f7.popup.close('#popupContactDetails', true);
    },
    openEditContactPopup () {
      this.$f7.popup.open('#popupEditContact', true);
    },
    callTypeSelection (selectMode,a,b,c,d) {
      var ac1 = this.$f7.actions.create({
        buttons: [
          {
            text: selectMode,
            bold: true,
            bg: 'blue',
            color: 'red',
          },
          {
            text: a,
            color: 'blue',
            onClick: () => {
              this.$f7.popup.open('#popupDefaultMode', true);
            }
          },
          {
            text: b,
            color: 'blue'
          },
          {
            text: c,
            color: 'blue'
          },
          {
            text: d,
            color: 'blue',
            onClick: () => {
              this.goCallPage('audio')
            }
          }
        ]
      })
      ac1.open();
    },
    goCallPage (mode) {
      this.$f7.popup.close('#popupContactDetails', true);
      this.$store.commit('SET_ACTIVECALLTAB', mode);
      this.$store.commit('SET_CALLEE', this.contact.id);
      if(mode !== 'chat'){
      this.$store.commit('SET_STARTCALL', true);
      }
      setTimeout(() => {
        this.$f7router.navigate('/history');
        this.$f7router.navigate('/call');
      }, 100);
    },
  }
}
</script>

<style>
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
  margin: 10px;
  padding: 5px;
  border: 0px solid black;
  width: 100%;
}

.imgSize {
  max-height: 50px;
  max-width: 50px;
}

.avatar-circle {
  border-radius: 25px;
}

.rows {
  max-height: 50px;
}
</style>
