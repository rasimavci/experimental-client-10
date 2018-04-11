<template lang='pug'>
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title Settings
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='right')
  f7-block(strong='')
    p Here is your blank Framework7 app. Let's see what we have here.
  f7-block-title Application Settings
  f7-list
    f7-list-item(link='/about/', title='Language Settings')
    f7-list-item(link='/contact/', title='Vibration Settings')
    f7-list-item(link='/form/', title='Log Settings')
    f7-list-item(link='/dynamic-route/blog/45/post/125/?foo=bar#about', title='Battery Settings')
    f7-list-item(link='/about/', title='About')
    f7-list-item(link='/form/', title='Form')
  f7-block-title Modals
  f7-block(strong='')
    f7-row
      f7-col(width='50')
        f7-button(fill='', raised='', popup-open='#popup') Popup
      f7-col(width='50')
        f7-button(fill='', raised='', popup-open='#popupLanguage') Language Settings      
      f7-col(width='50')
        f7-button(fill='', raised='', popup-open='#popupAddContact') Add Contact
      f7-col(width='50')
        f7-button(fill='', raised='', popup-open='#popupAddContact') Edit Contact
      f7-col(width='50')              
        f7-button(fill='', raised='', login-screen-open='#login-screen') Login Screen
  f7-block-title Panels
  f7-block(strong='')
    f7-row
      f7-col(width='50')
        f7-button(fill='', raised='', panel-open='left') Left Panel
      f7-col(width='50')
        f7-button(fill='', raised='', panel-open='right') Right Panel
  f7-list
    f7-list-item(link='/dynamic-route/blog/45/post/125/?foo=bar#about', title='Dynamic Route')
    f7-list-item(link='/load-something-that-doesnt-exist/', title='Default Route (404)')

</template>