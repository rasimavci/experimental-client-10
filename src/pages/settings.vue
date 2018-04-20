<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title Settings
  f7-block-title Application Settings
  f7-list
    f7-list-item(@click='openPopupLanguage()', title='Language Settings')
    f7-list-item(@click='openPopupVibration()', title='Vibration Settings')
    f7-list-item(@click='openPopupLog()', title='Log Settings')
    f7-list-item(@click='openPopupBattery()', title='Battery Settings')
  f7-popup#popupVibration
    f7-view
      f7-page
        f7-navbar(title='Vibration Settings')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block-title PREFERRED SETTINGS
        f7-list(form='')
         f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Call Mode'")
         f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="'IM Mode'")
  f7-popup#popupLanguage
    f7-view
      f7-page
        f7-navbar(title='Language Settings')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block
          | PLease select the language you prefer.
  f7-popup#popupBattery
    f7-view
      f7-page
        f7-navbar(title='Battery Settings')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-list(form='')
         f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Stay Connected while app is in background'")
        f7-block
          | You have the recommended setting.
  f7-popup#popupVibration
    f7-view
      f7-page
        f7-navbar(title='Vibration Settings')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block-title PREFERRED SETTINGS
        f7-list(form='')
         f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Call Mode'")
         f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="'IM Mode'")
  f7-popup#popupLog
    f7-view
      f7-page
        f7-navbar(title='Log Settings')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-list(form='')
         f7-list-item(:key='1', radio='', name='my-radio', :checked='1 === 1', :value='1', :title="'BASIC'")
         f7-list-item(:key='2', radio='', name='my-radio', :checked='2 === 1', :value='2', :title="'DETAILED'")
         f7-list-item(:key='3', radio='', name='my-radio', :checked='3 === 1', :value='3', :title="'VERBOSE'")
</template>


<script>
import { mapState, mapGetters } from 'vuex';
export default {
  created: function() {
    this.$store.commit("UPDATE_CURRENTPAGE", 'settings');
  },
  data: function() {
    return {
      showData: 'all',
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
    openPopupLog: function() {
      this.$f7.popup.open(popupLog, true)
    }
  }
}
</script>
