<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-break-point="960"
    app
    width="130"
    v-bind="$attrs"
  >
    <img
      src="images/logo.svg"
      height="60"
      class="logo"
    />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'CoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          image: 'images/icons/4-09.svg',
          hoverImage: 'images/icons/4-09-white.svg',
          title: 'Patient',
          to: '/',
          children: {
            title: "Profile",
            items: [{
              title: 'Complete Profile',
              to: '/'
            }, {
              title: 'Personal Information',
              to: '/'
            }, {
              title: 'Allergy',
              to: '/'
            }, {
              title: 'Immunizations',
              to: '/'
            }, {
              title: 'Family History',
              to: '/'
            }, {
              title: 'Lifestyle',
              to: '/'
            }, {
              title: 'Accidents',
              to: '/'
            }, {
              title: 'Emergency Contact',
              to: '/'
            }, {
              title: 'Insurance',
              to: '/'
            }]
          }
        },
        {
          image: 'images/icons/4-08.svg',
          hoverImage: 'images/icons/4-08-white.svg',
          title: 'Lab Records',
          to: '/pages/user',
          children: {
            title: "Exams",
            items: [{
              title: 'Laboratory',
              to: '/'
            }, {
              title: 'Radiology',
              to: '/'
            }]
          }
        },
        {
          title: 'Physical Activity',
          image: 'images/icons/4-07.svg',
          hoverImage: 'images/icons/4-07-white.svg',
          to: '/tables/regular-tables',
        },
        {
          title: 'Other Record',
          image: 'images/icons/4-06.svg',
          hoverImage: 'images/icons/4-06-white.svg',
          to: '/components/typography',
          children: {
            title: "Others",
            items: [{
              title: 'Dental',
              to: '/'
            }, {
              title: 'Odontology',
              to: '/'
            }, {
              title: 'Oftalmology',
              to: '/'
            }, {
              title: 'Otorrinolaringology',
              to: '/'
            }, {
              title: 'Ginecology',
              to: '/'
            }, {
              title: 'Urologist',
              to: '/'
            }, {
              title: 'Geriatry',
              to: '/'
            }]
          }
        },
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: {
            items: item.children ? item.children.items.map(this.mapItem) : undefined,
            title: item.children ? this.$t(item.children.title) : undefined
          },
          title: this.$t(item.title),
        }
      },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    overflow: visible

    .v-navigation-drawer__content
      overflow: visible

    @media (max-width: 600px)
      width: 250px!important

    .logo
      display: block
      margin: 30px auto
    .v-list
      padding: 0
    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list--nav .v-list-item
      padding: 13px 0
      margin-bottom: 0
      border-radius: 0

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
