<template lang='pug'>
f7-page
  incomingCallModal
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{ $t('SETTINGS') }}
  f7-block-header {{ $t('NAME') }}
  f7-list
    f7-list-item(@click='openPopupLanguage()', :title="$t('LANGUAGE_SETTINGS')", link="")
    f7-list-item(@click='openPopupVibration()', :title="$t('VIBRATION_SETTINGS')", link="")
    f7-list-item(@click='openPopupLog()', :title="$t('LOG_SETTINGS')", link="")
    f7-list-item(@click='openPopupService()', :title="$t('SERVICE_SETTINGS')", link="")
    f7-list-item(@click='openPopupBoost()', :title="$t('BOOST_SETTINGS')", link="")
    f7-list-item(@click='openPopupCallingModeWifi()', :title="$t('CALLING_MODE_WIFI')", link="")
    f7-list-item(@click='openPopupCallingModeCellular()', :title="$t('CALLING_MODE_CELLULAR_DATA')", link="")
    f7-list-item(@click='openPopupMyMobileNumber()', :title="$t('MY_MOBILE_PHONE')", link="")
    //-f7-list-item(@click='openPopupBattery()', :title="$t('BATTERY_SETTINGS')", link="")
  f7-popup#popupVibration
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='closePopupVibration') {{ $t('BACK') }}
            .title {{ $t('VIBRATION_SETTINGS') }}
            .right.my-cursor(@click='saveVibrationSettings') {{ $t('SAVE') }}
        f7-block-title {{ $t('PREFERRED_SETTINGS') }}
        f7-list(form='')
         f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="$t('CALL_VIBRATION_MODE')")
         f7-list-item(:key='2', checkbox='', name='my-checkbox', :value='2', :title="$t('IM_VIBRATION_MODE')")
  f7-popup#popupLanguage
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='closePopupLanguage') {{ $t('BACK') }}
            .title {{ $t('LANGUAGE_SETTINGS') }}
            .right.my-cursor(@click='saveLanguageSetting') {{ $t('SAVE') }}
        f7-list(form='')
         f7-list-item.sheet-open(href="#" data-sheet=".my-sheet2" :title="$t('PREFERRED_LANGUAGE')") English
  f7-popup#popupBattery
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='closePopupBattery') {{ $t('BACK') }}
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
            .left.my-cursor(@click='closePopupLog') {{ $t('BACK') }}
            .title {{ $t('LOG_SETTINGS') }}
            .right.my-cursor(@click='saveLogSettings') {{ $t('SAVE') }}
        f7-list(form='')
         f7-list-item.sheet-open(href="#" data-sheet=".my-sheet" :title="$t('LOG_LEVEL')") {{ $t('WARN') }}
          //-a.link.sheet-open(href="#" data-sheet=".my-sheet") Sheet Open
  f7-popup#popupService
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='saveServiceSettings') {{ $t('SAVE') }}
            .title {{ $t('SERVICE_SETTINGS_TITLE') }}
            .right
        p {{ $t('SERVICE_SETTINGS_DESCRIPTION') }}
        f7-block-title {{ $t('SERVICES') }}
        f7-list(form='')
         f7-list-item(:key='1', checkbox='', name='serviceMeetme', :checked="serviceMeetme === true", @change="serviceMeetme = !serviceMeetme", :title="$t('MEETME_SERVICE')")
         f7-list-item(:key='2', checkbox='', name='serviceCallGrap', :checked="serviceCallgrap === true", @change="serviceCallgrap = !serviceCallgrap", :title="$t('CALL_GRAB_SERVICE')")
         f7-list-item(:key='2', checkbox='', name='serviceVoicemail', :checked="serviceVoicemail === true", @change="serviceVoicemail = !serviceVoicemail", :title="$t('VOICEMAIL_SERVICE')")
  f7-popup#popupBoost
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='closePopupBoost') {{ $t('SAVE') }}
            .title {{ $t('BOOST_SETTINGS') }}
        f7-block
        f7-block-header {{ $t('DESCRIPTION_CALLBOOST') }}
        p {{ $t('FIRST_STEP') }}
        f7-list(form='')
          f7-list-item.sheet-open(title="Dallas USA", link="", data-sheet=".boostList-sheet")
        p {{ $t('DESCRIPTION_SECOND') }}
        p {{ $t('THIRD_STEP') }}
  f7-popup#popupCallingModeWifi
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='closePopupCallingModeWifi') {{ $t('SAVE') }}
            .title {{ $t('CALLING_MODE_WIFI') }}
        f7-block
        f7-block-header {{ $t('CALLING_MODE_WIFI_HEAD') }}
        f7-list(form='')
          f7-list-item.sheet-open(:title="$t('CALLING_MODE')", :after="$t('ASK_EVERY_TIME')", link="", data-sheet=".calling-mode")
        p {{ $t('BLOCKED') }}
        p {{ $t('INTERNET_CONNECTION') }}
        p {{ $t('CELLULAR_CALL') }}
        p {{ $t('CALL_ME_BACK') }}
        p {{ $t('ASK_ON_EVERY_CALL') }}
  f7-popup#popupCallingModeCellular
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='closePopupCallingModeCellular') {{ $t('SAVE') }}
            .title {{ $t('CALLING_MODE_CELLULAR_DATA') }}
        f7-block
        f7-block-header {{ $t('CALLING_MODE_CELLULAR_DATA_HEAD') }}
        f7-list(form='')
          f7-list-item.sheet-open(:title="$t('CALLING_MODE')", :after="$t('ASK_EVERY_TIME')", link="", data-sheet=".calling-mode-cellular")
        p {{ $t('BLOCKED') }}
        p {{ $t('INTERNET_CONNECTION') }}
        p {{ $t('CELLULAR_CALL') }}
        p {{ $t('CALL_ME_BACK') }}
        p {{ $t('ASK_ON_EVERY_CALL') }}
  f7-popup#popupMyMobileNumber
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='saveMyMobileNumber') {{ $t('SAVE') }}
            .title {{ $t('MY_MOBILE_PHONE') }}
        f7-block
        f7-list(form='')
          f7-list-item.sheet-open(:title="$t('MY_MOBILE_PHONE')", after="8825272")
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
        f7-list(formLanguage='')
         f7-list-item(:key='1', radio='', name='language', :checked="language === 'en'", @change="language = 'en'", :title="'English'")
         f7-list-item(:key='2', radio='', name='language', :checked="language === 'fr'", @change="language = 'fr'", :title="'French'")
         f7-list-item(:key='3', radio='', name='language', :checked="language === 'pt'", @change="language = 'pt'", :title="'Portuguese'")
         f7-list-item(:key='4', radio='', name='language', :checked="language === 'es'", @change="language = 'es'", :title="'Espanol'")
  .sheet-modal.boostList
    .toolbar
      .toolbar-inner
        .left
        .right
         a.link.sheet-close.Linklarge(href="#", style="font-size: 20px") {{ $t('CANCEL') }}
    .sheet-modal-inner
        f7-list(formLanguage='')
         f7-list-item(:key='1', radio='', name='language', :checked="language === 'en'", @change="language = 'en'", title="Dallas")
         f7-list-item(:key='2', radio='', name='language', :checked="language === 'pt'", @change="language = 'pt'", title="New York")
  f7-popover
        f7-list(formLanguage2='')
         f7-list-item(:key='1', radio='', name='my-radio2', :checked='1 === 1', :value='1', :title="'English'")
         f7-list-item(:key='2', radio='', name='my-radio2', :checked='2 === 1', :value='2', :title="'French'")
  .sheet-modal.calling-mode
    .toolbar
      .toolbar-inner
        .left
        .right
         a.link.sheet-close.Linklarge(href="#", style="font-size: 20px") {{ $t('CANCEL') }}
    .sheet-modal-inner
        f7-list(formLanguage='')
         f7-list-item(:key='1', radio='', name='callingMode', :checked="callingMode === 'en'", @change="callingMode = 'none'", :title="$t('NONE')")
         f7-list-item(:key='2', radio='', name='callingMode', :checked="callingMode === 'fr'", @change="callingMode = 'voip'", :title="$t('VoIP')")
         f7-list-item(:key='3', radio='', name='callingMode', :checked="callingMode === 'pt'", @change="callingMode = 'cellular'", :title="$t('CELLULAR')")
         f7-list-item(:key='4', radio='', name='callingMode', :checked="callingMode === 'es'", @change="callingMode = 'mobile'", :title="$t('CALL_MY_FIRST_MOBILE')")
         f7-list-item(:key='5', radio='', name='callingMode', :checked="callingMode === 'es'", @change="callingMode = 'ask'", :title="$t('ASK_EVERY_CALL')")
  .sheet-modal.calling-mode-cellular
    .toolbar
      .toolbar-inner
        .left
        .right
         a.link.sheet-close.Linklarge(href="#", style="font-size: 20px") {{ $t('CANCEL') }}
    .sheet-modal-inner
        f7-list(formLanguage='')
         f7-list-item(:key='1', radio='', name='callingMode', :checked="callingMode === 'en'", @change="callingMode = 'none'", :title="$t('NONE')")
         f7-list-item(:key='2', radio='', name='callingMode', :checked="callingMode === 'fr'", @change="callingMode = 'voip'", :title="$t('VoIP')")
         f7-list-item(:key='3', radio='', name='callingMode', :checked="callingMode === 'pt'", @change="callingMode = 'cellular'", :title="$t('CELLULAR')")
         f7-list-item(:key='4', radio='', name='callingMode', :checked="callingMode === 'es'", @change="callingMode = 'mobile'", :title="$t('CALL_MY_FIRST_MOBILE')")
         f7-list-item(:key='5', radio='', name='callingMode', :checked="callingMode === 'es'", @change="callingMode = 'ask'", :title="$t('ASK_EVERY_CALL')")
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
      serviceMeetme: true,
      serviceCallgrap: true,
      serviceVoicemail: true,
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
    openPopupService: function() {
      this.$f7.popup.open(popupService, true)
    },
    openPopupBoost: function() {
      this.$f7.popup.open(popupBoost, true)
    },
    openPopupCallingModeWifi: function() {
      this.$f7.popup.open(popupCallingModeWifi, true)
    },
    openPopupCallingModeCellular: function() {
      this.$f7.popup.open(popupCallingModeCellular, true)
    },
    openPopupMyMobileNumber: function() {
      this.$f7.popup.open(popupMyMobileNumber, true)
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
    closePopupBoost: function() {
      this.$f7.popup.close(popupBoost, true)
    },
    closePopupCallingModeWifi: function() {
      this.$f7.popup.close(popupCallingModeWifi, true)
    },
    closePopupCallingModeCellular: function() {
      this.$f7.popup.close(popupCallingModeCellular, true)
    },
    saveLogSettings: function() {
    },
    saveServiceSettings: function() {
      let serviceSettings = {
        serviceMeetme: this.serviceMeetme,
        servicecallGrap: this.serviceGrap,
        serviceVoicemail: this.serviceVoicemail
      }
      this.$store.commit('SET_SERVICESHORTCUTS', 'serviceSettings');
      this.$f7.popup.close(popupService, true)
    },
    saveMyMobileNumber: function() {
      this.$f7.popup.close(popupMyMobileNumber, true)
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

.my-cursor {
  cursor: default;
}

.Linklarge {
    height: 100%;
}
</style>
