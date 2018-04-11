<template lang='pug'>
f7-page
  f7-navbar(title='Form', back-link='Back')
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
    f7-list-item(title='Toggle')
      f7-toggle(slot='after')
    f7-list-item
      f7-label Slider
      f7-input
        f7-range(min='0', max='100', value='50', step='1', :label='true')
    f7-list-item
      f7-label Textarea
      f7-input(type='textarea', placeholder='Bio')
    f7-list-item
      f7-label Resizable
      f7-input(type='textarea', placeholder='Bio', resizable='')
  f7-block-title Checkbox group
  f7-list(form='')
    f7-list-item(v-for='n in 3', :key='n', checkbox='', name='my-checkbox', :value='n', :title="'Checkbox ' + n")
  f7-block-title Radio buttons group
  f7-list(form='')
    f7-list-item(v-for='n in 3', :key='n', radio='', name='my-radio', :checked='n === 1', :value='n', :title="'Radio ' + n")
  f7-block-title Buttons
  f7-block(strong='')
    f7-row(tag='p')
      f7-button.col Button
      f7-button.col(fill='') Fill
    f7-row(tag='p')
      f7-button.col(raised='') Raised
      f7-button.col(raised='', fill='') Raised Fill
    f7-row(tag='p')
      f7-button.col(round='') Round
      f7-button.col(round='', fill='') Round Fill
    f7-row(tag='p')
      f7-button.col(outline='') Outline
      f7-button.col(round='', outline='') Outline Round
    f7-row(tag='p')
      f7-button.col(small='', outline='') Small
      f7-button.col(small='', round='', outline='') Small Round
    f7-row(tag='p')
      f7-button.col(small='', fill='') Small
      f7-button.col(small='', round='', fill='') Small Round
    f7-row(tag='p')
      f7-button.col(big='', raised='') Big
      f7-button.col(big='', fill='', raised='') Big Fill
    f7-row(tag='p')
      f7-button.col(big='', fill='', raised='', color='red') Big Red
      f7-button.col(big='', fill='', raised='', color='green') Big Green

</template>

<script>
export default {
  name: 'form'
}
</script>
