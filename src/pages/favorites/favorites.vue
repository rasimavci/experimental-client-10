<template lang='pug'>
.page
  incomingCallModal
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{ $t('FAVORITES') }}
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:more_horiz', panel-open='right')
  .page-content
    cell-view-layout(v-if='favoritesLayout === "tiles"')
    list-view-layout(v-else)
    f7-button.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render(@click="getFavorites()") Get Favorites - Temp
</template>
<script>
import CellViewLayout from './components/cell-view-layout'
import ListViewLayout from './components/list-view-layout'
import IncomingCallModal from "../ModalIncomingCall";

import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  created: function() {
    this.$store.commit("UPDATE_CURRENTPAGE", "favorites");
  },
  data () {
    return {
    };
  },
  components: {
    incomingCallModal: IncomingCallModal,
    cellViewLayout: CellViewLayout,
    listViewLayout: ListViewLayout
  },
  methods: {
    getFavorites: function() {
      this.$store.dispatch("getFavorites");
    }
  },
  computed: {
    ...mapGetters([
      "favorites",
      "favoritesLayout"
    ])
  },
  mounted () {
    this.$nextTick(() => {
    })
  }
}
</script>

<style scoped>

</style>
