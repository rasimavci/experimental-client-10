<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title Contacts
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='right')
  f7-button(fill='', raised='', popup-open='#popupAddContact') Add Contact
   f7-col(width='50')
  f7-button(fill='', raised='', popup-open='#popupAddContact') Edit Contact
   f7-col(width='50')
  
  f7-searchbar(disable-link-text="Cancel" search-container="#searchList" placeholder="Search in items" :clear-button="true" @searchbar:search="onSearch" @searchbar:enable="onEnable" @searchbar:disable="onDisable" @searchbar:clear="onClear")
  f7-list.searchbar-not-found
   f7-list-item(title="No contacts found")
  f7-list.searchbar-found(id='searchList')
   f7-list-item(v-for='contact in contacts' :key="contact.entryId", v-show='isSearch', @click='openContactDetailsPopup(contact)' :title="contact.firstName + ' ' + contact.lastName" href="#popupAddContact")

  f7-list.date(v-for='(groups, key) in groupedContacts' :key="key", v-show='!isSearch')
   h5 {{key}}
   f7-list
    f7-list-item(v-for="contact in groups" @click='openContactDetailsPopup(contact)' :key="contact.entryId" :title="contact.firstName + ' ' + contact.lastName" href="#popupAddContact")
      
  f7-popup#popupContactDetails
    f7-view
      f7-page
        f7-navbar(title='Contact Details')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block
          | Please fill contact details.
        f7-block-title Form Example
        f7-list(form='')
          f7-list-item
            f7-label Name
            f7-input(type='text', value="contact.firstName") {{contact.firstName}} {{contact.lastName}}
          f7-list-item
            f7-label E-mail
            f7-input(type='email', placeholder='E-mail') {{contact.email}}
          f7-list-item
            f7-label Mobile
            f7-input(type='mobile', placeholder='mobile') {{contact.mobilePhone}}
          f7-list-item
            f7-label Home
            f7-input(type='home', placeholder='home') {{contact.homePhone}}
          f7-list-item
            f7-label Phone
            f7-input(type='tel', placeholder='Phone') {{contact.workPhone}}
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
  f7-popup#popupAddContact
    f7-view
      f7-page
        f7-navbar(title='Add Contact')
          f7-nav-right
            f7-link(popup-close='') Close
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
  f7-popup#popupEditContact
    f7-view
      f7-page
        f7-navbar(title='Edit Contact')
          f7-nav-right
            f7-link(popup-close='') Close
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
  f7-popup#popupCreateContact
    f7-view
      f7-page
        f7-navbar(title='Create Profile')
          f7-nav-right
            f7-link(popup-close='') Save
          f7-nav-left
            f7-link(popup-close='') Back
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
  </template>
<script>
import { mapState, mapGetters } from 'vuex';
import _ from 'lodash'
export default {
  created: function() {
    this.$store.commit("UPDATE_CURRENTPAGE", 'contact');
  },
  data: function() {
    return {
      contact: '',
      showData: 'all',
      isSearch: false
    }
  },
  methods: {
    openContactDetailsPopup: function(contact) {
      this.contact = contact
      // this.$store.dispatch('UPDATE_SELECTEDCONTACT', 'contact')
      console.log('contact ' + contact.firstName)
      this.$f7.popup.open(popupContactDetails, true)
    },
    openAddContactPopup: function() {
      this.$f7.popup.open(popupAddContact, true)
    },
    openEditContactPopup: function() {
      this.$f7.popup.open(popupEditContact, true)
    },
    onSearch: function(query, found) {
      console.log('search', query);
    },
    onClear: function(event) {
      console.log('clear');
    },
    onEnable: function(event) {
      this.isSearch = true
      console.log('enable');
    },
    onDisable: function(event) {
      this.isSearch = false
      console.log('disable');
    },
    goCall: function(event) {
    },
  },
  on: {
    search(sb, query, previousQuery) {
      console.log(JSON.stringify(query) + ' 1written in search box');
      console.log(JSON.stringify(sb) + ' written in search box');
      console.log(query, previousQuery);
    },
        clear() {
      console.log('cleared');
    }
  },
  computed: {
    ...mapGetters(['contacts']),
    getContacts() {
      if (this.showdata === 'all') {
        // console.log(this.$store.state.contacts)
        // this.list = this.$store.state.contacts
        return this.$store.state.contacts
      } else if (this.showdata === 'filtered') {
        return this.$store.state.contacts.filter(note => note.firstName.startsWith(this.filterWord))
      } else if (this.$store.state.contactSource === 'global') {
        console.log('global was selected')
        return this.$store.state.directory.filter(note => note.firstName.startsWith(this.filterWord))
      } else {
        return this.$store.state.contacts
      }
    }, // x.charAt(0)
    groupedContacts() {
      let contacts = this.getContacts // this.$store.state.vux.history
      contacts.forEach(contact => {
        contact.name = contact.firstName.charAt(0)
      })
      return _.groupBy(contacts, 'name')
    }
  }
}
</script>
