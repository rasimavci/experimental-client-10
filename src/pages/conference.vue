<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title Collaboration
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='right')
  f7-button.col(raised='', fill='') START COLLABORATION
  f7-button(big round open-popup='#popup') START COLLABORATION
  f7-block(strong='')
    p You can also send an automated invitation
</template>

<script>
export default {}
</script>
