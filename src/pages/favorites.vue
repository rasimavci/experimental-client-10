<template lang='pug'>
f7-page
  incomingCallModal
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{ $t('FAVORITES') }}
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:more_horiz', panel-open='right')
  f7-block
    p {{ $t('NO_FAV') }}
</template>
<script>
import IncomingCallModal from './ModalIncomingCall'
import { mapGetters } from 'vuex'
export default {
  created: function() {
    this.$store.commit("UPDATE_CURRENTPAGE", 'favorites');
  },
    components: {
    incomingCallModal: IncomingCallModal
  }
}
</script>
