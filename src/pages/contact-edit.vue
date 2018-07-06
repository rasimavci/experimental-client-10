<template lang='pug'>
.page
  .navbar
    .navbar-inner
      .left.my-cursor(@click='backContactEdit') {{ $t('BACK') }}
      .title {{ $t('EDIT_PROFILE') }}
      .right.my-cursor(@click='addContact(contact)') {{ $t('SAVE') }}
  .page-content(v-if='contact')
    .flex
      .flex2
        img(:src='contactData.photoUrl || noImg', width="115" height="115")
      .flex.column
        .flex
          h3  {{contactData.firstName}} {{contactData.lastName}}
        .flex
          img.imgSize(src="../assets/demo/call_outline_blue.png" @click="callTypeSelection($t('SELECT_MODE'), $t('CHANGE_DEFAULT_MODE'), $t('CALL_MY_FIRST_MOBILE'), $t('CELLULAR'), $t('VoIP'))")
          img.imgSize(src="../assets/demo/video_outline_blue.png" hspace="20" @click="goCallPage('video')")
          div(hspace="20")
          img.imgSize(src="../assets/demo/bubble-clipart-chat-box-15d.png" @click="goCallPage('chat')")
    f7-block
      f7-block-title {{ $t('IDENTIFICATION') }}
      f7-list(form='')
        f7-list-item
          f7-label {{ $t('FIRST_NAME') }}*
          f7-input(:value='contact.firstName' @input="contact.firstName = $event.target.value", type='text')
        f7-list-item
          f7-label {{ $t('LAST_NAME') }}*
          f7-input(:value='contact.lastName' @input="contact.lastName = $event.target.value", type='text')
        f7-list-item
          f7-label Nickname
          f7-input(type='text', :value='contact.nickname')
        f7-list-item
          f7-label {{ $t('USER_ID') }}
          f7-input(type='url', :value='contact.userId')
        f7-list-item
          f7-label E-mail
          f7-input(type='email', :value='contact.email')
    f7-block
      f7-block-title {{ $t('CONTACT_DETAIL') }}
      f7-list(form='')
        f7-list-item
          f7-label {{ $t('HOME') }}
          f7-input(type='tel', :value='contact.homePhone')
        f7-list-item
          f7-label {{ $t('MOBILE') }}
          f7-input(type='tel', :value='contact.mobilePhone')
        f7-list-item
          f7-label {{ $t('WORK') }}
          f7-input(type='tel', :value='contact.workPhone')
      f7-block
      f7-block-title {{ $t('SETTINGS_BIG') }}
      f7-list(form='')
          f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Show Presence Status'")
</template>

<script>
import NoImg from '../assets/demo/avatar_generic_big.png';
import { mapGetters } from 'vuex';
export default {
  name: 'pupupContactDetail',
  data () {
    return {
      contact: null,
      noImg: NoImg,
    }
  },
  computed: {
    ...mapGetters(['contactData', 'contacts'])
  },
  mounted () {
    this.contact = _.cloneDeep(this.contactData)
  },
  methods: {
    backContactEdit() {
      this.$f7.router.navigate('/contact')
    },
    addContact: function(contact) {
      debugger
      const newContact = {
        id: this.contacts.length,
        // entryId: this.contacts.length,
        emailAddress: contact.email ? contact.email : null,
        fax: contact.fax ? contact.fax : null,
        firstName: contact.firstName ? contact.firstName : null,
        friendStatus: false,
        homePhone: contact.homePhone ? contact.homePhone : null,
        lastName: contact.lastName ? contact.lastName : null,
        mobilePhone: contact.mobilePhone ? contact.mobilePhone : null,
        nickname: contact.nickname
          ? contact.nickname
          : 'nickname' + this.contacts.length,
        pager: contact.pager ? contact.pager : null,
        primaryContact: contact.userId ? contact.userId : null,
        userId: contact.userId ? contact.userId : null,
        username: contact.username ? contact.username : null,
        workPhone: contact.workPhone ? contact.workPhone : null,
      };
      let _primaryContact = this.contact.primaryContact
      let contactExist = _.find(this.contacts, c => {return c.primaryContact === _primaryContact})
      contacts.forEach(contact1 => {
        if (contact.primaryContact === contact1.primaryContact) {
          contactExist = true;
        }
      })
      if (contactExist) {
        const newContact = {
          // id: this.contacts.length,
          entryId: contact.entryId,
          emailAddress: contact.email ? contact.email : null,
          fax: contact.fax ? contact.fax : null,
          firstName: contact.firstName ? contact.firstName : null,
          friendStatus: false,
          homePhone: contact.homePhone ? contact.homePhone : null,
          lastName: contact.lastName ? contact.lastName : null,
          mobilePhone: contact.mobilePhone ? contact.mobilePhone : null,
          nickname: contact.nickname ? contact.nickname : 'nickname',
          pager: contact.pager ? contact.pager : null,
          primaryContact: contact.primaryContact
            ? contact.primaryContact
            : null,
          userId: contact.userId ? contact.userId : null,
          username: contact.username ? contact.username : null,
          workPhone: contact.workPhone ? contact.workPhone : null,
        };
        console.log('edit contact ' + newContact.primaryContact);
        // this.$store.dispatch('addContact', newContact);
      } else {
        this.$store.dispatch('addContact', newContact);
        console.log('add contact ' + newContact.primaryContact);
      }
      this.$f7.popup.close('#popupEditContact', true);
      this.$f7.popup.close('#popupAddContact', true);
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
  max-height: 30px;
  max-width: 30px;
}

.avatar-circle {
  border-radius: 25px;
}

.rows {
  max-height: 50px;
}
</style>
