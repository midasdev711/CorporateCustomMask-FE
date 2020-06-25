<template>
  <v-container fluid tag="section">
    <v-row>
      <v-col cols="12" xs="12" sm="6" offset-sm="3">
        <h1 class="text-font1 text-center heading1 font-weight-bold">{{ $t('Text1') }}</h1>
        <h2 class="display-4 text-center text-font1 mb-5">{{ $t('Text2') }}</h2>
        <p class="text-center text-font2 pt-2">{{ $t('Text3') }}</p>
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
          {{ $t('Text4') }}
        </v-btn>
        <p class="display-1 mt-4 text-font2">
          {{ $t('Text5') }}
          <br><br>
          {{ $t('Text6') }}
          <br><br>
          {{ $t('Text7') }}
          <br><br>
          {{ $t('Text8') }}
          <br><br>
          {{ $t('Text9') }}
          <br><br>
          {{ $t('Text10') }}
          <br><br>
          {{ $t('Text11') }}
        </p>
      </v-col>
      <v-col cols="12" xs="12" sm="10" offset-sm="1">
        <v-divider :inset="false" :light="true"></v-divider>
      </v-col>
      <v-col cols="12" xs="12" sm="6" offset-sm="3" class="text-center">
        <h2 class="text-font1 text-center display-4">{{ $t('Text12') }}</h2>
        <p class="text-center text-font2 pt-2">{{ $t('Text13') }}</p>
      </v-col>
      <v-col cols="12" xs="12" sm="8" offset-sm="2" class="mt-2">
        <img src="@/assets/banner.png" width="100%" class="img-responsive">
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
              <v-text-field
                :rules="countryRules"
                :label="$t('Country')"
                color="blue darken-2"
                v-model="uploadInfo.country"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                :rules="provinceRules"
                :label="$t('Province')"
                color="blue darken-2"
                v-model="uploadInfo.province"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                :rules="cityRules"
                :label="$t('City')"
                color="blue darken-2"
                v-model="uploadInfo.city"
                required
              ></v-text-field>
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
                    :label="$t('Required delivery date')"
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
                :label="$t('Upload logo here')"
                v-model="image"
                :rules="imageRules"
                :hint="$t('sizelimit')"
                persistent-hint
                required
                clearable
                @change="fileUpdate"
              ></v-file-input>
            </v-col>

            <v-col cols="12">
              <h3 class="headline">{{ $t('Select 3 colors for your company masks') }}</h3>
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
              <v-btn :disabled="!valid" color="darkgrey darken-3" class="mb-4 mx-auto display-2 submit-button" @click="validate" :loading="saveLoading">{{ $t('Save') }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-dialog v-model="notification" persistent max-width="900">
      <v-card class="pt-3 pb-3">
        <v-card-text>
          <h2 class="text-font2 display-2 text-center">{{ $t('modal-text1') }}<br><br>{{ $t('modal-text2') }}</h2>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darkgrey darken-3" class="display-2" @click="goToMainSite">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      fileSizeValid: true,
      notification: false,
      notificationText: null,
      timeout: 3000,
      color: null,
      basicUrl: null,
      nameRules: [v => !!v || this.$t("Name is required")],
      companyNameRules: [v => !!v || this.$t("Company name is required")],
      cityRules: [v => !!v || this.$t("City is required")],
      provinceRules: [v => !!v || this.$t("Province is required")],
      countryRules: [v => !!v || this.$t("Country is required")],
      companyWebsiteRules: [v => !!v || this.$t("Company website url is required")],
      firstNameRules: [v => !!v || this.$t("First name is required")],
      lastNameRules: [v => !!v || this.$t("Last name is required")],
      phoneRules: [
        v => /^[0-9.-]+$/.test(v) || this.$t("Phone number must be valid")
      ],
      emailRules: [
        v => !!v || this.$t("E-mail is required"),
        v => /.+@.+/.test(v) || this.$t("E-mail must be valid")
      ],
      imageRules: [
        v => !!v || this.$t("Image is required"),
        v => this.fileSizeValid || this.$t("File size exceeded")
      ],
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
        offset: 150,
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

    goToMainSite() {
      this.notification = false;
      window.location.href='https://legaleriste.com';
    },

    fileUpdate(file) {
      this.fileSizeValid = file && file.size > 10000000 ? false : true;
    },

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
      if (e == null) {
        return;
      }
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
      if (e == null) {
        return;
      }
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
      if (e == null) {
        return;
      }
      this.uploadInfo.city = e.text;
    }
  },

  async mounted() {
    this.countryLoading = true;
    var res = await this.getCountries();
    this.countries = Object.assign([], res);
    this.countries.unshift({
      text: "Canada",
      value: "CA"
    }, {
      text: "United States",
      value: "US"
    });
    
    this.countryLoading = false;
  }
};
</script>

<style scoped>
.submit-button {
  width: 300px;
}

.text-font1 {
  font-family: 'Garamond'!important;
}

.text-font2 {
  font-family: 'Circular Std Bold'!important;
}

.heading1 {
  font-size: 54px;
}
</style>