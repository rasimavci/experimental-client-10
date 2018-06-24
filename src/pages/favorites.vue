<template lang='pug'>
f7-page
  incomingCallModal
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{ $t('FAVORITES') }}
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:more_horiz', panel-open='right')
      //- f7-block
      //-   p {{ $t('NO_FAV') }}
  .list(v-if="favoritesLayout==='tiles'")
   ul
     li
       a.item-link.item-content(href="#")
         .item-inner.item-cell
           .item-row
             .item-cell {{ $t('MEETME_SERVICE') }}
              //-i.icon.material-icons.md-only phone_in_talk
              img.avatar-circle(:src="phoneImg" width="34")
             .item-cell {{ $t('CALL_GRAB_SERVICE') }}
              //-i.icon.material-icons.md-only phone_in_talk
              img.avatar-circle(:src="phoneImg" width="34")
           .item-row
             .item-cell {{ $t('VOICEMAIL_SERVICE') }}
              //-i.icon.material-icons.md-only phone_in_talk
              img.avatar-circle(:src="phoneImg" width="34")
             .item-cell Cell 2-2
              //-i.icon.material-icons.md-only phone_in_talk
              img.avatar-circle(:src="phoneImg" width="34")
           .item-row(v-for='favorite in getFavorites1' :key="favorite.entryId")
             .item-cell {{ favorite.fullName }} {{ favorite.favoriteMethod }}
               .item-row
                 .item-content
                  .item-media
                    img.avatar-circle(:src="noImg" width="44")
             .item-cell(style="text-transform:capitalize") {{ favorite.fullName }} {{ favorite.favoriteMethod }}
               .item-row
                 .item-content
                  .item-media
                    img.avatar-circle(:src="noImg" width="44")
  f7-list(v-if="favoritesLayout !=='tiles'")
   f7-list
      ul
        li.my-cursor
          .item-content
            .item-media
              //-i.icon.material-icons.md-only phone_in_talk
              img.avatar-circle(:src="phoneImg" width="34")
            .item-inner
              .item-title-row
                .item-title {{ $t('MEETME_SERVICE') }}
              .item-subtitle Service
        li.my-cursor
          .item-content
            .item-media
              //-i.icon.material-icons.md-only phone_in_talk
              img.avatar-circle(:src="phoneImg" width="34")
            .item-inner
              .item-title-row
                .item-title {{ $t('CALL_GRAB_SERVICE') }}
              .item-subtitle Service
        li.my-cursor
          .item-content
            .item-media
              //-i.icon.material-icons.md-only phone_in_talk
              img.avatar-circle(:src="phoneImg" width="34")
            .item-inner
              .item-title-row
                .item-title {{ $t('VOICEMAIL_SERVICE') }}
              .item-subtitle Service
        li.my-cursor(v-for='favorite in getFavorites1' :key="favorite.entryId", @click="goCallPage(favorite.favoriteMethod)")
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

  f7-button.this-is-why-i-use-f7-components-and-not-f7vuecomponents-f7vuecomponents-are-created-AFTER-render(@click="getFavorites()") Get Favorites - Temp
</template>
<script>
import IncomingCallModal from './ModalIncomingCall'
import NoImg from '../assets/demo/noimage.jpg';
import PhoneImg from '../assets/demo/call_outline_blue.png';
import _ from 'lodash';
import { mapGetters } from 'vuex'
export default {
  created: function() {
    this.$store.commit("UPDATE_CURRENTPAGE", 'favorites');
  },
  data: function() {
    return {
      noImg: NoImg,
      phoneImg: PhoneImg
    }
  },
    components: {
    incomingCallModal: IncomingCallModal
  },
  methods: {
    getFavorites: function() {
      this.$store.dispatch('getFavorites')
  },
    goCallPage: function(mode) {
      this.$f7.popup.close('#popupContactDetails', true);
      this.$store.commit('SET_ACTIVECALLTAB', mode);
      this.$store.commit('SET_CALLEE', this.contact.id);
      if(mode !== 'chat'){
      this.$store.commit('SET_STARTCALL', true);
      }
      setTimeout(() => {
        this.$f7router.navigate('/history');
        this.$f7router.navigate('/call');
      }, 100);
    },
},
  computed: {
    ...mapGetters(['contacts', 'conversations', 'favorites', 'favoritesLayout']),
    getFavorites1() {
      let favs = this.$store.state.favorites
      let contacts = this.$store.state.contacts;
      let sortBy = this.$store.state.sortFavorites;

      var contact = '';
      favs.forEach(favorite => {
        contacts.forEach(contact => {
          if (contact.primaryContact === favorite.primaryContact) {
            favorite.photoUrl = contact.photoUrl;
            favorite.fullName = contact.firstName + ' ' + contact.lastName
            favorite.firstName = contact.firstName
            favorite.lastName = contact.lastName
          }
        });

        if (sortBy === 'firstName') {
          favs = _.sortBy(favs, [
            function(o) {
              return o.firstName;
            },
          ]);
        } else {
          favs = _.sortBy(favs, [
            function(o) {
              return o.lastName;
            },
          ]);
        }

        // contact = find(function(c) {
        //   c.primaryContact === log.callerDisplayNumber;
        // }, contacts);
        // console.log('contact' + contact)
        // log.photoUrl = contact.photoUrl;
      });
      return favs // this.$store.state.sessions;
    }
}
}
</script>
