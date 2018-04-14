<template lang='pug'>
f7-list-item
  //- img(:src='contact.photoUrl', alt='Avatar')
  p {{message.parts[0].text}}
  span.time-right {{moment(message.timestamp).calendar()}}
</template>

<script>
import Moment from 'moment'
import NoImg from '../assets/demo/noimage.jpg'
export default {
  name: 'rightChatBubble',
  props: {
    message: {
      type: Object,
      required: true
    },
    contact: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      noImg: NoImg,
      moment: Moment
    }
  }
}
</script>

<style scoped>

</style>
