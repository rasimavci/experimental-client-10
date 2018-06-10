<template lang='pug'>
f7-page
  incomingCallModal
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{ $t('CONFERENCE') }}
  .button-containerX
    f7-button.col.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render(raised='', fill='') {{ $t('START_MY_CONFERENCE_NOW') }}
    //-f7-button.col(big round open-popup='#popup') START COLLABORATION
  f7-block(strong='')
  p {{ $t('CONFERENCE_INVITATION_TITLE') }}
  f7-list(form='')
    f7-list-item(:title="$t('SEND_AN_EMAIL')")
  f7-block
  p {{ $t('CONFERENCE_CONNECTION_TITLE') }}
  f7-list(form='')
    f7-list-item(:title="$t('URL')", subtitle="https:pa.nuvia")
  f7-list(form='')
    f7-list-item(:title="$t('CONFERENCE_INVITE_MEETME_ACCESS_CODE')", after="882572")
</template>

<script>
import IncomingCallModal from './ModalIncomingCall'
export default {
components: {
    incomingCallModal: IncomingCallModal
  },
};
</script>

<style scoped>
.button-containerX {
  margin: 15px;
}
</style>
