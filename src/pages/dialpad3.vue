<template lang='pug'>
f7-page
        navbar
          f7-nav-left
            .f7-link(icon-if-ios="f7:menu" ,="" icon-if-md="material:menu" panel-open="left")
          f7-nav-title History
          f7-nav-right
            .f7-link(icon-if-ios="f7:menu" ,="" icon-if-md="material:menu" panel-open="right")
        // Additional "tabbar-labels" class
        .toolbar.toolbar-bottom-md.tabbar-labels
          .toolbar-inner
            a.tab-link.tab-link-active(href="#tab-1")
              // Different icons for iOS and MD themes
              i.icon.f7-icons.ios-only email_fill
              i.icon.material-icons.md-only email
              span.badge.color-red 5
              // Label text
              span.tabbar-label Inbox
            a.tab-link(href="#tab-2")
              i.icon.f7-icons.ios-only
                | phone_in_talk_fill
                span.badge.color-red 5
              i.icon.material-icons.md-only
                | phone_in_talk
              span.tabbar-label Call
            a.tab-link(href="#tab-3")
              i.icon.f7-icons.ios-only videocam_fill
              i.icon.material-icons.md-only videocam
              span.tabbar-label Video
        .tabs
          #tab-1.page-content.tab.tab-active  1
          #tab-2.page-content.tab  2
          #tab-3.page-content.tab  3

</template>
