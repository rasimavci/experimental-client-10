<template lang='pug'>
f7-page
  f7-navbar(title='Not found', back-link='Back')
  f7-block(strong='')
    p Sorry
    p Requested content not found.
</template>
<script>
  export default {
    name: 'notFound'
  };
</script>