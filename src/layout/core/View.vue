<template>
  <v-content>
    <router-view />
  </v-content>
</template>

<script>
  export default {
    name: 'CoreView',

    components: {
      CoreFooter: () => import('./Footer'),
      CoreSettings: () => import('./Settings'),
    },
  }
</script>

<style>
.theme--light .v-content {
  background-color: white;
  padding-top: 140px!important;
}

/*@media (max-width: 992px) {
  .theme--light .v-content {
    padding-top: 200px!important;
  }
}

@media (max-width: 600px) {
  .theme--light .v-content {
    padding-top: 200px!important;
  }
}*/
</style>