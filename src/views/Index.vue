<template>
  <v-container fluid tag="section">
    <v-row>
      <v-col cols="12" xs="12" sm="8" offset-sm="2">
        <h2>Your Company's Custom Premium Masks Made in Montreal in 15 days</h2>
      </v-col>
      <v-col cols="12" xs="12" sm="8" offset-sm="2">
        <v-card class="mt-0">
          <v-container fluid>
            <v-row>
              <v-col v-for="n in 6" :key="n" class="d-flex child-flex" cols="4">
                <v-card flat tile class="d-flex">
                  <v-img
                    :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                    :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="8" offset-sm="2">
        <v-expansion-panels :accordion="true" :hover="true">
          <v-expansion-panel v-for="(item,index) in faq" :key="index">
            <v-expansion-panel-header>{{ item.question }}</v-expansion-panel-header>
            <v-expansion-panel-content>{{ item.answer }}</v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" xs="12" sm="8" offset-sm="2">
        <h3 class="headline">{{ $t('Please fill the form') }}</h3>
        <v-form ref="form" lazy-validation v-model="valid" class="elevation-2 grey lighten-4 pa-3 mt-5">
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

            <v-col cols="12" md="7">
              <v-text-field
                v-model="uploadInfo.companyWebsite"
                :rules="companyWebsiteRules"
                :label="$t('Company website')"
                color="blue darken-2"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-file-input
                show-size
                accept="image/*"
                label="Upload logo here"
                v-model="image"
                :rules="imageRules"
                required
              ></v-file-input>
            </v-col>

            <v-col cols="12" md="12">
              <v-color-picker class="ma-2" v-model="uploadInfo.color" :rules="colorRules" required></v-color-picker>
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
        color: null,
        filename: null
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
    };
  },

  components: {},

  computed: {},

  methods: {
    ...mapActions("app", {
      saveData: "save"
    }),

    async validate() {
      if (this.$refs.form.validate()) {
        this.saveLoading = true;
        let formData = new FormData();
        formData.append("files", this.image, this.image.name);

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
      var headers = { 'Content-Type': 'application/json', Accpet: '*/*' };
      this.provinceLoading = true;
      var res = await axios.post(`${this.basicUrl}/api/api.php?type=getStates&countryId=${e.value}&addClasses=states`, {}, headers);
      for (let key in res.data.result) {
        this.provinces.push({
          value: key,
          text: res.data.result[key]
        });
      }
      this.provinceLoading = false;
    },

    async provinceInput(e) {
      this.uploadInfo.province = e.text;
      this.selectedProvinceCode = e.value;
      var headers = { 'Content-Type': 'application/json', Accpet: '*/*' };
      this.cityLoading = true;
      var res = await axios.post(`${this.basicUrl}/api/api.php?type=getCities&countryId=${this.selectedCountryCode}&stateId=${this.selectedProvinceCode}&addClasses=cities`, {}, headers);
      for (let key in res.data.result) {
        this.cities.push({
          value: key,
          text: res.data.result[key]
        });
      }
      this.cityLoading = false;
    },

    cityInput(e) {
      this.uploadInfo.city = e.text;
    }
  },

  async mounted() {
    this.basicUrl = process.env.VUE_APP_ENVIRONMENT == 'development' ? '' : 'https://geodata.solutions';
    var headers = { 'Content-Type': 'application/json', Accpet: '*/*' };
    this.countryLoading = true;
    var res = await axios.post(`${this.basicUrl}/api/api.php?type=getCountries&addClasses=countries`, {}, headers);
    for (let key in res.data.result) {
      this.countries.push({
        value: key,
        text: res.data.result[key]
      });
    }
    this.countryLoading = false;
  }
};
</script>

<style scoped>
.submit-button {
  width: 200px;
}
</style>