<template lang='pug'>
f7-page
  incomingCallModal
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{ $t('SETTINGS') }}
  f7-block-title {{ $t('NAME') }}
  f7-list
    f7-list-item(@click='openPopupLanguage()', :title="$t('LANGUAGE_SETTINGS')")
    f7-list-item(@click='openPopupVibration()', :title="$t('VIBRATION_SETTINGS')")
    f7-list-item(@click='openPopupLog()', :title="$t('LOG_SETTINGS')")
    f7-list-item(@click='openPopupBattery()', :title="$t('BATTERY_SETTINGS')")
  f7-popup#popupVibration
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.cursor1(@click='closePopupVibration') {{ $t('BACK') }}
            .title {{ $t('VIBRATION_SETTINGS') }}
            .right.cursor1(@click='saveVibrationSettings') {{ $t('SAVE') }}
        f7-block-title {{ $t('PREFERRED_SETTINGS') }}
        f7-list(form='')
         f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="$t('CALL_VIBRATION_MODE')")
         f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="$t('IM_VIBRATION_MODE')")
  f7-popup#popupLanguage
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.cursor1(@click='closePopupLanguage') {{ $t('BACK') }}
            .title {{ $t('LANGUAGE_SETTINGS') }}
            .right.cursor1(@click='saveLanguageSetting') {{ $t('SAVE') }}
        f7-list(form='')
         f7-list-item.sheet-open(href="#" data-sheet=".my-sheet2" :title="$t('PREFERRED_LANGUAGE')") English
  f7-popup#popupBattery
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.cursor1(@click='closePopupBattery') {{ $t('BACK') }}
            .title {{ $t('BATTERY_SETTINGS') }}
        f7-list(form='')
         f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="$t('BATTERY_OPTIMIZATION')")
        f7-block
          | {{ $t('BATTERY_OPTIMIZATION_REQUIRED_DISABLE') }}
  f7-popup#popupLog
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.cursor1(@click='closePopupLog') {{ $t('BACK') }}
            .title {{ $t('LOG_SETTINGS') }}
            .right.cursor1(@click='saveLogSettings') {{ $t('SAVE') }}
        f7-list(form='')
         f7-list-item.sheet-open(href="#" data-sheet=".my-sheet" :title="$t('LOG_LEVEL')") WARN
          //-a.link.sheet-open(href="#" data-sheet=".my-sheet") Sheet Open
  .sheet-modal.my-sheet
    .toolbar
      .toolbar-inner
        .left
        .right
          a.link.sheet-close.Linklarge(href="#", style="font-size: 20px") {{ $t('CANCEL') }}
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
         a.link.sheet-close.Linklarge(href="#", style="font-size: 20px") {{ $t('CANCEL') }}
    .sheet-modal-inner
      .block
        f7-list(formLanguage='')
         f7-list-item(:key='1', radio='', name='language', :checked="language === 'en'", @change="language = 'en'", :title="'English'")
         f7-list-item(:key='2', radio='', name='language', :checked="language === 'pt'", @change="language = 'pt'", :title="'Portuguese'")
         f7-list-item(:key='3', radio='', name='language', :checked="language === 'es'", @change="language = 'es'", :title="'Espanol'")
         f7-list-item(:key='4', radio='', name='language', :checked="language === 'fr'", @change="language = 'fr'", :title="'French'")
  f7-popover
        f7-list(formLanguage2='')
         f7-list-item(:key='1', radio='', name='my-radio2', :checked='1 === 1', :value='1', :title="'English'")
         f7-list-item(:key='2', radio='', name='my-radio2', :checked='2 === 1', :value='2', :title="'French'")
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import IncomingCallModal from './ModalIncomingCall'

export default {
  created: function() {
    this.$store.commit("UPDATE_CURRENTPAGE", 'settings');
  },
  data: function() {
    return {
      showData: 'all',
      language: 'english'
    }
  },
  components: {
    incomingCallModal: IncomingCallModal
  },
  methods: {


    onChange: function(ev){
    console.log('changed to ' + ev)
   //console.log($$(ev.currentTarget).val());
},

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
        this.$i18n.set(this.language)
      console.log('selected language ' + this.language)
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
