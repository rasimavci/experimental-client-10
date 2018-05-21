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
        .navbar
          .navbar-inner
            .left.cursor1(@click='closePopupVibration') Back
            .title Vibration Settings
            .right.cursor1(@click='saveVibrationSettings') Save
        f7-block-title PREFERRED SETTINGS
        f7-list(form='')
         f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Call Mode'")
         f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="'IM Mode'")
  f7-popup#popupLanguage
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.cursor1(@click='closePopupLanguage') Back
            .title Language Settings
            .right.cursor1(@click='saveLanguageSetting') Save
        f7-list(form='')
         f7-list-item.sheet-open(href="#" data-sheet=".my-sheet2" :title="'Preferred Language'") English
  f7-popup#popupBattery
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.cursor1(@click='closePopupBattery') Back
            .title Battery Settings
        f7-list(form='')
         f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Stay Connected while app is in background'")
        f7-block
          | You have the recommended setting.
  f7-popup#popupLog
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.cursor1(@click='closePopupLog') Back
            .title Log Settings
            .right.cursor1(@click='saveLogSettings') Save
        f7-list(form='')
         f7-list-item.sheet-open(href="#" data-sheet=".my-sheet" :title="'Log Level'") WARN
          //-a.link.sheet-open(href="#" data-sheet=".my-sheet") Sheet Open
  .sheet-modal.my-sheet
    .toolbar
      .toolbar-inner
        .left
        .right
          a.link.sheet-close.Linklarge(href="#") Cancel
    .sheet-modal-inner
      .block
        f7-list(form='')
         f7-list-item(:key='1', radio='', name='my-radio', :checked='1 === 1', :value='1', :title="'VERBOSE'")
         f7-list-item(:key='2', radio='', name='my-radio', :checked='2 === 1', :value='2', :title="'DEBUG'")
         f7-list-item(:key='3', radio='', name='my-radio', :checked='3 === 1', :value='3', :title="'INFO'")
         f7-list-item(:key='4', radio='', name='my-radio', :checked='4 === 1', :value='4', :title="'WARN'")
         f7-list-item(:key='5', radio='', name='my-radio', :checked='5 === 1', :value='5', :title="'ERROR'")

  .sheet-modal.my-sheet2
    .toolbar
      .toolbar-inner
        .left
        .right
          a.link.sheet-close.Linklarge(href="#") Cancel
    .sheet-modal-inner
      .block
        f7-list(form='')
         f7-list-item(:key='1', radio='', name='my-radio', :checked='1 === 1', :value='1', :title="'English'")
         f7-list-item(:key='2', radio='', name='my-radio', :checked='2 === 1', :value='2', :title="'French'")
  f7-popover
        f7-list(form='')
         f7-list-item(:key='1', radio='', name='my-radio', :checked='1 === 1', :value='1', :title="'English'")
         f7-list-item(:key='2', radio='', name='my-radio', :checked='2 === 1', :value='2', :title="'French'")   
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
    },
    closePopupLog: function() {
      this.$f7.popup.close(popupLog, true)
    },
    closePopupLanguage: function() {
      this.$f7.popup.close(popupLanguage, true)
    },
    closePopupBattery: function() {
      this.$f7.popup.close(popupBattery, true)
    },
    closePopupVibration: function() {
      this.$f7.popup.close(popupVibration, true)
    },
    saveLogSettings: function() {

    },
    saveLanguageSetting:function() {

    },
    saveVibrationSettings: function() {

    },
    saveBatterySettings: function() {

    },
  }
}
</script>
<style scoped>
li {
  cursor: default;
}

.cursor1 {
  cursor: default;
}

.Linklarge {
    height: 100%;
}
</style>
