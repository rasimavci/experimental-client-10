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
  f7-searchbar(cancel-link="Cancel" placeholder="Search in contacts" :clear-button="true")
  f7-list
   f7-list-item(v-for="group in getContacts" @click='openContactDetailsPopup()' :key="group.name" :title="group.firstName + ' ' + group.lastName" href="#popupAddContact")
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data: function() {
    return {
      showData: 'all',
      contacts1: {
        'A': [
          'Aaron',
          'Abbie',
          'Adam',
          'Adele',
          'Agatha',
          'Agnes',
          'Albert',
          'Alexander'
        ],
        'B': [
          'Bailey',
          'Barclay',
          'Bartolo',
          'Bellamy',
          'Belle',
          'Benjamin'
        ],
        'C': [
          'Caiden',
          'Calvin',
          'Candy',
          'Carl',
          'Cherilyn',
          'Chester',
          'Chloe'
        ],
        'V': [
          'Vladimir'
        ]
      }
    }
  },
  methods: {
    openContactDetailsPopup: function() {
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
      console.log('enable');
    },
    onDisable: function(event) {
      console.log('disable');
    },
  },
  computed: {
    ...mapGetters(['contacts']),
    getContacts() {
      if (this.showdata === 'all') {
        console.log(this.$store.state.contacts)
        // this.list = this.$store.state.contacts
        return this.$store.state.contacts
      } else if (this.showdata === 'filtered') {
        return this.$store.state.contacts.filter(note => note.firstName.startsWith(this.filterWord))
      } else if (this.showdata === 'Global Addressbook') {
        console.log('global selected')
        return this.$store.state.directory.filter(note => note.firstName.startsWith(this.filterWord))
      } else {
        return this.$store.state.contacts
      }
    },
    getContacts1() {
      // return this.contacts
      return {
        'A': [
          'Aaron',
          'Abbie',
          'Adam',
          'Adele',
          'Agatha',
          'Agnes',
          'Albert',
          'Alexander'
        ],
        'B': [
          'Bailey',
          'Barclay',
          'Bartolo',
          'Bellamy',
          'Belle',
          'Benjamin'
        ],
        'C': [
          'Caiden',
          'Calvin',
          'Candy',
          'Carl',
          'Cherilyn',
          'Chester',
          'Chloe'
        ],
        'V': [
          'Vladimir'
        ]
      }
    }
  }
}
</script>
