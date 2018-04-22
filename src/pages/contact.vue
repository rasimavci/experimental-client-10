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
              img(:src="contact.photoUrl" width="44")
            .item-inner
              .item-title-row
                .item-title {{contact.firstName}} {{contact.lastName}}
              .item-subtitle Personal
  f7-popup#popupContactDetails
    f7-view
      f7-page
        f7-navbar(title='Contact Details')
          f7-nav-right
            f7-link(popup-close='', @click='openEditContactPopup()') Edit
          f7-nav-left
            f7-link(popup-close='') Back            
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
          f7-list-item(@click='goCall()', title='Remove From Contacts List')            
          f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Show Presence Status'")        
  f7-popup#popupAddContact
    f7-view
      f7-page
        f7-navbar(title='Add Contact')
          f7-nav-right
            f7-link(popup-close='') Add
          f7-nav-left
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
        f7-navbar
          f7-nav-right
            f7-link(popup-close='', @click='editContact()') Save
          f7-nav-left
            f7-link(popup-close='') Back
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
            f7-input(type='text', placeholder='contact.firstName') {{contact.firstName}}
          f7-list-item
            f7-label Last Name*
            f7-input(:value='name1' @input="name1 = $event.target.value", type='text', placeholder='contact.firstName') {{contact.lastName}}            
          f7-list-item
            f7-label Nickname
            f7-input(type='text', placeholder='contact.firstName') {{contact.nickname}}            
          f7-list-item
            f7-label User Id
            f7-input(type='url', placeholder='URL') {{contact.primaryContact}}            
          f7-list-item
            f7-label E-mail
            f7-input(type='email', placeholder='E-mail') {{contact.emailAddress}}
        f7-block
        f7-block-title CONTACT
        f7-list(form='')
          f7-list-item
            f7-label Home
            f7-input(type='tel', placeholder='Home') {{contact.homePhone}}
          f7-list-item
            f7-label Mobile
            f7-input(type='tel', placeholder='Mobile') {{contact.mobilePhone}}
          f7-list-item
            f7-label Work
            f7-input(type='tel', placeholder='Work') {{contact.workPhone}}
        f7-block
        f7-block-title SETTINGS
        f7-list(form='')        
            f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Show Presence Status'")                    
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
  f7-popup#popupManageFavorites
    f7-view
      f7-page
        f7-navbar(title='Manage Favorites')
          f7-nav-right
            f7-link(popup-close='') Back
          f7-nav-left
            f7-link(popup-close='') Ok            
        f7-block
        f7-list(form='')
          f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="contact.primaryContact") Chat
          f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="contact.primaryContact") Voice
          f7-list-item(:key='3', checkbox='', name='my-checkbox', :value='3', :title="contact.primaryContact") Video
          f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="contact.workPhone") Work

  </template>
<script>
import { mapState, mapGetters } from 'vuex';
import _ from 'lodash'
export default {
  created: function() {
    this.$store.commit("UPDATE_CURRENTPAGE", 'contact');
    this.$store.dispatch('search', 'Ahmet')
  },
  data: function() {
    return {
      contact: '',
      showData: 'all',
      isSearch: false,
      name1: '',
      contactSource: 'personal'
    }
  },
  methods: {
    openContactDetailsPopup: function(contact) {
      this.contact = contact
      // console.log(JSON.stringify(contact))
      // this.$store.dispatch('UPDATE_SELECTEDCONTACT', 'contact')
      console.log('contact ' + contact.firstName)
      if(this.contactSource === 'personal') {
      this.$f7.popup.open(popupContactDetails, true)        
      } else {
      this.$f7.popup.open(popupAddContact, true)
      }

    },
    openAddContactPopup: function() {
      this.$f7.popup.open(popupAddContact, true)
    },
    openEditContactPopup: function() {
      this.$f7.popup.open(popupEditContact, true)
    },
    openManageFavorites: function() {
      this.$f7.popup.open(popupManageFavorites, true)
    },    
    onSearch: function(query, found) {
      if(query.value !== ''){
      this.$store.dispatch('search', query.value)
      console.log('search', query.value);      
      }
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
    goCall: function(tab) {
       console.log(tab);
    },
    editContact: function() {
    console.log('name' + this.name1)
    },
  },
  on: {
    search(sb, query, previousQuery) {
    // this.$store.dispatch('search')
      // console.log(JSON.stringify(query) + ' 1written in search box');
      // console.log(JSON.stringify(sb) + ' written in search box');
      // console.log(query, previousQuery);
    },
        clear() {
      console.log('cleared');
    }
  },
  computed: {
    ...mapGetters(['contacts', ]),
    getContacts2() {
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

    getContacts() {
      let contactSource = this.$store.state.contactSource
      console.log('contactSource' + contactSource)
      if (contactSource === 'personal') {
        // console.log(this.$store.state.contacts)
        // this.list = this.$store.state.contacts
        return this.$store.state.contacts
      } else {
        let directory = this.$store.state.directory
          return directory
      }
    }, // x.charAt(0)    
    groupedContacts() {
      let contacts = this.getContacts // this.$store.state.vux.history
      contacts.forEach(contact => {
        contact.name = contact.firstName.charAt(0)
      })
      return _.groupBy(contacts, 'name')
    },
    getContactSource() {
      this.contactSource = this.$store.state.contactSource ==='personal'
      // this.contactSource = style
      if(this.contactSource ==='personal'){
      return true
      } else {
        return false
      }

    }
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
  width: 100%
  }

  .imgSize {
    height: 50%
  }
</style>