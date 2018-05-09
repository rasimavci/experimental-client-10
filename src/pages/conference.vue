<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title Collaboration
  .button-containerX
    f7-button.col.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render(raised='', fill='') START COLLABORATION
    //-f7-button.col(big round open-popup='#popup') START COLLABORATION
  f7-block(strong='')
    p You can also send an automated invitation
</template>

<script>
export default {};
</script>

<style scoped>
.button-containerX {
  margin: 15px;
}
</style>
