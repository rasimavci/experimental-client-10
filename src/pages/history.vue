<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title History
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:more_horiz', panel-open='right')
  f7-searchbar(cancel-link="Cancel" placeholder="Search in call logs" :clear-button="true")
  f7-list.date(v-for='(groups, key) in groupedLogs' :key="key")
   h5 {{key}}
   f7-list
    f7-list-item(v-for="group in groups" @click='goCall(group)' :key="group.name" :title="group.callerName + ' ' + group.date1" href="#popupAddContact")
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment'
import _ from 'lodash'
import Routes from '../routes.js'

export default {
  created: function() {
    this.$store.commit("UPDATE_CURRENTPAGE", 'history');
  },
  data: function() {
    return {
      showData: 'all',
    }
  },
  methods: {
    goCall(logrecord) {
      console.log('go call page for ' + logrecord.callerDisplayNumber)
      const params = {
        callee: 'saynaci@genband.com',
        mode: false
      }
      //this.$store.dispatch('call', params)
      Routes.push('call')
    },
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
      // if (this.showdata === 'all') {
      console.log(this.$store.state.history)
      // this.list = this.$store.state.contacts
      return this.$store.state.history
      // } else if (this.showdata === 'filtered') {
      //   return this.$store.state.history.filter(note => note.firstName.startsWith(this.filterWord))
      // } else if (this.showdata === 'Global Addressbook') {
      //   console.log('global selected')
      //   return this.$store.state.history.filter(note => note.firstName.startsWith(this.filterWord))
      // } else {
      //   return this.$store.state.history
      // }
    },
    getCallLogs() {
      // if (this.$store.state.historyFilterSelection === 'All Call') {
      console.log(this.$store.state.history)
      return this.$store.state.history
      // } else if (this.$store.state.historyFilterSelection === 'Incoming Call') {
      //   return this.$store.state.history.filter(note => note.direction === 'incoming')
      // } else if (this.$store.state.historyFilterSelection === 'Outgoing Call') {
      //   return this.$store.state.history.filter(note => note.direction === 'outgoing')
      // } else if (this.$store.state.historyFilterSelection === 'Missed Call') {
      //   return this.$store.state.history.filter(note => note.direction === 'missed')
      // }
    },
    groupedLogs() {
      let history = this.getCallLogs // this.$store.state.vux.history
      history.forEach(log => {
        log.date1 = moment(parseInt(log.startTime)).format('h:mm:ss a')
        log.date = moment(parseInt(log.startTime)).format('MMMM Do YYYY')
      })
      return _.groupBy(history, 'date')
    }
  }
}
</script>
<style>
.date {
  /* width: 17%; */
  padding: 0% 1% 0 0;
  /* float: left; */
}

.date h3 {
  font-size: 1.5em;
}

.date p {
  font-size: .8em;
}
</style>
