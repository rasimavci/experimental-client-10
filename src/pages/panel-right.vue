<template lang='pug'>
f7-page
  f7-navbar(title='', sliding='')
  f7-block-title(v-if="currentPage === 'contact'") {{ $t('MANAGE') }}
  f7-list(v-if="currentPage === 'contact'")
    f7-list-item.my-class(@click="openCreateContactPopup", :title="$t('CREATE_CONTACT')", view='#main-view', panel-close='')
  f7-block-title(v-if="currentPage === 'contact'") {{ $t('SORT_BY') }}
  f7-list(v-if="currentPage === 'contact'")
    f7-list-item.my-class(@click="setSortBy('lastName')", :title="$t('SORT_LAST_NAME')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="!getSortBy") check
    f7-list-item.my-class(@click="setSortBy('firstName')", :title="$t('SORT_FIRST_NAME')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="getSortBy") check
  f7-block-title(v-if="currentPage === 'contact'") Sources
  f7-list(v-if="currentPage === 'contact'")
    f7-list-item.my-class(@click="setContactSource('personal')", :title="$t('PERSONAL_ADDRESSBOOK')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="getContactSource") check
    f7-list-item.my-class(@click="setContactSource('global')", :title="$t('GLOBAL_ADDRESSBOOK')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="!getContactSource") check
  f7-block-title(v-if="currentPage === 'history'") {{ $t('SHOW') }}
  f7-list(v-if="currentPage === 'history'")
    f7-list-item(@click="setLogType('outgoing')", :title="$t('INCOMING_CALL')", view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(@click="setLogType('outgoing')", :title="$t('OUTGOING_CALL')", view='#main-view', panel-close='')
    f7-list-item(@click="setLogType('missed')", :title="$t('MISSED_CALL')", view='#main-view', panel-close='')
    f7-list-item(@click="setLogType('message')", :title="$t('INSTANT_MESSAGES')", view='#main-view', panel-close='')
    f7-list-item(@click="setLogType('conference')", :title="$t('CONFERENCE')", view='#main-view', panel-close='')
  f7-block-title(v-if="currentPage === 'messages'") View
  f7-list(v-if="currentPage === 'messages'")
    f7-list-item(@click="setLogType('outgoing')", title='New', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(@click="setLogType('outgoing')", title='Saved', view='#main-view', panel-close='')
  f7-block-title(v-if="currentPage === 'favorites'") {{ $t('DISPLAY_AS') }}
  f7-list(v-if="currentPage === 'favorites'")
    f7-list-item(@click="setLogType('outgoing')", title='Tiles', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(@click="setLogType('outgoing')", title='List', view='#main-view', panel-close='')
  f7-block-title(v-if="currentPage === 'favorites'") {{ $t('SORT_BY') }}
  f7-list(v-if="currentPage === 'favorites'")
    f7-list-item(@click="setLogType('outgoing')", title='Last Name1', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(@click="setLogType('outgoing')", title='First Name1', view='#main-view', panel-close='')
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'rightPanel',
  data: function() {
    return {
      showData: 'all',
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
    setContactSource: function(source) {
    this.$store.commit("SET_CONTACTSOURCE", source);
    },
    setSortBy: function(source) {
    this.$store.commit("SET_SORTBY", source);
    },
    setLogType: function(type) {
    this.$store.commit("SET_LOGTYPE", source);
    }
}
}
</script>

<style>
.my-class {
  cursor: default;
}
</style>
