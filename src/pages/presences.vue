<template lang="pug">
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{username}}
  f7-block-title Presence
  f7-list(form='')
    f7-list-item(:key='1', radio='', name='my-radio', :checked='fruit === 1', :value='1', :title="'Available'" @change="setPresence('0')" checked)
    f7-list-item(:key='2', radio='', name='my-radio', :checked='fruit === 1', :value='2', :title="'Busy'" @change="setPresence('1')")
    f7-list-item(:key='3', radio='', name='my-radio', :checked='fruit === 1', :value='3', :title="'On Vacation'" @change="setPresence('2')")
    f7-list-item(:key='4', radio='', name='my-radio', :checked='fruit === 1', :value='4', :title="'Away'" @change="setPresence('3')")
    f7-list-item(:key='5', radio='', name='my-radio', :checked='fruit === 1', :value='5', :title="'Out to Lunch'" @change="setPresence('4')")
    f7-list-item(:key='6', radio='', name='my-radio', :checked='fruit === 1', :value='6', :title="'Be Right Back'" @change="setPresence('5')")
    f7-list-item(:key='7', radio='', name='my-radio', :checked='fruit === 1', :value='7', :title="'Appear Offline'" @change="setPresence('6')")

  f7-block(strong='')
    f7-row.block_container
      f7-col(width='85')
        f7-button(fill='', raised='',onclick="{alert('Demo', 'Smart Office')}") About
    f7-row.block_container(tag='p')
      f7-col(width='85')
        f7-button(fill='', raised='', @click='doLogout') Logout
    f7-row.block_container(tag='p')
      f7-col(width='85')
        f7-button(fill='', raised='', popup-open='#popupSendFeedback') Send Feedback
  f7-popup#popupSendFeedback
    f7-view
      f7-page
        f7-navbar(title='Send Feeback')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block
        f7-list
          f7-list-item
            f7-label ISSUE DESCRIPTION
            f7-input(type='textarea', placeholder='Enter your feedback')
          f7-row(tag='p')
            f7-col(width='85')
              f7-button(fill='', raised='', popup-open='#popupSendFeedback') Send Feedback
</template>

<script>
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

export default {
  created: function() {
    this.username = this.$store.state.credentials.user;
  },
  data() {
    return {
      fruit: 'apple',
      username: '',
    };
  },
  computed: {
    getPresence() {
      // console.log('heyyo ' + this.$store.state.sortBy)
      // if(this.$store.state.sortBy === 'firstName') {
      // return true
      // } else {
      //   return false
      // }
      return true;
    },
  },
  methods: {
    dene: function() {
      // myApp.alert('You clicked first button!');
    },
    setPresence: function(mode) {
      this.$store.dispatch('setPresence', mode);
    },
    doLogout() {
      this.$store.dispatch('disconnect');
      let vm = this;
      this.$f7.preloader.show();
      // this.setCredentials({
      //   user: this.username,
      //   admin: true,
      //   loged: true,
      //   token: 'SOME_TOKEN'
      // })
      setTimeout(() => {
        vm.$f7.preloader.hide();
        vm.$f7router.navigate('/login');
      }, 2000);
    },
  },
};
</script>
<style scoped>
.block_container {
  margin: auto;
  width: 100%;
  padding: 5px;
  padding-top: 2px;
}
</style>
