<template lang='pug'>
// App
#app
  //- .preloader
  //-   span.preloader-inner
  //-     span.preloader-inner-gap
  //-     span.preloader-inner-left
  //-       span.preloader-inner-half-circle
  //-     span.preloader-inner-right
  //-       span.preloader-inner-half-circle
  // Statusbar
  f7-statusbar
  // Left Panel
  f7-panel(left='', reveal='', theme-dark='')
    f7-view(url='/panel-left/')
  // Right Panel
  f7-panel(right='', cover='', theme-dark='')
    f7-view(url='/panel-right/')
  // Main View
  f7-view#main-view(url='/', main='')
  // Popup
  f7-popup#popup
    f7-view
      f7-page
        f7-navbar(title='Popup')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block
          | Lorem ipsum dolor sit amet.
  f7-popup#popupLanguage
    f7-view
      f7-page
        f7-navbar(title='Language Settings')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block
          | Lorem ipsum dolor sit amet.          

  f7-popup#popupAddContact
    f7-view
      f7-page
        f7-navbar(title='Add Contact')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block
          | Please fill contact details.
        f7-block-title Form Example
        f7-list(form='')
          f7-list-item
            f7-label Name
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label E-mail
            f7-input(type='email', placeholder='E-mail')
          f7-list-item
            f7-label URL
            f7-input(type='url', placeholder='URL')
          f7-list-item
            f7-label Password
            f7-input(type='password', placeholder='Password')
          f7-list-item
            f7-label Phone
            f7-input(type='tel', placeholder='Phone')
          f7-list-item
            f7-label Gender
            f7-input(type='select')
              option(selected='') Male
              option Female
          f7-list-item
            f7-label Birth date
            f7-input(type='date', placeholder='Birth date', value='2014-04-30')
          f7-list-item(title='Friend')
            f7-toggle(slot='after')

  f7-popup#popupEditContact
    f7-view
      f7-page
        f7-navbar(title='Add Contact')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block
          | Please fill contact details.
        f7-block-title Form Example
        f7-list(form='')
          f7-list-item
            f7-label Name
            f7-input(type='text', placeholder='Name')
          f7-list-item
            f7-label E-mail
            f7-input(type='email', placeholder='E-mail')
          f7-list-item
            f7-label URL
            f7-input(type='url', placeholder='URL')
          f7-list-item
            f7-label Password
            f7-input(type='password', placeholder='Password')
          f7-list-item
            f7-label Phone
            f7-input(type='tel', placeholder='Phone')
          f7-list-item
            f7-label Gender
            f7-input(type='select')
              option(selected='') Male
              option Female
          f7-list-item
            f7-label Birth date
            f7-input(type='date', placeholder='Birth date', value='2014-04-30')
          f7-list-item(title='Friend')
            f7-toggle(slot='after')

  login
</template>

<script>
import Login from './pages/login'
export default {
  name: 'mainApp',
  components: {
    login: Login
  }
}
</script>
