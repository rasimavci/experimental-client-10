<template lang='pug'>
f7-page
  incomingCallModal
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{ $t('HISTORY') }}
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:more_horiz', panel-open='right')
  //-f7-searchbar(cancel-link="Cancel" placeholder="Search in history" :clear-button="true")
  f7-list.dateX(v-for='(groups, key) in groupedLogs' :key="key")
   h5 {{key}}
   f7-list
      ul
        li.my-cursor(style="font-size: 14px", v-for="group in groups" @click='goCall(group)')
          .item-content
            .item-media
              img.avatar-circle(:src="group.photoUrl || noImg" width="44")
            .item-inner
              .item-title-row
                .item-title {{group.callerName}}
              .item-subtitle {{group.date1}}
              i.icon.material-icons.md-only(v-if="group.direction === 'outgoing'") call_made
              i.icon.material-icons.md-only(v-if="group.direction === 'incoming'") call_received
              i.icon.material-icons.md-only(v-if="group.direction === 'missed'") call_missed
              i.icon.material-icons.md-only(v-if="group.direction === 'inbox'") inbox
              i.icon.material-icons.md-only(v-if="group.direction === 'conference'") supervisor_account
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';
import { find } from 'lodash/fp';
import Routes from '../routes.js';
import NoImg from '../assets/demo/noimage1.jpg';
import IncomingCallModal from './ModalIncomingCall'
export default {
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'history');
  },
  data: function() {
    return {
      showData: 'all',
      noImg: NoImg,
    };
  },
      components: {
    incomingCallModal: IncomingCallModal
  },
  methods: {
    goCall(log) {
      let contacts = this.contacts
      //let primaryContact = this.conversationId;
      const contact = this.$_.find(contacts, c => {
        return c.primaryContact === log.callerDisplayNumber;
      });
      this.$store.commit('SET_PARTICIPANT', contact.firstName + ' ' + contact.lastName);
      this.$store.commit('SET_CALLEE', log.callerDisplayNumber);
      this.$store.commit('SET_STARTCALL', true);
      this.$store.commit('SET_ACTIVECALLTAB', 'audio');
      this.$f7router.navigate('/call');
    },
    openContactDetailsPopup: function() {
      this.$f7.popup.open(popupContactDetails, true);
    },
    openAddContactPopup: function() {
      this.$f7.popup.open(popupAddContact, true);
    },
    openEditContactPopup: function() {
      this.$f7.popup.open(popupEditContact, true);
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
    ...mapGetters(['contacts','historyType']),
    getContact(callerDisplayNumber) {
      // if (this.showdata === 'all') {
      let contacts = this.$store.state.contacts;
      // this.list = this.$store.state.contacts
      let contact = _.find(
        c => c.primaryContact === callerDisplayNumber,
        contacts
      );
      return contact.photoUrl;
    },
    getCallLogs() {
      // if (this.$store.state.historyFilterSelection === 'All Call') {
      // console.log(this.$store.state.history);
      let hist = _.cloneDeep(this.$store.state.history);
      let contacts = _.cloneDeep(this.$store.state.contacts);
      var contact = '';
      hist.forEach(log => {
        contacts.forEach(contact => {
          if (contact.primaryContact === log.callerDisplayNumber) {
            log.photoUrl = contact.photoUrl;
            log.callerName = contact.firstName + ' ' + contact.lastName
            console.log('log photo url' + log.photoUrl);
          }
        });
        // contact = find(function(c) {
        //   c.primaryContact === log.callerDisplayNumber;
        // }, contacts);
        // console.log('contact' + contact)
        // log.photoUrl = contact.photoUrl;
      });
      // this.list = this.$store.state.contacts



      if (!this.historyType.incoming) {
        hist = hist.filter(note => note.direction !=='incoming')
      }
      if (!this.historyType.outgoing) {
        hist = hist.filter(note => note.direction !=='outgoing')
      }
      if (!this.historyType.missed) {
        hist = hist.filter(note => note.direction !=='missed')
      }
      if (!this.historyType.message) {
        hist = hist.filter(note => note.direction !=='message')
      }
      if (!this.historyType.conference) {
        hist = hist.filter(note => note.direction !=='conference')
      }
      return hist
    },
    groupedLogs() {
      let history = this.getCallLogs; // this.$store.state.vux.history
      history.forEach(log => {
        log.date1 = moment(parseInt(log.startTime)).format('h:mm:ss a');
        log.date = moment(parseInt(log.startTime)).format('MMMM Do YYYY');
      });
      return _.groupBy(history, 'date');
    },
  },
};
</script>
<style scoped>
.dateX {
  /* width: 17%; */
  padding: 0% 1% 0 0;
  /* float: left; */
}

.dateX h3 {
  font-size: 1.5em;
}

.dateX p {
  font-size: 0.8em;
}

.avatar-circle {
  border-radius: 25px;
}
</style>
