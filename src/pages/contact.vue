<template lang='pug'>
f7-page
  incomingCallModal
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title {{ $t('CONTACTS') }}
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:more_horiz', panel-open='right')
      f7-list-index(indexes="auto" list-el="#contacts-list" :scroll-list="true" :label="true" @listindex:select="onIndexSelect")
    //- f7-list#contacts-list(contacts-list="")
    //-   f7-list-group(v-for='(groups, key) in groupedContacts')
    //-     f7-list-item(v-for="contact in groups", :title="contact.firstName + ' ' + contact.lastName" group-title="")
  //- f7-tabs
  //-   f7-tab#tab-1(tab-active="")
  //-   f7-tab#tab-2
  //-   f7-tab#tab-3
    // Switch Between Tabs
  //- f7-segmented
  //-   f7-button(style="text-transform:capitalize", tab-link="#tab-1" tab-link-active="", @click="setContactSource('personal')") {{ $t('PERSONAL') }}
  //-   f7-button(style="text-transform:capitalize", tab-link="#tab-2", @click="setContactSource('global')") {{ $t('GLOBAL_STARTBIG') }}
  //-   f7-button(style="text-transform:capitalize", tab-link="#tab-3", @click="setContactSource('mobile')") {{ $t('MOBILE') }}
  .block
    p.segmented(ref='segmentedButtonContainer')
      button.button.button-active(@click="setContactSource('personal')") {{ $t('PERSONAL') }}
      button.button(@click="setContactSource('global')") {{ $t('GLOBAL_STARTBIG') }}
      button.button(@click="setContactSource('mobile')") {{ $t('MOBILE') }}
  f7-searchbar(v-if="contactSource === 'mobile'", disable-link-text="Cancel" search-container="#searchList" :placeholder="$t('SEARCH_IN_MOBILE')" :clear-button="true" @searchbar:search="onSearch" @searchbar:enable="onEnable" @searchbar:disable="onDisable" @searchbar:clear="onClear")
  f7-searchbar(v-if="contactSource === 'personal'", disable-link-text="Cancel" search-container="#searchList" :placeholder="$t('SEARCH_IN_CONTACTS')" :clear-button="true" @searchbar:search="onSearch" @searchbar:enable="onEnable" @searchbar:disable="onDisable" @searchbar:clear="onClear")
  p(v-if="contactSource === 'global'") {{ $t('MIN_SEARCH_CRITERIA') }}
  f7-searchbar(v-if="contactSource === 'global'", custom-search=true, disable-link-text="Cancel" :placeholder="$t('SEARCH_IN_DIRECTORY')" :clear-button="true" @searchbar:search="onSearch" @searchbar:enable="onEnable" @searchbar:disable="onDisable" @searchbar:clear="onClear")
  f7-list.searchbar-not-found
   f7-list-item(title="No contacts found")
  f7-list.searchbar-found(v-show='getContactSource', id='searchList')
   f7-list-item(v-for='contact in getContacts' :key="contact.entryId", v-show='isSearch', @click='openContactDetailsPopup(contact)' :title="contact.firstName + ' ' + contact.lastName")
  f7-list(v-show='!getContactSource')
   f7-list-item.my-cursor(v-for='contact in foundItems' :key="contact.entryId", v-show='isSearch', @click='openContactDetailsPopup(contact)' :title="contact.firstName + ' ' + contact.lastName")
  f7-list(media-list="")
   f7-list-group.date(v-for='(groups, key) in groupedContacts' :key="key", v-show='!isSearch')
    f7-list-item(:title="key" group-title="")
    f7-list-item.my-cursor(v-for="contact in groups", :key="key", :title="contact.firstName + ' ' + contact.lastName", after="personal", @click='openContactDetailsPopup(contact)')
     //-.item-content
     //-.item-media
     img.avatar-circle.test-icon-left(:src="contact.photoUrl || noImg" slot="media", width="44")
  //-  //-h5 {{key}}
  //-  f7-list(media-list="")
  //-     ul
  //-       li.my-cursor(v-for="contact in groups" @click='openContactDetailsPopup(contact)', oncontextmenu="openContextMenuPopup()",)
  //-         .item-content
  //-           .item-media
  //-             img.avatar-circle(:src="contact.photoUrl || noImg" width="44")
  //-             //- img(:src='presenceConnected', v-if='contact.presence.status === "open"')
  //-             //- img(:src='presenceClosed', v-if='contact.presence.status === "closed"')
  //-           .item-inner
  //-             .item-title-row
  //-               .item-title {{contact.firstName}} {{contact.lastName}}
  //-               .item-subtitle {{ $t('PERSONAL') }}
  //-             //- img(:src='presenceConnected')
  f7-popup#popupAddContact
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='backAddContact') {{ $t('BACK') }}
            .title
            .right.my-cursor(@click='openEditContactPopup()') {{ $t('ADD') }}
        .flex
          .flex2
            img(src="../assets/demo/avatar_generic.png" width="150" height="150")
          .flex.column
            .flex
             h3  {{contact.firstName}} {{contact.lastName}}
            .flex
             img.imgSize(src="../assets/demo/call_outline_blue.png" @click="callTypeSelection($t('SELECT_MODE'), $t('CHANGE_DEFAULT_MODE'), $t('CALL_MY_FIRST_MOBILE'), $t('CELLULAR'), $t('VoIP'))")
             img.imgSize(src="../assets/demo/video_outline_blue.png" hspace="20" @click="goCallPage('video')")
             div(hspace="20")
             img.imgSize(src="../assets/demo/bubble-clipart-chat-box-15d.png" @click="goCallPage('chat')")
        f7-block
        f7-block-title {{ $t('CONTACT_DETAIL') }}
        f7-list(form='')
          f7-list-item
            f7-label {{ $t('HOME') }}
            f7-input(type='tel', :value='contact.homePhone')
          f7-list-item
            f7-label {{ $t('MOBILE') }}
            f7-input(type='tel', :value='contact.mobilePhone')
          f7-list-item
            f7-label {{ $t('WORK') }}
            f7-input(type='tel', :value='contact.workPhone')
          f7-list-item
            f7-label {{ $t('NICKNAME') }}
            f7-input(type='text', :value='contact.nickname')
          f7-list-item
            f7-label {{ $t('USER_ID') }}
            f7-input(type='url', :value='contact.userId')
          f7-list-item
            f7-label {{ $t('EMAIL') }}
            f7-input(type='email', :value='contact.email')
        f7-block
        f7-block-title {{ $t('SETTINGS_BIG') }}
        f7-list(form='')
          f7-list-item(@click='openManageFavorites()', :title="$t('MANAGE_FAVS')")
  f7-popup#popupEditContact
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='backEditContact') {{ $t('BACK') }}
            .title {{ $t('EDIT_PROFILE') }}
            .right.my-cursor(@click='addContact(contact)') {{ $t('SAVE') }}
        .flex
          .flex2
            img(src="../assets/demo/avatar_generic.png" width="150" height="150")
          .flex.column
            .flex
             h3  {{contact.firstName}} {{contact.lastName}}
        f7-block
        f7-block-title {{ $t('IDENTIFICATION') }}
        f7-list(form='')
          f7-list-item
            f7-label {{ $t('FIRST_NAME') }}*
            f7-input(:value='firstName' @input="firstName = $event.target.value",type='text')
          f7-list-item
            f7-label {{ $t('LAST_NAME') }}*
            f7-input(:value='lastName' @input="lastName = $event.target.value", type='text')
          f7-list-item
            f7-label Nickname
            f7-input(type='text', :value='contact.nickname')
          f7-list-item
            f7-label {{ $t('USER_ID') }}
            f7-input(type='url', :value='contact.userId')
          f7-list-item
            f7-label E-mail
            f7-input(type='email', :value='contact.email')
        f7-block
        f7-block-title {{ $t('CONTACT_DETAIL') }}
        f7-list(form='')
          f7-list-item
            f7-label {{ $t('HOME') }}
            f7-input(type='tel', :value='contact.homePhone')
          f7-list-item
            f7-label {{ $t('MOBILE') }}
            f7-input(type='tel', :value='contact.mobilePhone')
          f7-list-item
            f7-label {{ $t('WORK') }}
            f7-input(type='tel', :value='contact.workPhone')
        f7-block
        f7-block-title {{ $t('SETTINGS_BIG') }}
        f7-list(form='')
            f7-list-item(:key='1', checkbox='', name='my-checkbox', :value='1', :title="'Show Presence Status'")
  f7-popup#popupCreateContact
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backProfile') {{ $t('BACK') }}
            .title {{ $t('ADD_PROFILE') }}
            .right(@click='saveProfile') {{ $t('SAVE') }}
        f7-block
        f7-block-title IDENTIFICATION
        f7-list(form='')
          f7-list-item
            f7-label {{ $t('FIRST_NAME') }}
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label {{ $t('LAST_NAME') }}
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label {{ $t('NICKNAME') }}
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label User ID*
            f7-input(type='tel', placeholder='id')
          f7-list-item
            f7-label {{ $t('EMAIL') }}
            f7-input(type='email', placeholder='E-mail')
        f7-block
        f7-block-title CONTACT
        f7-list(form='')
          f7-list-item
            f7-label Home*
            f7-input(type='tel', placeholder='Phone')
          f7-list-item
            f7-label Mobile*
            f7-input(type='tel', placeholder='Phone')
          f7-list-item
            f7-label Work*
            f7-input(type='tel', placeholder='Phone')
        f7-block
        f7-block-title SETTINGS
        f7-list(form='')
          f7-list-item(title='Show Presence Status')
            f7-toggle(slot='after')
  f7-popup#popupManageFavorites
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='backFavorites') {{ $t('BACK') }}
            .title {{ $t('MANAGE_FAVS') }}
            .right.my-cursor(@click='saveFavorites') {{ $t('OK') }}
        f7-block
        f7-block-header {{ $t('ADD_FAVORITE_TEXT') }}
        f7-list(form='')
          f7-list-item(:key='1', checkbox='', name='checkboxChat', :checked="checkboxChat === true", @change="checkboxChat = !checkboxChat" :title="contact.primaryContact") {{ $t('CHAT') }}
          f7-list-item(:key='2', checkbox='', name='checkboxVoice', :checked="checkboxVoice === true", @change="checkboxVoice = !checkboxVoice", :title="contact.primaryContact") {{ $t('VOICE') }}
          f7-list-item(:key='3', checkbox='', name='checkboxVideo', :checked="checkboxVideo === true", @change="checkboxVideo = !checkboxVideo", :title="contact.primaryContact") {{ $t('VIDEO') }}
          f7-list-item(:key='4', checkbox='', name='checkboxWork', :checked="checkboxWork === true", @change="checkboxWork = !checkboxWork", :title="contact.workPhone") {{ $t('WORK') }}
  f7-popup#popupContextMenu
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left(@click='backProfile') {{ $t('BACK') }}
            .title Context Menu
            .right(@click='saveProfile') {{ $t('SAVE') }}
        f7-block
        f7-block-title {{ $t('IDENTIFICATION') }}
        f7-list(form='')
  f7-popup#popupDefaultMode
    f7-view
      f7-page
        .navbar
          .navbar-inner
            .left.my-cursor(@click='backDefaultMode') {{ $t('SAVE') }}
            .title {{ $t('CALLING_MODE_WIFI') }}
        f7-block
        f7-block-title
        p {{ $t('CALLING_MODE_WIFI_HEAD') }}
        f7-list(form='')
          f7-list-item.sheet-open(:title="$t('CALLING_MODE')", :after="$t('ASK_EVERY_TIME')", link="", data-sheet=".defaultMode-sheet")
        p {{ $t('BLOCKED') }}
        p {{ $t('INTERNET_CONNECTION') }}
        p {{ $t('CELLULAR_CALL') }}
        p {{ $t('CALL_ME_BACK') }}
        p {{ $t('ASK_ON_EVERY_CALL') }}
  .sheet-modal.transferTo-sheet
    .toolbar(title="deneme1")
      .toolbar-inner.center
        .right
          a.link.sheet-close.center(href="#") {{ $t('TRANSFERRING') }}
    .sheet-modal-inner
      .block
        f7-list(form='')
         f7-list-item.center.sheet-close(:title="$t('DIALER')", @click='goDialpad()')
         f7-list-item.center(:title="$t('CONTACTS')")
  .sheet-modal.defaultMode-sheet
    .toolbar(title="deneme1")
      .toolbar-inner
        .left
        .right
          a.link.sheet-close(href="#", style="font-size: 20px") {{ $t('CANCEL') }}
    .sheet-modal-inner
        f7-list(form='')
         f7-list-item.center.sheet-close(:title="$t('NONE')", @click='goDialpad()')
         f7-list-item.center(:title="$t('VoIP')")
         f7-list-item.center.sheet-close(:title="$t('CELLULAR')", @click='goDialpad()')
         f7-list-item.center(:title="$t('CALL_MY_FIRST_MOBILE')")
         f7-list-item.center(:title="$t('ASK_EVERY_TIME')")
  </template>
<script>
import NoImg from '../assets/demo/noimage.jpg';
import PresenceConnected from '../assets/icon/presence_connected.png';
import PresenceClosed from '../assets/icon/presence_not.png';
import PresenceClosedMessage from '../assets/icon/presence_away.png';
import IncomingCallModal from './ModalIncomingCall'
import { mapState, mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

export default {
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'contact');
    // this.$store.dispatch('search', 'Ahmet');
  },
  data: function() {
    return {
      checkboxChat: false,
      checkboxVoice: false,
      checkboxVideo: false,
      checkboxWork: false,
      foundItems: [],
      contacts: [],
      noImg: NoImg,
      presenceConnected: PresenceConnected,
      presenceClosed: PresenceClosed,
      presenceClosedMessage: PresenceClosedMessage,
      contact: '',
      showData: 'all',
      isSearch: false,
      id: null,
      firstName: null,
      lastName: null,
      nickname: null,
      mobilePhone: null,
      userId: null,
      username: null,
      emailAddress: null,
      homePhone: null,
      workPhone: null,
      fax: null,
      pager: 'netas',
      friendStatus: false,
      primaryContact: null,
      // contactSource: '',
    }
  },
  components: {
    incomingCallModal: IncomingCallModal
  },
  methods: {
    ...mapActions(['setContactData']),
    joinCall: function() {
      console.log('join started')
    },
    setContactSource (source) {
      let el = this.$refs.segmentedButtonContainer.getElementsByTagName('button')
      _.forEach(el, b => {b.classList.remove('button-active')})
      event.target.classList.add('button-active')
      this.$store.commit("SET_CONTACTSOURCE", source);
    },
    onIndexSelect() {
      console.log('list index clicked')
    },
    backAddContact() {
      this.$f7.popup.close('#popupAddContact', true);
    },
    backEditContact() {
      this.$f7.popup.close('#popupEditContact', true);
    },
    backProfile() {
      this.$f7.popup.close('#popupCreateContact', true);
    },
    saveProfile() {
      this.$f7.popup.close('#popupCreateContact', true);
    },
    backFavorites() {
      this.$f7.popup.close('#popupManageFavorites', true);
    },
    backDefaultMode() {
      this.$f7.popup.close('#popupDefaultMode', true);
    },
    saveFavorites() {
      console.log('fav ' + this.contact.primaryContact)
      console.log('fav nickname' + this.contact.nickname)
      console.log('fav ' + this.contact.primaryContact)
      console.log('checkboxChat ' + this.checkboxChat)
      //"{"saynaci@genband.com":{"id":"6","nickname":"Sevda","primaryContact":"saynaci@genband.com","firstName":"Sevda","lastName":"AYNACI","photoUrl":"https://pa-ucc.genband.com/pa/direct/pictureServlet?user=saynaci@genband.com","emailAddress":"saynaci@NETAS.com.tr","homePhone":null,"mobilePhone":null,"workPhone":"8825272","friendStatus":false,"conferenceURL":null,"groupList":null,"fax":null,"pager":null,"type":{"addressbook":true},"presence":"icon-presence_offline sl-presence_unavailablenote","presenceOrder":"4"}}"
      // let that = this
      // let fav = {
      //   this.contact.primaryContact:{
      //     id:6,
      //     nickname: that.contact.nickname,
      //     primaryContact: this.contact.primaryContact,
      //     firstName: this.contact.firstName,
      //     lastName: this.contact.lastName,
      //     photoUrl: this.contact.phoroUrl
      //     emailAddress: 'saynaci@NETAS.com.tr',
      //     homePhone: null,
      //     mobilePhone: null,
      //     workPhone: 8825272,
      //     friendStatus: false,
      //     conferenceURL: null,
      //     groupList: null,
      //     fax: null,
      //     pager: null,
      //     type:{
      //       addressbook:true
      //       presence: 'icon-presence_offline sl-presence_unavailablenote',
      //       presenceOrder:4
      //       }
      //   }
//"[,{"primaryContact":"haci@genband.com","favoriteMethod":"VOICE"},{"primaryContact":"haci@genband.com","favoriteMethod":"VIDEO"}]"
       // {"primaryContact":"haci@genband.com","favoriteMethod":"CHAT"}
        //let favItems = []

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

      this.$store.dispatch('saveFavorites', favItems)
      this.$f7.popup.close('#popupManageFavorites', true);

    },
    openContactDetailsPopup (contact) {
      this.contact = contact;
      this.setContactData( _.cloneDeep(contact))
      let contactSource1 = this.$store.state.contactSource;
      console.log('selected contact ' + JSON.stringify(contact));
      if (contactSource1 === 'personal') {
        this.$f7.popup.open('.popupContactDetails', true);
      } else {
        this.$f7.popup.open(popupAddContact, true);
      }
    },
    openAddContactPopup: function() {
      this.$f7.popup.open(popupAddContact, true);
    },
    openEditContactPopup: function() {
      this.$f7.popup.open('#popupEditContact', true);
    },
    openManageFavorites: function() {
      this.$f7.popup.open(popupManageFavorites, true);
    },
    openContextMenuPopup: function() {
      this.$f7.popup.open(popupContextMenu, true);
    },
    onSearch: function(query, found) {
      setTimeout(() => {this.$store.dispatch('search', query.value);}, 2000);
    },
    onClear: function(event) {
      console.log('clear');
    },
    onEnable: function(event) {
      this.isSearch = true;
      console.log('enable');
    },
    onDisable: function(event) {
      this.isSearch = false;
      console.log('disable');
    },
    callTypeSelection (selectMode,a,b,c,d) {
      var ac1 = this.$f7.actions.create({
        buttons: [
          {
            text: selectMode,
            bold: true,
            bg: 'blue',
            color: 'red',
          },
          {
            text: a,
            color: 'blue',
            onClick: () => {
              this.$f7.popup.open('#popupDefaultMode', true);
            }
          },
          {
            text: b,
            color: 'blue'
          },
          {
            text: c,
            color: 'blue'
          },
          {
            text: d,
            color: 'blue',
            onClick: () => {
              this.goCallPage('audio')
            }
          }
        ]
      })
      ac1.open();
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
    dene: function simulateKeyPress() {
      var evt = document.createEvent('KeyboardEvent');
      evt.initKeyEvent(
        'keypress',
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        'e'.charCodeAt(0)
      );
      var body = document.body;
      var canceled = !body.dispatchEvent(evt);
      if (canceled) {
        // A handler called preventDefault
        alert('canceled');
      } else {
        // None of the handlers called preventDefault
        alert('not canceled');
      }
    },
      removeContact: function(contact) {
      let that = this
      function callbackOk () {
        that.$store.dispatch('removeContact', contact.entryId);
        that.$f7.popup.close('#popupContactDetails', true);
      }
       function callbackCancel () {
         console.log('remove contact canceled');
       }
      this.$f7.dialog.confirm('Are You Sure ?', 'Delete Contact', callbackOk, callbackCancel)

    },
    editContact: function() {
      console.log('name ' + this.firstName + this.lastName);
    },
    addContact: function(contact) {
      const newContact = {
        id: this.contacts.length,
        // entryId: this.contacts.length,
        emailAddress: contact.email ? contact.email : null,
        fax: contact.fax ? contact.fax : null,
        firstName: contact.firstName ? contact.firstName : null,
        friendStatus: false,
        homePhone: contact.homePhone ? contact.homePhone : null,
        lastName: contact.lastName ? contact.lastName : null,
        mobilePhone: contact.mobilePhone ? contact.mobilePhone : null,
        nickname: contact.nickname
          ? contact.nickname
          : 'nickname' + this.contacts.length,
        pager: contact.pager ? contact.pager : null,
        primaryContact: contact.userId ? contact.userId : null,
        userId: contact.userId ? contact.userId : null,
        username: contact.username ? contact.username : null,
        workPhone: contact.workPhone ? contact.workPhone : null,
      };

      let contacts = this.$store.state.contacts;
      let contactExist = false;
      contacts.forEach(contact1 => {
        if (contact.primaryContact === contact1.primaryContact) {
          contactExist = true;
        }
      });

      if (contactExist) {
        const newContact = {
          // id: this.contacts.length,
          entryId: contact.entryId,
          emailAddress: contact.email ? contact.email : null,
          fax: contact.fax ? contact.fax : null,
          firstName: contact.firstName ? contact.firstName : null,
          friendStatus: false,
          homePhone: contact.homePhone ? contact.homePhone : null,
          lastName: contact.lastName ? contact.lastName : null,
          mobilePhone: contact.mobilePhone ? contact.mobilePhone : null,
          nickname: contact.nickname ? contact.nickname : 'nickname',
          pager: contact.pager ? contact.pager : null,
          primaryContact: contact.primaryContact
            ? contact.primaryContact
            : null,
          userId: contact.userId ? contact.userId : null,
          username: contact.username ? contact.username : null,
          workPhone: contact.workPhone ? contact.workPhone : null,
        };
        console.log('edit contact ' + newContact.primaryContact);
        // this.$store.dispatch('addContact', newContact);
      } else {
        this.$store.dispatch('addContact', newContact);
        console.log('add contact ' + newContact.primaryContact);
      }
      this.$f7.popup.close('#popupEditContact', true);
      this.$f7.popup.close('#popupAddContact', true);
    },
  },
  computed: {
    ...mapGetters(['contacts','contactSource','favorites']), // not used anymore, instead store.state used
    getContacts() {
      var resultArray = [];
      let contactSource = this.$store.state.contactSource;
      if (contactSource === 'personal') {
        let sortBy = this.$store.state.sortBy;
        if (sortBy === 'firstName') {
          this.contacts = _.sortBy(this.$store.state.contacts, [
            function(o) {
              return o.firstName;
            },
          ]);
        } else {
          this.contacts = _.sortBy(this.$store.state.contacts, [
            function(o) {
              return o.lastName;
            },
          ]);
        }
        return this.contacts;
      } else {
        // setTimeout(() => {
        //   //document.getElementById('f7-searchbar').search(query);
        //   // this.$store.dispatch('search', query.value);
        // }, 2000);
        this.foundItems = this.$store.state.directory;
        return this.$store.state.directory;
      }
    },
    groupedContacts() {
      let contacts = this.getContacts;
      contacts.forEach(contact => {
        if (contact.firstName) {
          contact.name = contact.firstName.charAt(0);
        }
      });
      return _.groupBy(contacts, 'name');
    },
    getContactSource() {
      let contactSource = this.$store.state.contactSource;
      if (contactSource === 'personal') {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style>
.flex {
  display: flex;
  margin: 10px;
  padding: 5px;
  border: 0px solid black;
}

.column {
  flex-direction: column;
  padding: 0px;
}

.link {
  color: blue;
  font-size: 30px;
}

.flex2 {
  display: flex;
  margin: 10px;
  padding: 5px;
  border: 0px solid black;
  width: 100%;
}

.imgSize {
  max-height: 30px;
  max-width: 30px;
}

.avatar-circle {
  border-radius: 25px;
}

.rows {
  max-height: 50px;
}


</style>
