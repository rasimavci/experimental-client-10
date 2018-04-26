<template lang='pug'>
f7-page
  f7-navbar(link='/about/', title='ravci')
    i.icon.material-icons.md-only account_box
  f7-list#navList
    f7-list-item.no-icon(link='/about/', title='About', view='#main-view', panel-close='')
    f7-list-item(link='/form/', title='Form', view='#main-view', panel-close='')
    f7-list-item(link='/call/', title='Call', view='#main-view', panel-close='')
      i.icon.material-icons.md-only.test-icon-left phone
    f7-list-item(link='/presences/', title='Presences', view='#main-view', panel-close='')
    f7-list-item(link='/favorites/', title='Favorites', view='#main-view', panel-close='')
     i.icon.material-icons.md-only star_border
    f7-list-item(link='/contact/', title='Contact', view='#main-view', panel-close='')
     i.icon.material-icons.md-only contacts
    f7-list-item(link='/history/', title='History', view='#main-view', panel-close='')
     i.icon.material-icons.md-only access_time
    f7-list-item(badge="3" link='/message/', title='Inbox', view='#main-view', panel-close='')
     i.icon.material-icons.md-only.test-icon-left inbox
    f7-list-item(link='/dialpad/', title='Dialpad', view='#main-view', panel-close='')
     i.icon.material-icons.md-only phone
    f7-list-item(link='/sessions/', title='Sessions', view='#main-view', panel-close='')
     i.icon.material-icons.md-only content_copy
    f7-list-item(link='/conference/', title='Conference', view='#main-view', panel-close='')
     i.icon.material-icons.md-only supervisor_account
    f7-list-item(link='/settings/', title='Settings', view='#main-view', panel-close='')
     i.icon.material-icons.md-only settings
</template>
<script>
export default {
  name: 'leftPanel',
};
</script>

<style>
.panelColor2 {
  background-color: #336666;
}

.panelColor {
  background-color: #0099ff;
}

/* .leftit {
  alig: left
} */
</style>
