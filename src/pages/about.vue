<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title Settings
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='right')
  f7-block(strong='')
    p Smart Office
    p
      | You can go
      f7-link(back='') back
      | .
    p
      | Version Number 4.0.0
    p
      | Platform: Web/Mobile.
</template>

<script>
export default {
  name: 'about'
}
</script>
