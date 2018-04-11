<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Contacts" sliding></f7-navbar>
    <f7-searchbar cancel-link="Cancel" placeholder="Search in contacts" :clear-button="true"></f7-searchbar>

    <f7-list contacts>
      <f7-list-item v-for="group in getContacts" :key="group.name" :title="group.firstName + ' ' + group.lastName"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
