<template lang='pug'>
f7-page
  f7-navbar(title='Left Panel')
  f7-block-title ravci
  f7-list
    f7-list-item(link='/about/', title='About', view='#main-view', panel-close='')
    f7-list-item(link='/form/', title='Form', view='#main-view', panel-close='')
    f7-list-item(media="<img src='../../assets/demo/backspace_blue.png'>", link='/call/', title='Call', view='#main-view', panel-close='')
    f7-list-item(link='/newMessage/', title='newMessage', view='#main-view', panel-close='')
    f7-list-item(link='/contact/', title='Contact', view='#main-view', panel-close='')
    f7-list-item(link='/form/', title='Form', view='#main-view', panel-close='')
    f7-list-item(link='/presences/', title='Presences', view='#main-view', panel-close='')
    f7-list-item(link='/history/', title='History', view='#main-view', panel-close='')
    f7-list-item(badge="3" link='/message/', title='Inbox', view='#main-view', panel-close='')
    f7-list-item(link='/dialpad/', title='Dialpad', view='#main-view', panel-close='')
    f7-list-item(link='/sessions/', title='Sessions', view='#main-view', panel-close='')
    f7-list-item(link='/collaboration/', title='Collaboration', view='#main-view', panel-close='')
    f7-list-item(link='/settings/', title='Settings', view='#main-view', panel-close='')
</template>
<script>
export default {
  name: 'leftPanel'
}
</script>
