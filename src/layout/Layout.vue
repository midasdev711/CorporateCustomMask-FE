<template>
  <v-app>
    <core-app-bar />

    <core-view />

    <core-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',

    components: {
      CoreAppBar: () => import('./core/AppBar'),
      CoreView: () => import('./core/View'),
      CoreFooter: () => import('./core/Footer'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
