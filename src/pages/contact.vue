<template lang='pug'>
f7-page
  incomingCallModal
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{ $t('CONTACTS') }}
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:more_horiz', panel-open='right')
      f7-list-index(indexes="auto" list-el="#contacts-list" :scroll-list="true" :label="true" @listindex:select="onIndexSelect")
    //- f7-list#contacts-list(contacts-list="")
    //-   f7-list-group(v-for='(groups, key) in groupedContacts')
    //-     f7-list-item(v-for="contact in groups", :title="contact.firstName + ' ' + contact.lastName" group-title="")
  f7-tabs
    f7-tab#tab-1(tab-active="")
    f7-tab#tab-2
    f7-tab#tab-3
    // Switch Between Tabs
  f7-segmented
    f7-button(tab-link="#tab-1" tab-link-active="", @click="setContactSource('personal')") Personal
    f7-button(tab-link="#tab-2", @click="setContactSource('global')") Global
    f7-button(tab-link="#tab-3", @click="setContactSource('mobile')") Mobile
  f7-searchbar(v-if="contactSource === 'mobile'", disable-link-text="Cancel" search-container="#searchList" :placeholder="$t('SEARCH_IN_MOBILE')" :clear-button="true" @searchbar:search="onSearch" @searchbar:enable="onEnable" @searchbar:disable="onDisable" @searchbar:clear="onClear")
  f7-searchbar(v-if="contactSource === 'personal'", disable-link-text="Cancel" search-container="#searchList" :placeholder="$t('SEARCH_IN_CONTACTS')" :clear-button="true" @searchbar:search="onSearch" @searchbar:enable="onEnable" @searchbar:disable="onDisable" @searchbar:clear="onClear")
  p(v-if="contactSource === 'global'") {{ $t('MIN_SEARCH_CRITERIA') }}
  f7-searchbar(v-if="contactSource === 'global'", custom-search=true, disable-link-text="Cancel" :placeholder="$t('SEARCH_IN_DIRECTORY')" :clear-button="true" @searchbar:search="onSearch" @searchbar:enable="onEnable" @searchbar:disable="onDisable" @searchbar:clear="onClear")
  f7-list.searchbar-not-found
   f7-list-item(title="No contacts found")
  f7-list.searchbar-found(v-show='getContactSource', id='searchList')
   f7-list-item(v-for='contact in getContacts' :key="contact.entryId", v-show='isSearch', @click='openContactDetailsPopup(contact)' :title="contact.firstName + ' ' + contact.lastName")
  f7-list(v-show='!getContactSource')
   f7-list-item.my-class(v-for='contact in foundItems' :key="contact.entryId", v-show='isSearch', @click='openContactDetailsPopup(contact)' :title="contact.firstName + ' ' + contact.lastName")
  f7-list(media-list="")
   f7-list-group.date(v-for='(groups, key) in groupedContacts' :key="key", v-show='!isSearch')
    f7-list-item(:title="key" group-title="")
    f7-list-item(v-for="contact in groups", :key="key", :title="contact.firstName + ' ' + contact.lastName", after="personal", @click='openContactDetailsPopup(contact)')
     //-.item-content
     //-.item-media
     img.avatar-circle.test-icon-left(:src="contact.photoUrl || noImg" slot="media", width="44")
  //-  //-h5 {{key}}
  //-  f7-list(media-list="")
  //-     ul
  //-       li.my-class(v-for="contact in groups" @click='openContactDetailsPopup(contact)', oncontextmenu="openContextMenuPopup()",)
  //-         .item-content
  //-           .item-media
  //-             img.avatar-circle(:src="contact.photoUrl || noImg" width="44")
  //-             //- img(:src='presenceConnected', v-if='contact.presence.status === "open"')
  //-             //- img(:src='presenceClosed', v-if='contact.presence.status === "closed"')
  //-           .item-inner
  //-             .item-title-row
  //-               .item-title {{contact.firstName}} {{contact.lastName}}
  //-               .item-subtitle {{ $t('PERSONAL') }}
  //-             //- img(:src='presenceConnected')
  f7-popup#popupContactDetails
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-class(@click='backContactDetails') {{ $t('BACK') }}
            .title Contact Details
            .right.my-class(@click='openEditContactPopup') {{ $t('EDIT') }}
        .flex
          .flex2
            img(src="../assets/demo/avatar_generic.png" width="115" height="115")
          .flex.column
            .flex
             h3  {{contact.firstName}} {{contact.lastName}}
            .flex
             img.imgSize(src="../assets/demo/call_outline_blue.png" @click="callTypeSelection($t('SELECT_MODE'), $t('CHANGE_DEFAULT_MODE'), $t('CALL_MY_FIRST_MOBILE'), $t('CELLULAR'), $t('VoIP'))")
             img.imgSize(src="../assets/demo/video_outline_blue.png" hspace="20" @click="goCallPage('video')")
             div(hspace="20")
             img.imgSize(src="../assets/demo/bubble-clipart-chat-box-15d.png" @click="goCallPage('chat')")
        f7-block-title {{ $t('CONTACT') }}
        f7-list(form='')
          f7-list-item
            f7-label {{ $t('HOME') }}
            f7-input(type='text', value="contact.homePhone") {{contact.homePhone}}
            i.icon.f7-icons.ios-only.test-icon-right phone_in_talk_full
          f7-list-item
            f7-label {{ $t('MOBILE') }}
            f7-input(type='mobile', placeholder='mobile') {{contact.mobilePhone}}
          f7-list-item
            f7-label {{ $t('WORK') }}
            f7-input(type='home', placeholder='home') {{contact.workPhone}}
          f7-list-item
            f7-label {{ $t('NICKNAME') }}
            f7-input(type='tel', placeholder='Phone') {{contact.nickname}}
          f7-list-item
            f7-label {{ $t('USER_ID') }}
            f7-input(type='text', value="contact.homePhone") {{contact.primaryContact}}
          f7-list-item
            f7-label {{ $t('EMAIL') }}
            f7-input(type='email', placeholder='E-mail') {{contact.emailAddress}}
        f7-block-title {{ $t('SETTINGS_BIG') }}
        f7-list
          f7-list-item(@click='openManageFavorites()', :title="$t('MANAGE_FAVS')")
          f7-list-item(@click='removeContact(contact)', :title="$t('REMOVE_FROM_PAB')")
          f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="$t('SHOW_AVAILABILITY')")
  f7-popup#popupAddContact
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-class(@click='backAddContact') {{ $t('CLOSE') }}
            .title {{ $t('ADD_CONTACT') }}
            .right.my-class(@click='openEditContactPopup()') {{ $t('ADD') }}
        f7-block
          | Please fill contact details.
        f7-block-title Form Example
        f7-list(form='')
          f7-list-item
            f7-label Name
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label E-mail
            f7-input(type='email', placeholder='E-mail')
          f7-list-item
            f7-label URL
            f7-input(type='url', placeholder='URL')
          f7-list-item
            f7-label Password
            f7-input(type='password', placeholder='Password')
          f7-list-item
            f7-label Phone
            f7-input(type='tel', placeholder='Phone')
          f7-list-item
            f7-label Gender
            f7-input(type='select')
              option(selected='') Male
              option Female
          f7-list-item
            f7-label Birth date
            f7-input(type='date', placeholder='Birth date', value='2014-04-30')
          f7-list-item(title='Friend')
            f7-toggle(slot='after')
  f7-popup#popupEditContact1
    f7-view
      f7-page
        f7-navbar(title='Edit Contact')
          f7-nav-right
            f7-link(popup-close='', @click='editContact()') {{ $t('SAVE') }}
          f7-nav-left
            f7-link(popup-close='') {{ $t('BACK') }}
        f7-block
        f7-block-title Form Example
        f7-list(form='')
          f7-list-item
          f7-label Name
          f7-input(:value='firstName', @input="lastName = $event.target.value", type='text', :placeholder="contact.firstName")
          f7-list-item
          f7-label E-mail
          f7-input(type='email', placeholder='E-maill')
          f7-list-item
          f7-label URL
          f7-input(type='url', placeholder='URL')
          f7-list-item
          f7-label Password
          f7-input(type='password', placeholder='Password')
          f7-list-item
          f7-label Phone
          f7-input(type='tel', placeholder='Phone')
          f7-list-item
          f7-label Gender
          f7-input(type='select')
            option(selected='') Male
            option Female
  f7-popup#popupEditContact
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backEditContact') {{ $t('BACK') }}
            .right(@click='addContact(contact)') {{ $t('SAVE') }}
        .flex
          .flex2
            img(src="../assets/demo/avatar_generic.png" width="150" height="150")
          .flex.column
            .flex
             h3  {{contact.firstName}} {{contact.lastName}}
        f7-block
        f7-block-title IDENFIFICATION
        f7-list(form='')
          f7-list-item
            f7-label First Name*
            f7-input(:value='firstName' @input="firstName = $event.target.value",type='text', :placeholder='contact.firstName')
          f7-list-item
            f7-label Last Name*
            f7-input(:value='lastName' @input="lastName = $event.target.value", type='text', :placeholder='contact.lastName')
          f7-list-item
            f7-label Nickname
            f7-input(type='text', :placeholder='contact.nickname')
          f7-list-item
            f7-label User Id
            f7-input(type='url', :placeholder='contact.primaryContact')
          f7-list-item
            f7-label E-mail
            f7-input(type='email', placeholder='contact.emailAddress')
        f7-block
        f7-block-title {{ $t('CONTACT') }}
        f7-list(form='')
          f7-list-item
            f7-label {{ $t('HOME') }}
            f7-input(type='tel', :placeholder='contact.homePhone')
          f7-list-item
            f7-label {{ $t('MOBILE') }}
            f7-input(type='tel', :placeholder='contact.mobilePhone')
          f7-list-item
            f7-label {{ $t('WORK') }}
            f7-input(type='tel', :placeholder='contact.workPhone')
        f7-block
        f7-block-title {{ $t('SETTINGS_BIG') }}
        f7-list(form='')
            f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Show Presence Status'")
  f7-popup#popupCreateContact
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backProfile') {{ $t('BACK') }}
            .title {{ $t('ADD_PROFILE') }}
            .right(@click='saveProfile') {{ $t('SAVE') }}
        f7-block
        f7-block-title IDENTIFICATION
        f7-list(form='')
          f7-list-item
            f7-label {{ $t('FIRST_NAME') }}
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label {{ $t('LAST_NAME') }}
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label {{ $t('NICKNAME') }}
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label User ID*
            f7-input(type='tel', placeholder='id')
          f7-list-item
            f7-label {{ $t('EMAIL') }}
            f7-input(type='email', placeholder='E-mail')
        f7-block
        f7-block-title CONTACT
        f7-list(form='')
          f7-list-item
            f7-label Home*
            f7-input(type='tel', placeholder='Phone')
          f7-list-item
            f7-label Mobile*
            f7-input(type='tel', placeholder='Phone')
          f7-list-item
            f7-label Work*
            f7-input(type='tel', placeholder='Phone')
        f7-block
        f7-block-title SETTINGS
        f7-list(form='')
          f7-list-item(title='Show Presence Status')
            f7-toggle(slot='after')
  f7-popup#popupManageFavorites
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backFavorites') {{ $t('BACK') }}
            .title {{ $t('MANAGE_FAVS') }}
            .right(@click='saveFavorites') {{ $t('SAVE') }}
        f7-block
        f7-list(form='')
          f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="contact.primaryContact") {{ $t('CHAT') }}
          f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="contact.primaryContact") {{ $t('VOICE') }}
          f7-list-item(:key='3', checkbox='', name='my-checkbox', :value='3', :title="contact.primaryContact") {{ $t('VIDEO') }}
          f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="contact.workPhone") {{ $t('WORK') }}
  f7-popup#popupContextMenu
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backProfile') {{ $t('BACK') }}
            .title Context Menu
            .right(@click='saveProfile') {{ $t('SAVE') }}
        f7-block
        f7-block-title {{ $t('IDENTIFICATION') }}
        f7-list(form='')
  f7-popup#popupDefaultMode
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='backDefaultMode') {{ $t('SAVE') }}
            .title {{ $t('CALLING_MODE_WIFI') }}
        f7-block
        f7-block-title
        p {{ $t('CALLING_MODE_WIFI_HEAD') }}
        f7-list(form='')
          f7-list-item.sheet-open(:title="$t('CALLING_MODE')", :after="$t('ASK_EVERY_TIME')", link="", data-sheet=".defaultMode-sheet")
        p {{ $t('BLOCKED') }}
        p {{ $t('INTERNET_CONNECTION') }}
        p {{ $t('CELLULAR_CALL') }}
        p {{ $t('CALL_ME_BACK') }}
        p {{ $t('ASK_ON_EVERY_CALL') }}
  .sheet-modal.transferTo-sheet
    .toolbar(title="deneme1")
      .toolbar-inner.center
        .right
          a.link.sheet-close.center(href="#") {{ $t('TRANSFERRING') }}
    .sheet-modal-inner
      .block
        f7-list(form='')
         f7-list-item.center.sheet-close(:title="$t('DIALER')", @click='goDialpad()')
         f7-list-item.center(:title="$t('CONTACTS')")
  .sheet-modal.defaultMode-sheet
    .toolbar(title="deneme1")
      .toolbar-inner
        .left
        .right
          a.link.sheet-close(href="#", style="font-size: 20px") {{ $t('CANCEL') }}
    .sheet-modal-inner
        f7-list(form='')
         f7-list-item.center.sheet-close(:title="$t('NONE')", @click='goDialpad()')
         f7-list-item.center(:title="$t('VoIP')")
         f7-list-item.center.sheet-close(:title="$t('CELLULAR')", @click='goDialpad()')
         f7-list-item.center(:title="$t('CALL_MY_FIRST_MOBILE')")
         f7-list-item.center(:title="$t('ASK_EVERY_TIME')")
  </template>
<script>
import NoImg from '../assets/demo/noimage.jpg';
import PresenceConnected from '../assets/icon/presence_connected.png';
import PresenceClosed from '../assets/icon/presence_not.png';
import PresenceClosedMessage from '../assets/icon/presence_away.png';
import IncomingCallModal from './ModalIncomingCall'
import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

export default {
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'contact');
    // this.$store.dispatch('search', 'Ahmet');
  },
  data: function() {
    return {
      foundItems: [],
      contacts: [],
      noImg: NoImg,
      presenceConnected: PresenceConnected,
      presenceClosed: PresenceClosed,
      presenceClosedMessage: PresenceClosedMessage,
      contact: '',
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
      // contactSource: '',
    };
  },
  components: {
    incomingCallModal: IncomingCallModal
  },
  methods: {
    setContactSource: function(source) {
    this.$store.commit("SET_CONTACTSOURCE", source);
    },
    onIndexSelect() {
      console.log('list index clicked')
    },
    backAddContact() {
      this.$f7.popup.close('#popupAddContact', true);
    },
    backContactDetails() {
      this.$f7.popup.close('#popupContactDetails', true);
    },
    backEditContact() {
      this.$f7.popup.close('#popupEditContact', true);
    },
    backProfile() {
      this.$f7.popup.close('#popupCreateContact', true);
    },
    saveProfile() {
      this.$f7.popup.close('#popupCreateContact', true);
    },
    backFavorites() {
      this.$f7.popup.close('#popupManageFavorites', true);
    },
    backDefaultMode() {
      this.$f7.popup.close('#popupDefaultMode', true);
    },
    saveFavorites() {
      this.$f7.popup.close('#popupManageFavorites', true);
    },
    openContactDetailsPopup: function(contact) {
      this.contact = contact;
      let contactSource1 = this.$store.state.contactSource;
      console.log('selected contact ' + JSON.stringify(contact));
      if (contactSource1 === 'personal') {
        this.$f7.popup.open(popupContactDetails, true);
      } else {
        this.$f7.popup.open(popupAddContact, true);
      }
    },
    openAddContactPopup: function() {
      this.$f7.popup.open(popupAddContact, true);
    },
    openEditContactPopup: function() {
      this.$f7.popup.open('#popupEditContact', true);
      //this.$f7.popup.open('#popupAddContact', true);
    },
    openManageFavorites: function() {
      this.$f7.popup.open(popupManageFavorites, true);
    },
    openContextMenuPopup: function() {
      this.$f7.popup.open(popupContextMenu, true);
    },
    onSearch: function(query, found) {
      setTimeout(() => {this.$store.dispatch('search', query.value);}, 2000);
    },
    onClear: function(event) {
      console.log('clear');
    },
    onEnable: function(event) {
      this.isSearch = true;
      console.log('enable');
    },
    onDisable: function(event) {
      this.isSearch = false;
      console.log('disable');
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
    goCallPage: function(mode) {
      this.$f7.popup.close('#popupContactDetails', true);
      this.$store.commit('SET_ACTIVECALLTAB', mode);
      this.$store.commit('SET_CALLEE', this.contact.id);
      this.$store.commit('SET_STARTCALL', true);
      setTimeout(() => {
        this.$f7router.navigate('/call');
      }, 100);
    },
    dene: function simulateKeyPress() {
      var evt = document.createEvent('KeyboardEvent');
      evt.initKeyEvent(
        'keypress',
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        'e'.charCodeAt(0)
      );
      var body = document.body;
      var canceled = !body.dispatchEvent(evt);
      if (canceled) {
        // A handler called preventDefault
        alert('canceled');
      } else {
        // None of the handlers called preventDefault
        alert('not canceled');
      }
    },
    removeContact: function(contact) {
      var r = confirm('Delete Contact', 'Are You Sure ?');
      if (r == true) {
        this.$store.dispatch('removeContact', contact.entryId);
      } else {
        console.log('remove contact canceled');
      }

      //Framework7.app.
      // confirm('Delete Contact', 'Are You Sure ?', function() {
      //   console.log('confirmed')
      //   this.$store.dispatch('removeContact', contact.entryId);
      // });
    },
    editContact: function() {
      console.log('name ' + this.firstName + this.lastName);
    },
    addContact: function(contact) {
      // this.$f7.popup.close('#popupEditContact', true);
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

      let contacts = this.$store.state.contacts;
      let contactExist = false;
      contacts.forEach(contact1 => {
        if (contact.primaryContact === contact1.primaryContact) {
          contactExist = true;
        }
      });

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

      this.$f7.popup.close('#popupAddContact', true);
    },
  },
  computed: {
    ...mapGetters(['contacts','contactSource']), // not used anymore, instead store.state used
    getContacts() {
      var resultArray = [];
      let contactSource = this.$store.state.contactSource;
      if (contactSource === 'personal') {
        let sortBy = this.$store.state.sortBy;
        if (sortBy === 'firstName') {
          this.contacts = _.sortBy(this.$store.state.contacts, [
            function(o) {
              return o.firstName;
            },
          ]);
        } else {
          this.contacts = _.sortBy(this.$store.state.contacts, [
            function(o) {
              return o.lastName;
            },
          ]);
        }
        return this.contacts;
      } else {
        // setTimeout(() => {
        //   //document.getElementById('f7-searchbar').search(query);
        //   // this.$store.dispatch('search', query.value);
        // }, 2000);
        this.foundItems = this.$store.state.directory;
        return this.$store.state.directory;
      }
    },
    groupedContacts() {
      let contacts = this.getContacts;
      contacts.forEach(contact => {
        if (contact.firstName) {
          contact.name = contact.firstName.charAt(0);
        }
      });
      return _.groupBy(contacts, 'name');
    },
    getContactSource() {
      let contactSource = this.$store.state.contactSource;
      if (contactSource === 'personal') {
        return true;
      } else {
        return false;
      }
    },
  },
};
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

.my-class {
  cursor: default;
}

.my-cursor {
  cursor: default;
}
</style>
