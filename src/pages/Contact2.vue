<template>
  <div>

    <button-tab>
      <button-tab-item selected @click.native="showdata = 'all'">{{ $t('All Contacts') }}</button-tab-item>
      <button-tab-item @click.native="showdata = 'favorites'">{{ $t('Favorites') }}</button-tab-item>
    </button-tab>

  <div>
    <br>
    <search @on-submit="onSubmit" :auto-fixed="false" v-model="value2" @on-focus="onFocus" @on-cancel="onCancel"></search>
  </div>
  
    <group :title="'Services'">
      <cell :title="'Meetme Audio Conference'">
        <img slot="icon" src="../assets/demo/genband.png" />
      </cell>
    </group>

    <group>
      <div v-for="logrecord in getContacts" :key='logrecord.recordId' class="list-group-item a" @click="updateActiveCell(logrecord)">
        <cell :title="`${logrecord.firstName} ${logrecord.lastName}`" value="Personal">
          <img slot="icon" src="../assets/demo/avatar_generic.png" />
        </cell>
      </div>
    </group>

    <div style="padding:2px;">
      <x-button @click.native="create=true" type="primary">Create</x-button>
    </div>
    <div style="padding:2px;">
      <x-button @click.native="edit=true" type="primary">{{ $t('Edit') }}</x-button>
    </div>
    <div style="padding:2px;">
      <x-button @click.native="addContact" type="primary"> {{ $t('Add') }} </x-button>
    </div>

    <div v-transfer-dom>
      <popup v-model="create" height="100%">
        <div class="popup1">

          <popup-header :left-text="$t('Back')" :right-text="$t('Save')" :title="$t('Create Profile')" @on-click-left="create = false" @on-click-right="edit = false">
          </popup-header>

          <group :placeholder="$t('IDENTIFICATION')">
            <x-input :placeholder="$t(this.selectedContact.firstName)"></x-input>
            <x-input :placeholder="$t('Last Name*')"></x-input>
            <x-input :placeholder="$t('NickName*')"></x-input>
            <x-input :placeholder="$t('User ID')"></x-input>
            <x-input :placeholder="$t('Email')"></x-input>
          </group>
          <group :title="$t('CONTACT')">
            <x-input :placeholder="$t('Home*')"></x-input>
            <x-input :placeholder="$t('mobile*')"></x-input>
            <x-input :placeholder="$t('Work*')"></x-input>
          </group>

          <checklist :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>

        </div>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="contact" height="100%">
        <div class="popup1">

          <popup-header :left-text="$t('Back')" :right-text="$t('Edit')" :title="$t()" @on-click-left="contact = false" @on-click-right="favorites = true">
          </popup-header>

          <div class="flex">
            <div class="flex2">
              <img src="../assets/demo/avatar_generic.png" width="150" height="70">
            </div>

            <div class="flex column">
              <div class="flex">
                <h3> {{this.selectedContact.firstName}} {{this.selectedContact.lastName}} </h3>
              </div>
              <div class="flex">
            <img src="../assets/demo/call_outline_blue.png" @click="goCallPage(1)">
            <img src="../assets/demo/video_outline_blue.png" hspace="20" @click="goCallPage(2)">
            <div hspace="20"> </div>
            <img src="../assets/demo/bubble-clipart-chat-box-15d.png" @click="goCallPage(0)">
              </div>
            </div>
          </div>


          <group :title="$t('CONTACT')">
            <cell :title="$t('Home ' +  this.selectedContact.homePhone ) ">
              {{this.selectedContact.firstName}} {{this.selectedContact.lastName}}
            </cell>
            <cell :title="$t('mobile ' +  this.selectedContact.workPhone ) ">
            </cell>
            <cell :title="$t('Work ' +  this.selectedContact.workPhone ) ">
              <img src="../assets/demo/call_outline_blue2.png">
            </cell>
            <cell :title="$t('Mobile ' +  this.selectedContact.mobilePhone ) ">
            </cell>
            <cell :title="$t('Nickname ' +  this.selectedContact.nickname ) ">
            </cell>
            <cell :title="$t('User ID ' +  this.selectedContact.userId ) ">
            </cell>
            <cell :title="$t('Email ' +  this.selectedContact.email ) ">
            </cell>
          </group>

          <group :title="$t('SETTINGS')">
            <cell :title="$t('Manage Favorites')" @click.native="favorites = true">
            </cell>
            <cell :title="$t('Remove From Personal Contacts List')" @click.native="confirmDelete = true">
            </cell>
            <checklist :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>

          </group>
        </div>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="edit" height="100%">
        <div class="popup1">

          <popup-header :left-text="$t('Back')" :right-text="$t('Save')" :title="$t()" @on-click-left="edit = false" @on-click-right="edit = false">
          </popup-header>

          <cell 
            img src="../assets/demo/avatar_generic.png">
            <h4>{{this.selectedContact.firstName}} {{this.selectedContact.lastName}}</h4>
            <img src="../assets/demo/call_outline_blue.png">
            <img src="../assets/demo/video_outline_blue.png">
            <img src="../assets/demo/bubble-clipart-chat-box-15d.png">

          </cell>

          <group :title="$t('CONTACT')">
            <x-input :title="$t('Home')" :placeholder="$t(this.selectedContact.homePhone)">Home</x-input>
            <x-input :title="$t('Mobile')" :placeholder="$t(this.selectedContact.mobilePhone)"></x-input>
            <x-input :title="$t('work')" :placeholder="$t(this.selectedContact.workPhone)"></x-input>
            <x-input :title="$t('Nickname')" :placeholder="$t(this.selectedContact.nickName)"></x-input>
            <x-input :title="$t('User ID')" :placeholder="$t(this.selectedContact.userId)"></x-input>
            <x-input :title="$t('Email')" :placeholder="$t(this.selectedContact.email)"></x-input>
          </group>

          <group :title="$t('SETTINGS')">
            <checklist :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>
          </group>
        </div>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="favorites" height="100%">
        <div class="popup1">

          <popup-header :left-text="$t('Back')" :right-text="$t('Ok')" :title="$t('Manage Favorites')" @on-click-left="favorites = false" @on-click-right="edit = false">
          </popup-header>

          <group title="__">
            <cell title="Mahmut Oztemur">
              <rater v-model="data1" :max="1" active-color="#00BFFF" inline-desc="email"></rater>
            </cell>
            <cell title="Burak Kocak">
              <rater v-model="data2" :max="1" active-color="#00BFFF" inline-desc="email"></rater>
            </cell>
            <cell title="Burak Kocak">
              <rater v-model="data3" :max="1" active-color="#00BFFF" inline-desc="email"></rater>
            </cell>
          </group>

        </div>
      </popup>
    </div>

    <div v-transfer-dom>
      <confirm v-model="confirmDelete" :title="$t('Delete Contact')" :confirmText="$t('Ok')" @on-cancel="confirmDelete=false" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
        <p style="text-align:center;">{{ $t('Are you sure?') }}</p>
      </confirm>
    </div>

    <div v-transfer-dom>
      <popup v-model="add" height="100%">
        <div class="popup1">
          <label>Add Screen</label>
          <group>

            <img src="../assets/demo/call_outline_blue.png">
            <img src="../assets/demo/video_outline_blue.png">
            <img src="../assets/demo/dp_action_keyboard.png">

          </group>
          <group :title="$t('CONTACT')">
            <x-input :placeholder="$t('Home*')"></x-input>
            <x-input :placeholder="$t('mobile*')"></x-input>
            <x-input :placeholder="$t('Work*')"></x-input>
            <x-input :placeholder="$t('NickName*')"></x-input>
            <x-input :placeholder="$t('User ID')"></x-input>
            <x-input :placeholder="$t('Email')"></x-input>
          </group>

          <group :title="$t('SETTINGS')">
            <checklist :label-position="labelPosition" required :options="commonList1" v-model="checklist001" @on-change="change"></checklist>
            <checklist :label-position="labelPosition" required :options="commonList2" v-model="checklist001" @on-change="change"></checklist>
            <checklist :label-position="labelPosition" required :options="commonList3" v-model="checklist001" @on-change="change"></checklist>
          </group>
          <group>
            <x-switch title="Close" v-model="show1"></x-switch>
            <x-button @click.native="toast" type="primary">Save</x-button>
          </group>

        </div>
      </popup>
    </div>

  </div>
</template>

<script>
import { Search, Confirm, Rater, CellBox, CellFormPreview, PopupHeader, ButtonTab, ButtonTabItem, Divider, XImg, Checklist, Alert, Radio, TransferDom, Popup, Group, Cell, XButton, XSwitch, XInput, Toast, XAddress, ChinaAddressData } from 'vux'
import { mapState, mapGetters } from 'vuex'

export default {
  created: function () {
    this.$store.dispatch('updateCurrentPage', 'contact')
    this.$store.dispatch('updateShowPlacement', 'right')
  },
  directives: {
    TransferDom
  },
  components: {
    Search,
    Confirm,
    Rater,
    CellBox,
    CellFormPreview,
    PopupHeader,
    ButtonTab,
    ButtonTabItem,
    Divider,
    XImg,
    Checklist,
    Alert,
    Radio,
    Popup,
    Group,
    Cell,
    XSwitch,
    XInput,
    Toast,
    XAddress,
    XButton
  },
  data () {
    return {
      value2: '',
      confirmDelete: false,
      selectedContact: {},
      showdata: 'all',
      filterWord: '',
      list: [],
      error: false,
      checklist001: [],
      src: 'https://o5omsejde.qnssl.com/demo/test1.jpg',
      labelPosition: 'left',
      type: '',
      show2: false,
      addressData: ChinaAddressData,
      data1: 1,
      data2: 1,
      data3: 1,
      show: false,
      create: false,
      contact: false,
      edit: false,
      add: false,
      favorites: false,
      show1: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      title6: 'The default is empty',
      value6: [],
      show7: false,
      showToast: false,
      show8: false,
      show9: false,
      show10: false,
      show11: false,
      show12: false,
      show13: false,
      commonList: ['Show Presence Status', 'dene'],
      commonList1: ['Manage Favorites', 'dene2'],
      commonList2: ['Remove From Personal Contacts List', 'de'],
      commonList3: ['Remove From Personal Contacts List', 'dee']

    }
  },
  methods: {
    goCallPage (mode) {
      this.$store.dispatch('setCallPageInitialAction', mode)
      this.$store.commit('SET_CALLEE', this.selectedContact.primaryContact)
      this.$router.push('call')
    },
    change (val, label) {
      console.log('change', val, label)
    },
    onCreateContact () {
      this.$store.dispatch('updateAddContact', true)
    },
    log (str) {
      console.log(str)
    },
    logout () {
      this.$store.dispatch('disconnect')
    },
    onImgError (item, $event) {
      console.log(item, $event)
    },
    onConfirm () {
      console.log('contact deleted')
    },
    onConfirm5 () {
    },
    onShow () {
    },
    onShow5 () {
    },
    onHide () {
    },
    success () {
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      // this.results = val ? getResult(this.value) : []
    },
    onSubmit (val) {
      console.log('contactType ' + this.contactType + ' val ' + val)
      if (this.contactType === 'Global Addressbook') {
        this.$store.dispatch('search', val)
      }
      this.showdata = 'filtered'
      this.filterWord = val
      // window.alert('on submit ' + val)
    },
    onCancel () {
      console.log('on cancel')
    },
    onFocus () {
      console.log('on focus')
    },
    addcontact () {
      this.add = true
      this.$store.dispatch('updateCurrentPage', 'addcontact')
    },
    onClickBack () {
      // this.add = true
    },
    updateActiveCell (args) {
      if (this.$store.state.vux.joinStarted) {
        console.log('selected for join ' + args.primaryContact)
      } else {
        this.selectedContact = args
        this.contact = true
        console.log('edit ' + args.firstName)
      }
    }

  },
  computed: {
    ...mapGetters(['mystate']),
    getContacts () {
      if (this.showdata === 'all') {
        // console.log(this.$store.state.vux.contacts)
        this.list = this.$store.state.vux.contacts
        return this.$store.state.vux.contacts
      } else if (this.showdata === 'filtered') {
        return this.$store.state.vux.contacts.filter(note => note.firstName.startsWith(this.filterWord))
      } else if (this.showdata === 'Global Addressbook') {
        return this.$store.state.vux.directory // .filter(note => note.firstName.startsWith(this.filterWord))
      }
    },
    ...mapState({
      currentPageAddContact: state => state.vux.currentPageAddContact,
      joinStarted: state => state.vux.joinStarted,
      contactType: state => state.vux.contactType
    })
  },
  watch: {
    show10 (val) {
      if (val) {
        setTimeout(() => {
          this.show10 = false
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.large-icon {
  font-size: 70px;
  margin: 5px;
  padding: 5px;
}

.flex {
  display: flex;
  margin: 10px;
  padding: 5px;
  border: 0px solid black;
}

.flex2 {
  display: flex;
  margin: 10px;
  padding: 5px;
  border: 1px solid black;
  width: 200%
  }

.column {
  flex-direction: column;
}

.link {
  color: blue;
  font-size: 30px;
}


@import '~vux/src/styles/close.less';

.popup0 {
  padding-bottom: 15px;
  height: 200px;
}

.popup1 {
  width: 100%;
  height: 100%;
}

.popup2 {
  padding-bottom: 15px;
  height: 400px;
}

.position-vertical-demo {
  background-color: #ffe26d;
  color: #000;
  text-align: center;
  padding: 15px;
}

.position-horizontal-demo {
  position: relative;
  height: 100%;
  .vux-close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(4);
    color: #000;
  }
  .img1 {
    float: right;
  }
  .img2 {
    float: left;
  }
}

#block_container {
  text-align: center;
}

#bloc1 {
  display: inline;
  float: left;
}

#bloc2 {
  display: inline;
  float: right;
}

#bloc3 {
  display: inline;
  float: center;
}
#a {
    text-decoration: none;
}
</style>
