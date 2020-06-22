<template>
  <v-container fluid tag="section">
    <v-row>
      <v-col cols="12" xs="12" sm="6" offset-sm="3">
        <h1 class="text-font1 text-center display-4">“BACK TO WORK”</h1>
        <h2 class="headline text-center text-font2 mb-5">Propagez votre image. Pas le virus</h2>
        <p class="text-center text-font2 pt-2">Ensemble, préparons le retour au travail. Protégez vos employés en leur offrant un masque haut de gamme aux couleurs de votre compagnie. Du même coup, vous renforcerez le sentiment de sécurité et d'appartenance à votre compagnie.</p>
      </v-col>
      <v-col cols="12" xs="12" sm="8" offset-sm="2">
        <img src="@/assets/banner1.png" width="100%" class="img-responsive">
      </v-col>
      <v-col cols="12" xs="12" sm="6" offset-sm="3" class="text-center">
        <v-btn
          ref="button"
          color="darkgrey darken-3"
          class="display-2"
          @click="$vuetify.goTo('#form', options)"
        >
          DEMANDEZ UN ESTIMÉ
        </v-btn>
        <p class="display-1 mt-4 text-font2">
          - Construit pour perdurer (résistant à plusieurs dizaines de lavages)
          <br><br>
          -Logo de la compagnie, taille du masque ainsi qu'un rappel des mesures de sécurité de la COVID19 sont imprimées à l'intérieur ("Lavez et sécher à plat avant usage. Les masques ne sont pas suffisants pour protéger à eux seuls contre la COVID19. Lavez-vous les mains fréquemment, gardez vos distances et restez à la maison tant que faire ce peut.”
          <br><br>
          -Serre-nez qui se retire pour le lavage inclus
          <br><br>
          -Pré-rapetissé (ne rapetissera pas au lavage)
          <br><br>
          -Adapté aux formes du visage (5 grandeurs; XS à XL)
          <br><br>
          -Double couche de poly interlock hautement extensible traité thermiquement
          <br><br>
          -Fait au Canada
        </p>
      </v-col>
      <v-col cols="12" xs="12" sm="10" offset-sm="1">
        <v-divider :inset="false" :light="true"></v-divider>
      </v-col>
      <v-col cols="12" xs="12" sm="8" offset-sm="2" class="mt-4">
        <img src="@/assets/banner.png" width="100%" class="img-responsive">
      </v-col>
      <v-col cols="12" xs="12" sm="6" offset-sm="3" class="text-center">
        <h2 class="text-font1 text-center display-4">À vous de jouer !</h2>
        <p class="text-center text-font2 pt-2">En moins d’une minute, remplissez les informations ci-bas. Les designers vous enverront des options de design et de prix. Vous pourrez commenter vos visuels. Prenez le temps de le faire… Il ne faut pas sous-estimer la force de cet outil marketing.</p>
      </v-col>
      <v-col cols="12" xs="12" sm="8" offset-sm="2">
        <h3 class="headline">{{ $t('Please fill the form') }}</h3>
        <v-form ref="form" lazy-validation v-model="valid" id="form" class="elevation-2 grey lighten-4 pa-3 mt-5">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="uploadInfo.companyName"
                :rules="companyNameRules"
                :label="$t('Company name')"
                color="blue darken-2"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-combobox
                :rules="countryRules"
                :loading="countryLoading"
                :items="countries"
                :item-value="'value'"
                :label="$t('Country')"
                color="blue darken-2"
                @input="countryInput"
                required
              ></v-combobox>
            </v-col>

            <v-col cols="12" md="3">
              <v-combobox
                :rules="provinceRules"
                :loading="provinceLoading"
                :items="provinces"
                :item-value="'value'"
                :label="$t('Province')"
                color="blue darken-2"
                @input="provinceInput"
                required
              ></v-combobox>
            </v-col>

            <v-col cols="12" md="3">
              <v-combobox
                :rules="cityRules"
                :loading="cityLoading"
                :items="cities"
                :item-value="'value'"
                :label="$t('City')"
                color="blue darken-2"
                @input="cityInput"
                required
              ></v-combobox>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="uploadInfo.companyWebsite"
                :rules="companyWebsiteRules"
                :label="$t('Company website')"
                color="blue darken-2"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="uploadInfo.maskCountNeeded"
                :rules="MaskCountRules"
                :label="$t('Number of masks needed')"
                type="number"
                color="blue darken-2"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-menu
                v-model="datepickerMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="uploadInfo.deliveryDate"
                    label="Required delivery date"
                    prepend-icon="mdi-calendar"
                    readonly
                    required
                    :rules="deliveryDateRules"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="uploadInfo.deliveryDate" @input="datepickerMenu = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="12">
              <v-file-input
                show-size
                accept="image/*"
                label="Upload logo here"
                v-model="image"
                :rules="imageRules"
                required
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="4">
              <v-color-picker class="ma-2" v-model="uploadInfo.color1" :rules="colorRules" mode="hexa" required></v-color-picker>
            </v-col>
            <v-col cols="12" md="4">
              <v-color-picker class="ma-2" v-model="uploadInfo.color2" :rules="colorRules" mode="hexa" required></v-color-picker>
            </v-col>
            <v-col cols="12" md="4">
              <v-color-picker class="ma-2" v-model="uploadInfo.color3" :rules="colorRules" mode="hexa" required></v-color-picker>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="uploadInfo.firstName"
                :rules="firstNameRules"
                :label="$t('First name')"
                color="blue darken-2"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="uploadInfo.lastName"
                :rules="lastNameRules"
                :label="$t('Last name')"
                color="blue darken-2"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="uploadInfo.email"
                :rules="emailRules"
                :label="$t('Email')"
                color="blue darken-2"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="uploadInfo.phone"
                :rules="phoneRules"
                :label="$t('Phone')"
                color="blue darken-2"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-textarea
                name="Comment"
                :label="$t('Comment')"
                v-model="uploadInfo.comment"
                color="blue darken-2"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="12" class="d-flex justify-center">
              <v-btn :disabled="!valid" color="success" class="mb-4 mx-auto submit-button" @click="validate" :loading="saveLoading">{{ $t('Save') }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="notification"
      :color="color"
      :multi-line="true"
      :timeout="timeout"
      :top="true"
    >
      {{ notificationText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="notification = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>

import axios from 'axios';
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Index",
  data() {
    return {
      notification: false,
      notificationText: null,
      timeout: 3000,
      color: null,
      basicUrl: null,
      faq: [
        {
          question: "What's your favourite sport?",
          answer: "Soccer"
        },
        {
          question: "Who's the best soccer player?",
          answer: "Lionel Messi"
        },
        {
          question: "Is Messi better than Ronaldo?",
          answer: "Definitely Yes"
        },
        {
          question: "What is Vuetify JS?",
          answer:
            "Vuetify. js is a component framework for Vue. js 2. It aims to provide clean, semantic and reusable components that make building your application a breeze."
        },
        {
          question: "How do I check Vuetify version?",
          answer:
            "1 Answer \n To check which version is installed globally: Run the following command: npm ls -g --depth 0 vuetify. \n To check which version is installed locally within your project: Firstly, cd to the project directory and then run: npm ls --depth 0 vuetify."
        }
      ],
      nameRules: [v => !!v || this.$t("Name is required")],
      companyNameRules: [v => !!v || this.$t("Company name is required")],
      cityRules: [v => !!v || this.$t("City is required")],
      provinceRules: [v => !!v || this.$t("Province is required")],
      countryRules: [v => !!v || this.$t("Country is required")],
      companyWebsiteRules: [v => !!v || this.$t("Company website url is required")],
      firstNameRules: [v => !!v || this.$t("First name is required")],
      lastNameRules: [v => !!v || this.$t("Last name is required")],
      phoneRules: [
        v => !!v || this.$t("Phone number is required"),
        v => /^\d+$/.test(v) || this.$t("Phone number must be valid")
      ],
      emailRules: [
        v => !!v || this.$t("E-mail is required"),
        v => /.+@.+/.test(v) || this.$t("E-mail must be valid")
      ],
      imageRules: [v => !!v || this.$t("Image is required")],
      colorRules: [v => !!v || this.$t("Color is required")],
      MaskCountRules: [v => !!v || this.$t("Number of masks needed is required")],
      deliveryDateRules: [v => !!v || this.$t("Delivery date is required")],
      uploadInfo: {
        companyName: null,
        companyWebsite: null,
        city: null,
        province: null,
        country: null,
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        comment: null,
        color1: null,
        color2: null,
        color3: null,
        filename: null,
        maskCountNeeded: null,
        deliveryDate: null
      },
      image: null,
      valid: true,
      countries: [],
      countryLoading: false,
      cities: [],
      cityLoading: false,
      provinces: [],
      provinceLoading: false,
      selectedProvinceCode: null,
      selectedCountryCode: null,
      saveLoading: false,
      datepickerMenu: false,
      options: {
        duration: 1000,
        offset: 200,
        easing: 'easeInCubic',
      }
    };
  },

  components: {},

  computed: {},

  methods: {
    ...mapActions("app", {
      saveData: "save",
      getCountries: "getCountries",
      getStates: "getStates",
      getCities: "getCities"
    }),

    async validate() {
      if (this.$refs.form.validate()) {
        this.saveLoading = true;
        let formData = new FormData();
        formData.append("files", this.image, this.image.name);

        // get current input language
        this.uploadInfo.inputLanguage = this.$i18n.locale;

        // additional data
        this.uploadInfo.filename = this.image.name;
        console.log(this.uploadInfo);
        formData.append("info", JSON.stringify(this.uploadInfo));

        await this.saveData(formData);

        // show snackbar
        this.notificationText = `Successfully uploaded`;
        this.color = 'success';
        this.notification = true;

        this.saveLoading = false;
      }
    },

    async countryInput(e) {
      this.uploadInfo.country = e.text;
      this.selectedCountryCode = e.value;
      this.provinceLoading = true;
      let payload = {
        countryId: this.selectedCountryCode
      };
      var res = await this.getStates(payload);
      this.provinces = Object.assign([], res);
      this.provinceLoading = false;
    },

    async provinceInput(e) {
      this.uploadInfo.province = e.text;
      this.selectedProvinceCode = e.value;
      this.cityLoading = true;
      let payload = {
        countryId: this.selectedCountryCode,
        stateId: this.selectedProvinceCode
      };
      var res = await this.getCities(payload);
      this.cities = Object.assign([], res);
      this.cityLoading = false;
    },

    cityInput(e) {
      this.uploadInfo.city = e.text;
    }
  },

  async mounted() {
    this.countryLoading = true;
    var res = await this.getCountries();
    this.countries = Object.assign([], res);
    this.countryLoading = false;
  }
};
</script>

<style scoped>
@font-face {
  font-family: "Circular Std Bold";
  src: url("../assets/font/Circular Std Bold.ttf");
}

.submit-button {
  width: 200px;
}

.text-font1 {
  font-family: 'Garamond'!important;
}

.text-font2 {
  font-family: 'Circular Std Bold'!important;
}


</style>