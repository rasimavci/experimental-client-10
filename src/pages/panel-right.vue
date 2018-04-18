<template lang='pug'>
f7-page
  f7-navbar(title='', sliding='')
  f7-block-title(v-if="getPage === 'contact'") Manage
  f7-list(v-if="getPage === 'contact'")
    f7-list-item(@click="openCreateContactPopup", title='Create Contact', view='#main-view', panel-close='')
  f7-block-title(v-if="getPage === 'contact'") Sort By
  f7-list(v-if="getPage === 'contact'")
    f7-list-item(link='/about/', title='Last Name', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(link='/form/', title='First Name', view='#main-view', panel-close='')
  f7-block-title(v-if="getPage === 'contact'") Sources
  f7-list(v-if="getPage === 'contact'")
    f7-list-item(@click="setContactSource('personal')", title='Personal Addressbook', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(@click="setContactSource('global')", title='Global Addressbook', view='#main-view', panel-close='')
  f7-block-title(v-if="getPage === 'history'") Show..
  f7-list(v-if="getPage === 'history'")
    f7-list-item(link='/about/', title='Incoming Call', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(link='/form/', title='Outgoing Call', view='#main-view', panel-close='')
    f7-list-item(link='/about/', title='Missed Call', view='#main-view', panel-close='')
    f7-list-item(link='/form/', title='Message', view='#main-view', panel-close='')
    f7-list-item(link='/form/', title='Conference', view='#main-view', panel-close='')
  f7-block-title(v-if="getPage === 'messages'") View
  f7-list(v-if="getPage === 'messages'")
    f7-list-item(link='/about/', title='New', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(link='/form/', title='Saved', view='#main-view', panel-close='')
  f7-block-title(v-if="getPage === 'favorites'") Display As
  f7-list(v-if="getPage === 'favorites'")
    f7-list-item(link='/about/', title='Tiles', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(link='/form/', title='List', view='#main-view', panel-close='')
  f7-block-title(v-if="getPage === 'favorites'") Sort By
  f7-list(v-if="getPage === 'favorites'")
    f7-list-item(link='/about/', title='Last Name', view='#main-view', panel-close='')
     i.icon.material-icons.md-only check
    f7-list-item(link='/form/', title='First Name', view='#main-view', panel-close='')
</template>
<script>
export default {
  name: 'rightPanel',
  data: function() {
    return {
      showData: 'all',
    }
  },
  computed: {
      getPage() {
        console.log('heyyo ' + this.$store.state.currentPage)
        return this.$store.state.currentPage
      }
    },
  methods: {
    openCreateContactPopup: function() {
      this.$f7.popup.open(popupCreateContact, true)
    },
    setContactSource: function(source) {
    this.$store.commit("SET_CONTACTSOURCE", source);
    }
}
}
</script>
