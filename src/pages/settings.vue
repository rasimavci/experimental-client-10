<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title Settings
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='right')
  f7-block-title Application Settings
  f7-list
    f7-list-item(@click='openPopupLanguage()', title='Language Settings')
    f7-list-item(@click='openPopupVibration()', title='Vibration Settings')
    f7-list-item(@click='openPopupVibration()', title='Log Settings')
    f7-list-item(@click='openPopupBattery()', title='Battery Settings')
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
    openPopupLanguage: function() {
      this.$f7.popup.open(popupLanguage, true)
    },
    openPopupBattery: function() {
      this.$f7.popup.open(popupBattery, true)
    },
    openPopupVibration: function() {
      this.$f7.popup.open(popupVibration, true)
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
