<template>
  <v-app-bar
    id="app-bar"
    color="white"
    flat
    height="100"
    class="header-toolbar elevation-4"
    fixed
  >
    <v-layout>
      <v-row>
        <v-col cols="12" sm="8" offset-sm="2" class="d-flex justify-space-around flex-wrap header-bar">
          <img src="@/assets/logo.png" class="logo img-responsive">
          <v-spacer class="d-sm-none d-md-block"></v-spacer>
          <v-btn text sm class="mt-8 elevation-0 display-1 black--text text-font2" v-if="$i18n.locale == 'fr'" @click="setLocale('en')">EN</v-btn>
          <v-btn text sm class="mt-8 elevation-0 display-1 black--text text-font2" v-else @click="setLocale('fr')">FR</v-btn>
        </v-col>
      </v-row>
  </v-layout>
    
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'CoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
    }),

    computed: {
    },

    methods: {
      setLocale(locale) {
        this.$i18n.locale = locale;
        localStorage.setItem('locale', locale);
      }
    },

    mounted() {
      let currentLocale = localStorage.getItem('locale');
      if (currentLocale) {
        this.$i18n.locale = currentLocale;
      } else {
        this.$i18n.locale = 'fr';
      }
    }
  }
</script>

<style scoped>
.header-toolbar {
  backdrop-filter: blur(0.8);
}

.logo {
  width: 178px;
  height: 19px;
  margin-bottom: 20px;
}

.header-bar {
  align-items: flex-end;
}

/*@media (max-width: 768px) {
  .header-bar {
    flex-direction: column;
    align-items: center;
  }

  .header-bar button {
    margin-top: 10px!important;
  }

  .logo {
    width: 100%;
    height: auto;
    margin-top: 20px;
  }  
}*/
</style>