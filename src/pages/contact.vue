<template lang='pug'>
f7-page(v-if=getContactSource)
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title Contacts
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:more_horiz', panel-open='right')
  f7-searchbar(disable-link-text="Cancel" search-container="#searchList" placeholder="Search in contacts" :clear-button="true" @searchbar:search="onSearch" @searchbar:enable="onEnable" @searchbar:disable="onDisable" @searchbar:clear="onClear")
  f7-list.searchbar-not-found
   f7-list-item(title="No contacts found")
  f7-list.searchbar-found(id='searchList')
   f7-list-item(v-for='contact in getContacts' :key="contact.entryId", v-show='isSearch', @click='openContactDetailsPopup(contact)' :title="contact.firstName + ' ' + contact.lastName")

  f7-list.date(v-for='(groups, key) in groupedContacts' :key="key", v-show='!isSearch')
   h5 {{key}}
   f7-list(media-list="")
      ul
        li(v-for="contact in groups" @click='openContactDetailsPopup(contact)')
          .item-content
            .item-media
              img.avatar-circle(:src="contact.photoUrl || noImg" width="44")
              //- img(:src='presenceConnected', v-if='contact.presence.status === "open"')
              //- img(:src='presenceClosed', v-if='contact.presence.status === "closed"')
            .item-inner
              .item-title-row
                .item-title {{contact.firstName}} {{contact.lastName}}
              img(:src='presenceConnected')
              .item-subtitle Personal
  f7-popup#popupContactDetails
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backContactDetails') Back
            .title Contact Details
            .right(@click='openEditContactPopup') Edit
        f7-list
          f7-list-item(@click='openAddContactPopup()', title='Temporary Open Add Popup')
        .flex
          .flex2
            img(src="../assets/demo/avatar_generic.png" width="150" height="150")
          .flex.column
            .flex
             h3  {{contact.firstName}} {{contact.lastName}}
            .flex
             img.imgSize(src="../assets/demo/call_outline_blue.png" @click="goCall(1)")
             img.imgSize(src="../assets/demo/video_outline_blue.png" hspace="20" @click="goCall(2)")
             div(hspace="20")
             img.imgSize(src="../assets/demo/bubble-clipart-chat-box-15d.png" @click="goCall(0)")
        f7-block-title CONTACT
        f7-list(form='')
          f7-list-item
            f7-label Home
            f7-input(type='text', value="contact.homePhone") {{contact.homePhone}}
          f7-list-item
            f7-label Mobile
            f7-input(type='mobile', placeholder='mobile') {{contact.mobilePhone}}
          f7-list-item
            f7-label Work
            f7-input(type='home', placeholder='home') {{contact.workPhone}}
          f7-list-item
            f7-label Nickname
            f7-input(type='tel', placeholder='Phone') {{contact.nickname}}
          f7-list-item
            f7-label User Id
            f7-input(type='text', value="contact.homePhone") {{contact.primaryContact}}
          f7-list-item
            f7-label E-mail
            f7-input(type='email', placeholder='E-mail') {{contact.emailAddress}}
        f7-block-title SETTINGS
        f7-list
          f7-list-item(@click='openManageFavorites()', title='Manage Favorites')
          f7-list-item(@click='removeContact(contact)', title='Remove From Contacts List')
          f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Show Presence Status'")
  f7-popup#popupAddContact
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backAddContact') Close
            .title Add Contact
            .right(@click='addContact(contact)') Add
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
            f7-link(popup-close='', @click='editContact()') Save1
          f7-nav-left
            f7-link(popup-close='') Back
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
            .left(@click='backEditContact') Back
            .right(@click='editContact') Save1
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
        f7-block-title CONTACT
        f7-list(form='')
          f7-list-item
            f7-label Home
            f7-input(type='tel', :placeholder='contact.homePhone')
          f7-list-item
            f7-label Mobile
            f7-input(type='tel', :placeholder='contact.mobilePhone')
          f7-list-item
            f7-label Work
            f7-input(type='tel', :placeholder='contact.workPhone')
        f7-block
        f7-block-title SETTINGS
        f7-list(form='')
            f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Show Presence Status'")
  f7-popup#popupCreateContact
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backProfile') Back
            .title Create Profile
            .right(@click='saveProfile') Save
        f7-block
        f7-block-title IDENTIFICATION
        f7-list(form='')
          f7-list-item
            f7-label First Name
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label Last Name
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label Nickname
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label User ID*
            f7-input(type='tel', placeholder='id')
          f7-list-item
            f7-label E-mail
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
            .left(@click='backFavorites') Back
            .title Manage Favorites
            .right(@click='saveFavorites') Save
        f7-block
        f7-list(form='')
          f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="contact.primaryContact") Chat
          f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="contact.primaryContact") Voice
          f7-list-item(:key='3', checkbox='', name='my-checkbox', :value='3', :title="contact.primaryContact") Video
          f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="contact.workPhone") Work

  </template>
<script>
import NoImg from '../assets/demo/noimage.jpg';
import PresenceConnected from '../assets/icon/presence_connected.png';
import PresenceClosed from '../assets/icon/presence_not.png';
import PresenceClosedMessage from '../assets/icon/presence_away.png';

import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';
export default {
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'contact');
    this.$store.dispatch('search', 'Ahmet');
  },
  data: function() {
    return {
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
    };
  },
  methods: {
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
    saveFavorites() {
      this.$f7.popup.close('#popupManageFavorites', true);
    },
    openContactDetailsPopup: function(contact) {
      this.contact = contact;
      console.log('selected contact ' + JSON.stringify(contact));
      if (this.contactSource === 'personal') {
        this.$f7.popup.open(popupContactDetails, true);
      } else {
        this.$f7.popup.open(popupContactDetails, true);
      }
    },
    openAddContactPopup: function() {
      this.$f7.popup.open(popupAddContact, true);
    },
    openEditContactPopup: function() {
      this.$f7.popup.close('#popupEditContact', true);
      this.$f7.popup.open('#popupAddContact', true);
    },
    openManageFavorites: function() {
      this.$f7.popup.open(popupManageFavorites, true);
    },
    onSearch: function(query, found) {
      if (query.value !== '') {
        this.$store.dispatch('search', query.value);
        console.log('search', query.value);
      }
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
    goCall: function(tab) {
      console.log(tab);
    },
    removeContact: function(contact) {
      this.$store.dispatch('removeContact', contact.entryId);
    },
    editContact: function() {
      console.log('name ' + this.firstName + this.lastName);
    },
    addContact: function(contact) {
      const newContact = {
        id: this.contacts.length,
        emailAddress: contact.email ? contact.email : null,
        fax: contact.fax ? contact.fax : null,
        firstName: contact.firstName ? contact.firstName : null,
        friendStatus: false,
        homePhone: contact.homePhone ? contact.homePhone : null,
        lastName: contact.lastName ? contact.lastName : null,
        mobilePhone: contact.mobilePhone ? contact.mobilePhone : null,
        nickname: contact.nickname ? contact.nickname : 'nickname',
        pager: contact.pager ? contact.pager : null,
        primaryContact: contact.userId ? contact.userId : null,
        userId: contact.userId ? contact.userId : null,
        username: contact.username ? contact.username : null,
        workPhone: contact.workPhone ? contact.workPhone : null,
      };
      this.$store.dispatch('addContact', newContact);
      this.$f7.popup.close('#popupAddContact', true);
    },
  },
  computed: {
    ...mapGetters(['contacts']),
    getContacts() {
      this.contacts = this.$store.state.contacts;
      let contactSource = this.$store.state.contactSource;
      if (contactSource === 'personal') {
        return this.contacts;
      } else {
        let directory = this.$store.state.directory;
        return directory;
      }
    },
    groupedContacts() {
      let contacts = this.getContacts;
      contacts.forEach(contact => {
        contact.name = contact.firstName.charAt(0);
      });
      return _.groupBy(contacts, 'name');
    },
    getContactSource() {
      this.contactSource = this.$store.state.contactSource === 'personal';
      if (this.contactSource === 'personal') {
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
  height: 50%;
}

.avatar-circle {
  border-radius: 25px;
}
</style>
