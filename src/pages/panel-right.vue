<template lang='pug'>
f7-page
  f7-navbar(title='', sliding='')
  f7-block-title(v-if="currentPage === 'contact'") Manage
  f7-list(v-if="currentPage === 'contact'")
    f7-list-item.my-class(@click="openCreateContactPopup", title='Create Contact', view='#main-view', panel-close='')
  f7-block-title(v-if="currentPage === 'contact'") Sort By
  f7-list(v-if="currentPage === 'contact'")
    f7-list-item.my-class(@click="setSortBy('lastName')", title='Last Name', view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="!getSortBy") check
    f7-list-item.my-class(@click="setSortBy('firstName')", title='First Name', view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="getSortBy") check
  f7-block-title(v-if="currentPage === 'contact'") Sources
  f7-list(v-if="currentPage === 'contact'")
    f7-list-item.my-class(@click="setContactSource('personal')", title='Personal Addressbook', view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="getContactSource") check
    f7-list-item.my-class(@click="setContactSource('global')", title='Global Addressbook', view='#main-view', panel-close='')
     i.icon.material-icons.md-only(v-if="!getContactSource") check
  f7-block-title(v-if="currentPage === 'history'") Show..
  f7-list(v-if="currentPage === 'history'")
    f7-list-item(@click="setLogType('outgoing')", title='Incoming Call', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(@click="setLogType('outgoing')", title='Outgoing Call', view='#main-view', panel-close='')
    f7-list-item(@click="setLogType('missed')", title='Missed Call', view='#main-view', panel-close='')
    f7-list-item(@click="setLogType('message')", title='Message', view='#main-view', panel-close='')
    f7-list-item(@click="setLogType('conference')", title='Conference', view='#main-view', panel-close='')
  f7-block-title(v-if="currentPage === 'messages'") View
  f7-list(v-if="currentPage === 'messages'")
    f7-list-item(@click="setLogType('outgoing')", title='New', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(@click="setLogType('outgoing')", title='Saved', view='#main-view', panel-close='')
  f7-block-title(v-if="currentPage === 'favorites'") Display As
  f7-list(v-if="currentPage === 'favorites'")
    f7-list-item(@click="setLogType('outgoing')", title='Tiles', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(@click="setLogType('outgoing')", title='List', view='#main-view', panel-close='')
  f7-block-title(v-if="currentPage === 'favorites'") Sort By
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
