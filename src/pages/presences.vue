<template lang="pug">
f7-page
  f7-navbar
    f7-nav-left
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='left')
    f7-nav-title ravci@genband.com
    f7-nav-right
      f7-link(icon-if-ios='f7:menu', icon-if-md='material:menu', panel-open='right')
  f7-block-title Presence
  f7-list(form='')
    f7-list-item(:key='1', radio='', name='my-radio', :checked='1 === 1', :value='1', :title="'Available'")
    f7-list-item(:key='2', radio='', name='my-radio', :checked='2 === 1', :value='2', :title="'Busy'")
    f7-list-item(:key='3', radio='', name='my-radio', :checked='3 === 1', :value='3', :title="'On Vacation'")
    f7-list-item(:key='4', radio='', name='my-radio', :checked='4 === 1', :value='4', :title="'Away'")    
    f7-list-item(:key='5', radio='', name='my-radio', :checked='5 === 1', :value='5', :title="'Out to Lunch'")
    f7-list-item(:key='6', radio='', name='my-radio', :checked='6 === 1', :value='6', :title="'Be Right Back'")
    f7-list-item(:key='7', radio='', name='my-radio', :checked='7 === 1', :value='7', :title="'Appear Offline'")    
  f7-grid
    f7-col(width='150')
      f7-button.col(raised='', fill='') About
    f7-row(tag='p')
      f7-button.col(raised='', fill='') Logout
    f7-row(tag='p')
      f7-button.col(raised='', fill='', popup-open='#popupSendFeedback') Send Feedback
  f7-list
    f7-list-item(link='/about/', title='About')      
  f7-popup#popupSendFeedback
    f7-view
      f7-page
        f7-navbar(title='Send Feeback')
          f7-nav-right
            f7-link(popup-close='') Close
        f7-block-title Send Feedback
</template>

<script>
export default {}
</script>
