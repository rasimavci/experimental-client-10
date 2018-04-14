<template lang='pug'>
    f7-page(login-screen='')
      f7-login-screen-title
        br
        img(src="../assets/logo.png" class="deneme")
      f7-list(form='')
        f7-list-item
          f7-label Username
          f7-input(name='username', placeholder='Username', type='text', :value='username', @input='username = $event.target.value')
        f7-list-item
          f7-label Password
          f7-input(name='password', type='password', placeholder='Password')
      .list
        ul
          li
            a.item-link.list-button.login-button.login-screen-close(href='#', @click='doLogin') Sign In
        .block-footer
          | Please check github page for more information.
          br
          | Click "Sign In" to Login
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions(['setCredentials']),
    doLogin() {
      this.$store.dispatch('connect', {
        username: 'ravci@genband.com',
        password: 'yjke9884' // 'Genband.1234'
      })
      let vm = this
      this.$f7.preloader.show()
      this.setCredentials({
        user: this.username,
        admin: true,
        loged: true,
        token: 'SOME_TOKEN'
      })
      setTimeout(() => {
        vm.$f7.preloader.hide()
        vm.$f7router.navigate('/')
      }, 600)
    }
  }
}
</script>
<style>
.deneme {
  height: 15%;
  width: 75%
}
</style>
