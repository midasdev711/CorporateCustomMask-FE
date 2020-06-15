<template>
  <div>
    <v-hover
        v-slot:default="{ hover }"
      >
      <div>
      <v-list-item
        :href="href"
        :rel="href && href !== '#' ? 'noopener' : undefined"
        :target="href && href !== '#' ? '_blank' : undefined"
        :to="item.to"
        :active-class="`${!isDark ? 'black' : 'white'}--text`"
        v-bind:class="[{'hover': hover}]"
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
            :src="hover ? item.hoverImage : item.image"
            width="40px"
            height="40px"
            >
          <v-list-item-title
            v-bind:class="[{'white--text': hover}, 'text-center subtitle-2 font-weight-regular']"
            v-text="item.title"
            />

          <v-list-item-subtitle v-text="item.subtitle" />
        </v-list-item-content>
        <div v-bind:class="[{active: hover}, 'sub-menu-sm d-sm-none']" v-if="item.children.title">
          <h3 class="text-uppercase white--text">{{item.children.title}}</h3>
          <ul class="mt-10">
            <li v-for="(childItem, index) in item.children.items" aria-controls>{{childItem.title}}</li>
          </ul>
        </div>
        
      </v-list-item>
      <div v-bind:class="[{active: hover}, 'sub-menu d-none d-sm-block']" v-if="item.children.title">
        <h3 class="text-uppercase white--text">{{item.children.title}}</h3>
        <ul class="mt-10">
          <li v-for="(childItem, index) in item.children.items" aria-controls>{{childItem.title}}</li>
        </ul>
      </div>
    </div>
    </v-hover>
  </div>
</template>

<script>
  import Themeable from 'vuetify/lib/mixins/themeable'

  export default {
    name: 'ItemGroup',

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
          children: {
            title: undefined,
            items: []
          }
        }),
      },
      text: {
        type: Boolean,
        default: false,
      },
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
      }
    },
  }
</script>

<style lang="sass" scoped>
.v-list-item
  z-index: 2
.v-list-item.hover
  background-color: #AB72C1
.v-list-item .v-list-item__title
  white-space: pre-wrap
  line-height: 21px
  max-width: 90px
  margin: 0 auto
.sub-menu
  width: 250px
  height: 100vh
  position: absolute
  top: 0
  background-color: #AB72C1
  left: -120px
  display: block
  z-index: -1
  opacity: 0
  padding: 20px 15px

  &.active
    left: 130px
    transition-duration: .5s
    z-index: 0
    opacity: 1

  h3
    margin-bottom: .5rem
    font-weight: 500
    line-height: 1.2
    font-size: 28px

  ul 
    list-style-type: none
    padding-left: 0
  li
    color: white
    font-size: 14px
    text-transform: uppercase
    height: 51px
    letter-spacing: 1px
    display: flex
    align-items: center
.sub-menu-sm
  background-color: #AB72C1
  display: none
  width: 250px
  z-index: -1
  opacity: 0
  padding: 20px 15px

  &.active
    transition-duration: .5s
    z-index: 0
    opacity: 1
    display: block

  h3
    margin-bottom: .5rem
    font-weight: 500
    line-height: 1.2
    font-size: 28px

  ul 
    list-style-type: none
    padding-left: 0
  li
    color: white
    font-size: 14px
    text-transform: uppercase
    height: 51px
    letter-spacing: 1px
    display: flex
    align-items: center
.theme--light.v-list-item--active::before
  background-color: white
.theme--light.v-list-item--active::after
  content: ""
  min-height: inherit
  font-size: 0
  width: 8px
  position: absolute
  right: -4px
  height: 100%
  border-radius: 4px
  background-color: #AB72C1
</style>
