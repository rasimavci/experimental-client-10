<template lang='pug'>
.popup.popupManageFavorites1
  .view
    .page
      .navbar
        .navbar-inner
          .left.my-cursor(@click='backContactDetails') {{ $t('BACK') }}
          .title {{ $t('MANAGE_FAVS') }}
          .right.my-cursor(@click='saveFavorites') {{ $t('OK') }}
      .page-content
        f7-block
        f7-block-header {{ $t('ADD_FAVORITE_TEXT') }}
        f7-list(form='')
          f7-list-item(:key='1', checkbox='', name='checkboxChat', :checked="checkboxChat === true", @change="checkboxChat = !checkboxChat" :title="contact.primaryContact") {{ $t('CHAT') }}
          f7-list-item(:key='2', checkbox='', name='checkboxVoice', :checked="checkboxVoice === true", @change="checkboxVoice = !checkboxVoice", :title="contact.primaryContact") {{ $t('VOICE') }}
          f7-list-item(:key='3', checkbox='', name='checkboxVideo', :checked="checkboxVideo === true", @change="checkboxVideo = !checkboxVideo", :title="contact.primaryContact") {{ $t('VIDEO') }}
          f7-list-item(:key='4', checkbox='', name='checkboxWork', :checked="checkboxWork === true", @change="checkboxWork = !checkboxWork", :title="contact.workPhone") {{ $t('WORK') }}
</template>
<script>
import { mapGetters } from 'vuex';
import FavoritesService from '../../FavoritesService'
export default {
  name: 'popupManageFavorites1',
  data () {
    return {
      noImg: NoImg,
      presenceConnected: PresenceConnected,
      presenceClosed: PresenceClosed,
      presenceClosedMessage: PresenceClosedMessage
    }
  },
  computed: {
    ...mapGetters(['contactData', 'contacts'])
  },
  mounted () {
  },
  methods: {
    backFavorites() {
      this.$f7.popup.close('#popupManageFavorites', true);
    },
    saveFavorites() {
      console.log('fav ' + this.contact.primaryContact)
      console.log('fav nickname' + this.contact.nickname)
      console.log('fav ' + this.contact.primaryContact)
      console.log('checkboxChat ' + this.checkboxChat)
      this.$store.dispatch('getFavorites')
      let favItems = this.favorites
      let favItem = {}
      let found = false

        if(this.checkboxChat) {
          found = false
        favItems.forEach(favorite => {
          if (favorite.primaryContact === this.contact.primaryContact && favorite.favoriteMethod === 'CHAT') {
            found = true
          }
        });

        if(!found) {
          favItem = {
            primaryContact:this.contact.primaryContact,
            favoriteMethod: 'CHAT'
            }
          favItems.push(favItem)
        }

        }

        if(this.checkboxVoice) {
          found = false
        favItems.forEach(favorite => {
          if (favorite.primaryContact === this.contact.primaryContact && favorite.favoriteMethod === 'VOICE') {
            found = true
          }
        });

        if(!found) {
          favItem = {
            primaryContact:this.contact.primaryContact,
            favoriteMethod: 'VOICE'
            }
          favItems.push(favItem)
        }
        }

        if(this.checkboxVideo) {
          found = false
        favItems.forEach(favorite => {
          if (favorite.primaryContact === this.contact.primaryContact && favorite.favoriteMethod === 'VIDEO') {
            found = true
          }
        });
         if(!found) {
          favItem = {
            primaryContact:this.contact.primaryContact,
            favoriteMethod: 'VIDEO'
            }
          favItems.push(favItem)
        }
        }
        if(this.checkboxWork) {
          found = false
        favItems.forEach(favorite => {
          if (favorite.primaryContact === this.contact.primaryContact && favorite.favoriteMethod === 'WORK') {
            found = true
          }
        });

        if(!found) {
          favItem = {
            primaryContact:this.contact.primaryContact,
            favoriteMethod: 'WORK'
            }
          favItems.push(favItem)
        }
        }

      // instead of going through the store, I directly used favorites service
      // it can be improved by asnyc functions but I am not sure whether if its async operation.
      // this.$store.dispatch('saveFavorites', favItems)
      FavoritesService.setSpeedDialContacts(favItems)
      this.$f7.popup.close('#popupManageFavorites', true);

    },
  }
}
</script>
