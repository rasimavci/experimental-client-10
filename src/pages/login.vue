<template lang='pug'>
    f7-page(login-screen='')
      f7-login-screen-title
        br
        img(src="../assets/logo.png" class="deneme")
      f7-list(form='')
        f7-list-item
          f7-label Username
          f7-input(name='username', :placeholder="$t('USERNAME')", type='text', :value='username', @input='username = $event.target.value')
        f7-list-item
          f7-label Password
          f7-input(name='password', type='password', :placeholder="$t('PASSWORD')", :value='password', @input='password = $event.target.value')
      .list
        ul
          li
            a.item-link.list-button.login-button.login-screen-close(href='#', @click='doLogin') {{ $t('SIGN_IN') }}
        .block-footer
          | {{ $t('DEMO') }}
          br
          | {{ $t('Version') }} 4.0
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'login',
  created: function() {
    this.$store.commit('UPDATE_CURRENTPAGE', 'login');
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  mounted() {},
  methods: {
    ...mapActions(['setCredentials']),
    doLogin() {
      console.log('credentials ' + this.username, this.password);
      this.$store.dispatch('connect', {
        username: this.username,
        password: this.password,
      });
      let vm = this;
      this.$f7.preloader.show();
      this.setCredentials({
        user: this.username,
        admin: true,
        loged: true,
        token: 'SOME_TOKEN',
      });
      setTimeout(() => {
        vm.$f7.preloader.hide();
        vm.$f7router.navigate('/favorites');
        let isConnected = this.$store.state.isConnected;
        console.log('isConnected ' + isConnected);
      }, 2000);
    },
    getConnectState() {
      this.isConnected = this.$store.state.isConnected;
      // console.log('isConnected' + isConnected);
    },

     doLogin() {
      console.log('credentials ' + this.username, this.password);
      this.$store.dispatch('connect', {
        username: this.username,
        password: this.password,
      });

var that = this

      this.setCredentials({
        user: this.username,
        admin: true,
        loged: true,
        token: 'SOME_TOKEN',
      });
      //this.checkResult().then((interval) =>  {
        this.$f7router.navigate('/favorites');
      //}).catch(() =>  {
       // this.$f7.dialog.alert('Unable to login.', 'Smart Office', false)
      //})

    },
    checkResult() {
        return new Promise((resolve,reject) =>  {
        this.$f7.preloader.show();
        var that = this
        var id = setInterval(() => {
        let condition = that.$store.state.isConnected
        if (condition === true) {
         clearInterval(id);
         resolve('ok');
         that.$f7.preloader.hide();
                }
        setTimeout(() => {
                that.$f7.preloader.hide();
                clearInterval(id);
                reject();
            }, 10000);
        }, 10);
    });
  }

  }
}
</script>
<style>
.deneme {
  height: 15%;
  width: 75%;
}
</style>
