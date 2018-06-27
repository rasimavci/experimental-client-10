<template lang='pug'>
f7-page
  f7-navbar(title='', sliding='')
  f7-block-header(v-if="currentPage === 'contact'") {{ $t('MANAGE') }}
  f7-list(v-if="currentPage === 'contact'", no-hairlines-between="")
    f7-list-item.my-cursor(@click="openCreateContactPopup", :title="$t('CREATE_CONTACT')", view='#main-view', panel-close='')
  f7-block-header(v-if="currentPage === 'contact'") {{ $t('SORT_BY') }}
  f7-list(v-if="currentPage === 'contact'", no-hairlines-between="")
    f7-list-item.my-cursor(@click="setSortBy('lastName')", :title="$t('SORT_LAST_NAME')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="!getSortBy") check
    f7-list-item.my-cursor(@click="setSortBy('firstName')", :title="$t('SORT_FIRST_NAME')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="getSortBy") check
  f7-block-header(v-if="currentPage === 'contact'") Sources
  f7-list(v-if="currentPage === 'contact'", no-hairlines-between="")
    f7-list-item.my-cursor(@click="setContactSource('personal')", :title="$t('PERSONAL_ADDRESSBOOK')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="getContactSource") check
    f7-list-item.my-cursor(@click="setContactSource('global')", :title="$t('GLOBAL_ADDRESSBOOK')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="!getContactSource") check
  f7-block-header(v-if="currentPage === 'history'") {{ $t('SHOW') }}
  f7-list(v-if="currentPage === 'history'", no-hairlines-between="")
    f7-list-item(@click="setHistoryType('incoming')", :title="$t('INCOMING_CALL')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="incoming") check
    f7-list-item(@click="setHistoryType('outgoing')", :title="$t('OUTGOING_CALL')", view='#main-view', panel-close='')
      i.icon.material-icons.md-only(v-if="outgoing") check
    f7-list-item(@click="setHistoryType('missed')", :title="$t('MISSED_CALL')", view='#main-view', panel-close='')
      i.icon.material-icons.md-only(v-if="missed") check
    f7-list-item(@click="setHistoryType('message')", :title="$t('INSTANT_MESSAGES')", view='#main-view', panel-close='')
      i.icon.material-icons.md-only(v-if="message") check
    f7-list-item(@click="setHistoryType('conference')", :title="$t('CONFERENCE')", view='#main-view', panel-close='')
      i.icon.material-icons.md-only(v-if="conference") check
  f7-block-header(v-if="currentPage === 'messages'") View
  f7-list(v-if="currentPage === 'messages'", no-hairlines-between="")
    f7-list-item(@click="setLogType('outgoing')", :title="$t('CAPTION_NEW')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(@click="setLogType('outgoing')", :title="$t('CAPTION_SAVED')", view='#main-view', panel-close='')
  f7-block-header(v-if="currentPage === 'favorites'") {{ $t('MANAGE') }}
    f7-list(no-hairlines-between)
      f7-list-item.my-cursor(@click="openServiceShortcutsPopup()", :title="$t('SERVICE_SHORTCUTS')", view='#main-view', panel-close='')
  f7-list(v-if="currentPage === 'favorites'", no-hairlines-between="")
    f7-list-item(@click="setFavoritesLayout('tiles')", :title="$t('TILES')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="tiles") check
    f7-list-item(@click="setFavoritesLayout('list')", :title="$t('LIST')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="!tiles") check
  f7-block-header(v-if="currentPage === 'favorites'") {{ $t('SORT_BY') }}
  f7-list(v-if="currentPage === 'favorites'", no-hairlines-between="")
    f7-list-item(@click="setSortFavorite('firstName')", :title="$t('FIRST_NAME')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="sortFavorites === 'firstName'") check
    f7-list-item(@click="setSortFavorite('lastName')", :title="$t('LAST_NAME')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="sortFavorites === 'lastName'") check
  f7-popup#popupServiceShortcuts
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='closeServiceShortcutsPopup') {{ $t('BACK') }}
            .title {{ $t('SERVICE_SHORTCUTS') }}
            .right
        f7-block-header {{ $t('SERVICES') }}
        f7-list(form='')
         f7-list-item(href="#", :title="$t('MEETME_SERVICE')")
          i.icon.material-icons.md-only phone_in_talk
         f7-list-item(href="#", :title="$t('CALL_GRAB_SERVICE')")
          i.icon.material-icons.md-only phone_in_talk
         f7-list-item(href="#", :title="$t('VOICEMAIL_SERVICE')")
          span.badge.color-red 5
        p {{ $t('SERVICE_SHORTCUTS_INFO') }}
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'rightPanel',
  data: function() {
    return {
      showData: 'all',
      outgoing: true,
      incoming: true,
      missed: true,
      message: true,
      conference: true,
      tiles: true,
      sortFavorites: 'firstName'
    }
  },
  computed: {
  ...mapGetters(['currentPage']),
      currentPage() {
        return this.$store.state.currentPage
      },
      getContactSource() {
        if(this.$store.state.contactSource === 'personal') {
        return true
        } else {
          return false
        }

      },
      getSortBy() {
        if(this.$store.state.sortBy === 'firstName') {
        return true
        } else {
          return false
        }

      }
    },
  methods: {
    openCreateContactPopup: function() {
      this.$f7.popup.open(popupCreateContact, true)
    },
    openServiceShortcutsPopup: function() {
      this.$f7.popup.open(popupServiceShortcuts, true)
    },
    closeServiceShortcutsPopup: function() {
      this.$f7.popup.close(popupServiceShortcuts, true)
    },
    setContactSource: function(source) {
    this.$store.commit("SET_CONTACTSOURCE", source);
    },
    setSortBy: function(source) {
    this.$store.commit("SET_SORTBY", source);
    },
    setLogType: function(type) {
    this.$store.commit("SET_LOGTYPE", source);
    },
    setHistoryType: function(type) {
    if(type == 'outgoing') {
      this.outgoing = !this.outgoing
    } else if (type == 'incoming') {
      this.incoming = !this.incoming
    } else if (type == 'missed') {
      this.missed = !this.missed
    } else if (type == 'message') {
      this.message = !this.message
    } else if (type == 'conference') {
      this.conference = !this.conference
    }
    let type1 = {
      incoming: this.incoming,
      outgoing: this.outgoing,
      missed: this.missed,
      message: this.message,
      conference: this.conference
    }
    this.$store.commit("SET_HISTORYTYPE", type1);

    },
    setFavoritesLayout: function(layout) {
      this.tiles = !this.tiles
    this.$store.commit("SET_FAVORITESLAYOUT", layout);
    },
    setSortFavorite: function(sort) {
      this.sortFavorites = sort
    this.$store.commit("SET_SORTFAVORITES", sort);
    },
}
}
</script>

<style>
</style>
