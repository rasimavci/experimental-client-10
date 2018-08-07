<template lang='pug'>
f7-list
   f7-list
      ul
        li.my-cursor
          .item-content
            .item-media
              img.avatar-circle(:src="phoneImg" width="34")
            .item-inner
              .item-title-row
                .item-title {{ $t('MEETME_SERVICE') }}
              .item-subtitle Service
        li.my-cursor(v-if="serviceShortcuts.serviceCallGrap")
          .item-content
            .item-media
              img.avatar-circle(:src="phoneImg" width="34")
            .item-inner
              .item-title-row
                .item-title {{ $t('CALL_GRAB_SERVICE') }}
              .item-subtitle Service
        li.my-cursor(v-if="serviceShortcuts.serviceVoicemail")
          .item-content
            .item-media
              img.avatar-circle(:src="phoneImg" width="34")
            .item-inner
              .item-title-row
                .item-title {{ $t('VOICEMAIL_SERVICE') }}
              .item-subtitle Service
        li.my-cursor(v-for='favorite in getFavorites' :key="favorite.entryId", @click="goCallPage(favorite.favoriteMethod)")
          .item-content
            .item-media
              img.avatar-circle(:src="favorite.photoUrl || noImg" width="44")
            .item-inner
              .item-title-row
                .item-title {{favorite.fullName}}
              .item-subtitle {{favorite.favoriteMethod}}
              i.icon.material-icons.md-only(v-if="favorite.favoriteMethod === 'CHAT'") inbox
              i.icon.material-icons.md-only(v-if="favorite.favoriteMethod === 'VOICE'") phone_in_talk
              i.icon.material-icons.md-only(v-if="favorite.favoriteMethod === 'VIDEO'") call_missed
              i.icon.material-icons.md-only(v-if="favorite.favoriteMethod === 'WORK'") videocam
              i.icon.material-icons.md-only(v-if="favorite.favoriteMethod === 'MOBILE'") phone_in_talk
</template>

<script>
import PhoneImg from "../../../assets/demo/call_outline_blue.png";
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'listViewLayout',
  data () {
    return {
      phoneImg: PhoneImg
    }
  },
  computed: {
    ...mapGetters([
      'favorites',
      'contacts',
      'sortFavorites',
      'serviceShortcuts'
    ]),
    getFavorites() {
      let favs = this.favorites;
      let contacts = this.contacts;
      let sortBy = this.sortFavorites;
      let contact = "";
      favs.forEach(favorite => {
        contacts.forEach(contact => {
          if (contact.primaryContact === favorite.primaryContact) {
            favorite.photoUrl = contact.photoUrl;
            favorite.fullName = contact.firstName + " " + contact.lastName;
            favorite.firstName = contact.firstName;
            favorite.lastName = contact.lastName;
          }
        });

        if (sortBy === "firstName") {
          favs = _.sortBy(favs, [
            function(o) {
              return o.firstName;
            }
          ]);
        } else {
          favs = _.sortBy(favs, [
            function(o) {
              return o.lastName;
            }
          ]);
        }
      })
      return favs;
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'setActiveCallTab',
      'setCallee',
      'setStartCall'
    ]),
    goCallPage: function(mode) {
      this.$f7.popup.close("#popupContactDetails", true);
      this.setActiveCallTab(mode)
      this.setCallee(this.contact.id);
      if (mode !== "chat") {
        this.setStartCall(true)
      }
      setTimeout(() => {
        this.$f7router.navigate("/history");
        this.$f7router.navigate("/call");
      }, 100);
    }
  }
}
</script>

<style scoped>
</style>
