<template lang='pug'>
f7-page.div-container
  //-incomingCallModal(v-if='incomingCall')
  f7-navbar
    f7-list-item(link='/presences/', view='#main-view', panel-close='')
      .item-content
        .item-media()
          .flex
            .flex2
              img.avatar-circle(:src="getPhotoUrl" width="50" height="50")
            .flex.column
               h3 {{getUserName}}
  f7-list.thick#navList(no-hairlines-between)
    f7-list-item(link='/call/', title='Call', view='#main-view', panel-close='')
     i.icon.material-icons.md-only star_border
    f7-list-item(link='/favorites/', title='Favorites', view='#main-view', panel-close='')
     i.icon.material-icons.md-only star_border
    f7-list-item(link='/contact/', title='Contact', view='#main-view', panel-close='')
     i.icon.material-icons.md-only contacts
    f7-list-item(link='/history/', title='History', view='#main-view', panel-close='')
     i.icon.material-icons.md-only access_time
    f7-list-item(badge="3" link='/message/', title='Inbox', view='#main-view', panel-close='')
     i.icon.material-icons.md-only.test-icon-left inbox
    f7-list-item(link='/dialpad/', title='Dialpad', view='#main-view', panel-close='')
     i.icon.material-icons.md-only phone
    f7-list-item(link='/sessions/', title='Sessions', view='#main-view', panel-close='')
     i.icon.material-icons.md-only content_copy
    f7-list-item(link='/conference/', title='Conference', view='#main-view', panel-close='')
     i.icon.material-icons.md-only supervisor_account
    f7-list-item.my-image-botton(link='/settings/', title='Settings', view='#main-view', panel-close='')
     i.icon.material-icons.md-only settings
</template>
<script>
import NoImg from '../assets/demo/noimage1.jpg';
import IncomingCallModal from './ModalIncomingCall'
import { mapGetters } from 'vuex'

export default {
  name: 'leftPanel',
    components: {
    incomingCallModal: IncomingCallModal

  },
  computed: {
    ...mapGetters(['incomingCall']),
    getUserName() {
      const user = this.$store.state.credentials.user;
      if(user) {
      const name = user.substring(0, user.indexOf('@'));
      return name
            }
    },
    getPhotoUrl() {
      const photoUrl1 =
        'http://pa-ucc.genband.com:80/pa/direct/pictureServlet?user=' +
        this.$store.state.credentials.user +
        '';
      console.log('photoUrl1' + photoUrl1);
      return photoUrl1;
    },
  },
  data: function() {
    return {
      noImg: NoImg,
      photoUrl: '',
      username: '',
    };
  },
  methods: {
    getContactInfo() {
      let self = this.$store.state.self; // this.conversationId;
      // let contact = this.$_.find(this.contacts, c => {
      //   return c.primaryContact === primaryContact;
      // });
      this.photoUrl =
        'http://pa-ucc.genband.com:80/pa/direct/pictureServlet?user=' +
        this.$store.state.credentials.user;
      this.username = this.$store.state.credentials.user;
      console.log('this.photoUrl ' + this.photoUrl);
      // contact.photoUrl || this.noImg;
      // this.selectedContacts.push(this.$_.cloneDeep(contact));
      // this.$nextTick(() => {
      //   this.renderMessages = true;
      // });
    },
    getSelfInfo() {
      return this.$store.state.self;
    },
    goPresences: function() {
      // this.$f7router.view = '#main-view';
      this.$f7router.navigate('/presences');
    },
  },
};
</script>

<style>
.panelColor2 {
  background-color: #336666;
}

.panelColor {
  background-color: #0099ff;
}

/* .leftit {
  alig: left
} */

.flex {
  display: flex;
  margin: 0px;
  padding: 0px;
  border: 0px solid black;
}

.column {
  flex-direction: column;
}

.link {
  color: blue;
  font-size: 10px;
}

.flex2 {
  display: flex;
  margin: 10px;
  padding: 0px;
  border: 0px solid black;
  width: 50%;
}

.avatar-circle {
  border-radius: 25px;
}

.thick {
    font-weight: bold;
}

.div-container{
    	position:relative;
}
.my-image-botton{
    	position:absolute;
    	bottom:-400px;
}
</style>
