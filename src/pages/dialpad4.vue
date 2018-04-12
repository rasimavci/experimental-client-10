<template>
  <f7-page>
      <navbar>
        <f7-nav-left>
          <div class="f7-link" icon-if-ios='f7:menu' , icon-if-md='material:menu' , panel-open='left'>
          </div>
        </f7-nav-left>
        <f7-nav-title>History</f7-nav-title>
        <f7-nav-right>
          <div class="f7-link" icon-if-ios='f7:menu' , icon-if-md='material:menu' , panel-open='right'>
          </div>
        </f7-nav-right>
      </navbar>

      <!-- Additional "tabbar-labels" class -->
      <div class="toolbar toolbar-bottom-md tabbar-labels">
        <div class="toolbar-inner">
          <a href="#tab-1" class="tab-link tab-link-active">
            <!-- Different icons for iOS and MD themes -->
            <i class="icon f7-icons ios-only">email_fill</i>
            <i class="icon material-icons md-only">email</i>
            <span class="badge color-red">5</span>
            <!-- Label text -->
            <span class="tabbar-label">Inbox</span>
          </a>
          <a href="#tab-2" class="tab-link">
            <i class="icon f7-icons ios-only">phone_in_talk_fill
              <span class="badge color-red">5</span>
            </i>
            <i class="icon material-icons md-only">phone_in_talk
            </i>
            <span class="tabbar-label">Call</span>
          </a>
          <a href="#tab-3" class="tab-link">
            <i class="icon f7-icons ios-only">videocam_fill</i>
            <i class="icon material-icons md-only">videocam</i>
            <span class="tabbar-label">Video</span>
          </a>
        </div>
      </div>
      <div class="tabs">
        <div id="tab-1" class="page-content tab tab-active"> 1 </div>
        <div id="tab-2" class="page-content tab"> 2 </div>
        <div id="tab-3" class="page-content tab"> 3 </div>
      </div>
    </div>
  </f7-page>
</template>

