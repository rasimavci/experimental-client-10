<template lang='pug'>
.cell-view-container
  .row.no-gap
    .col-50.col-box-style
      .row
        .col-30.img-col
          img.avatar-circle(:src="phoneImg" width="34")
        .col-70.txt-col
          p {{ $t('MEETME_SERVICE') }}
          p.gray Service
    .col-50.col-box-style
      .row
        .col-30.img-col
          img.avatar-circle(:src="phoneImg" width="34")
        .col-70.txt-col
          p {{ $t('CALL_GRAB_SERVICE') }}
          p.gray Service
  .row.no-gap
    .col-50.col-box-style
      .row
        .col-30.img-col
          img.avatar-circle(:src="phoneImg" width="34")
        .col-70.txt-col
          p {{ $t('VOICEMAIL_SERVICE') }}
          p.gray Service
    .col-50.col-box-style
      .row
        .col-30.img-col
          img.avatar-circle(:src="phoneImg" width="34")
        .col-70.txt-col
          p Dont know whats goes here
          p.gray Service
</template>

<script>
import PhoneImg from "../../../assets/demo/call_outline_blue.png";
export default {
  name: 'cellView',
  data () {
    return {
      phoneImg: PhoneImg
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.col-box-style {
  border: 1px solid gray;
}
.img-col {
  height: 100%;
  font-size: 50px;
}
.txt-col p {
  margin: 0;
  margin-top: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.txt-col gray {
  color: gray;
}
</style>
