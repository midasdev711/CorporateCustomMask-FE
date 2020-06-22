<template>
  <v-footer
    id="core-footer"
    class="elevation-2"
  >
    <v-container>
      <v-row
        align="center"
        no-gutters
      >
        <v-col cols="12" sm="8" offset-sm="2" class="d-flex justify-space-between flex-wrap footer-section">
          <img src="@/assets/logo.png" height="70px" class="img-responsive logo">
          <div id="contact" class="d-flex flex-column font-weight-medium mt-3">
            <span>300-8850 Ave du Parc,</span>
            <span>Montreal, QC, H2N 1Y6</span>
            <span>info@legaleriste.com</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'CoreFooter',

    data: () => ({
      links: [
        {
          href: '#',
          text: 'Creative Tim',
        },
        {
          href: '#',
          text: 'About Us',
        },
        {
          href: '#',
          text: 'Blog',
        },
        {
          href: '#',
          text: 'Licenses',
        },
      ],
    }),
  }
</script>

<style lang="sass">
  #dashboard-core-footer
    a
      font-size: .825rem
      font-weight: 500
      text-decoration: none
      text-transform: uppercase

  .logo 
    width: 178px
    height: 19px
    margin-bottom: 20px
</style>
