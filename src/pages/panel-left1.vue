  <template lang='pug'>
  body
    .list
      ul
        li
          list-item('/newMessage/')
          .item-content
            .item-media
              i.icon.material-icons.md-only inbox
            .item-inner
              .item-title Inbox
              .item-after CEO
        li
          .item-content
            .item-media
              i.icon.icon-f7
            .item-inner
              .item-title John Doe
              .item-after
                span.badge 5
        li
          .item-content
            .item-media
              i.icon.icon-f7
            .item-inner
              .item-title Jenna Smith
</template>
