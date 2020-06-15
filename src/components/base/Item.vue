<template>
  <v-list-item
    :href="href"
    :rel="href && href !== '#' ? 'noopener' : undefined"
    :target="href && href !== '#' ? '_blank' : undefined"
    :to="item.to"
    :active-class="`primary ${!isDark ? 'black' : 'white'}--text`"
    @mouseover="hoverStatus = true"
    @mouseout="hoverStatus = false"
  >
    <v-list-item-icon
      v-if="text"
      class="v-list-item__icon--text"
      v-text="computedText"
    />

    <v-list-item-icon v-else-if="item.icon">
      <v-icon v-text="item.icon" />
    </v-list-item-icon>

    <v-list-item-content
      v-if="item.title || item.subtitle"
      class="text-center">
      <img
        :src="hoverStatus ? item.hoverImage : item.image"
        width="40px"
        height="40px"
        >
      <v-list-item-title
        v-bind:class="[{'white--text': hoverStatus}, 'text-center subtitle-2 font-weight-regular']"
        v-text="item.title"
        />

      <v-list-item-subtitle v-text="item.subtitle" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import Themeable from 'vuetify/lib/mixins/themeable'

  export default {
    name: 'Item',

    mixins: [Themeable],

    props: {
      item: {
        type: Object,
        default: () => ({
          href: undefined,
          icon: undefined,
          subtitle: undefined,
          title: undefined,
          to: undefined,
        }),
      },
      text: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        hoverStatus: false
      }
    },

    computed: {
      computedText () {
        if (!this.item || !this.item.title) return ''

        let text = ''

        this.item.title.split(' ').forEach(val => {
          text += val.substring(0, 1)
        })

        return text
      },
      href () {
        return this.item.href || (!this.item.to ? '#' : undefined)
      },
    },
  }
</script>

<style lang="sass" scoped>
.v-list-item .v-list-item__title
  white-space: pre-wrap
  line-height: 21px
  max-width: 90px
  margin: 0 auto

</style>
