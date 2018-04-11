<template lang='pug'>
f7-page
  f7-navbar(title='Dynamic Route', back-link='Back')
  f7-block(strong='')
    ul
      li
        b Url:
        |  {{$f7route.url}}
      li
        b Path:
        |  {{$f7route.path}}
      li
        b Hash:
        |  {{$f7route.hash}}
      li
        b Params:
        ul
          li(v-for='(value, key) in $f7route.params', :key='key')
            b {{key}}:
            |  {{value}}
      li
        b Query:
        ul
          li(v-for='(value, key) in $f7route.query', :key='key')
            b {{key}}:
            |  {{value}}
      li
        b Route:
        |  {{$f7route.route}}
  f7-block(strong='')
    f7-link(@click='$f7router.back()') Go back via Router API
</template>

<script>
export default {
  name: 'dynamicRoute'
}
</script>
