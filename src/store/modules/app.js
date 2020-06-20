import APIService from '@/apiservice/api.js';
import {
  SET_USER_PROFILE,
} from "../mutation-types";

const API = new APIService();

const state = {
  user: {}
};

const getters = {
  user: state => state.user,
};

const mutations = {
  [SET_USER_PROFILE]: (state, payload) => {
    state.user = payload;
  },
};

const actions = {
  save: async ({ commit }, payload) => {
    let headers = { };
    return API.post(`/upload`, payload, headers).then(res => {
      // commit(SET_USER_PROFILE, res.data);
      return res.data;
    }).catch(err => {
      return err;
    });
  },

  getCountries: async ({ commit }) => {
    let headers = { };
    return API.get(`/getCountries`, headers).then(res => {
      // commit(SET_USER_PROFILE, res.data);
      return res;
    }).catch(err => {
      return err;
    });
  },

  getStates: async ({ commit }, payload) => {
    let headers = { };
    return API.get(`/getStates?countryId=${payload.countryId}`, headers).then(res => {
      // commit(SET_USER_PROFILE, res.data);
      return res;
    }).catch(err => {
      return err;
    });
  },

  getCities: async ({ commit }, payload) => {
    let headers = { };
    return API.get(`/getCities?countryId=${payload.countryId}&stateId=${payload.stateId}`, headers).then(res => {
      // commit(SET_USER_PROFILE, res.data);
      return res;
    }).catch(err => {
      return err;
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
