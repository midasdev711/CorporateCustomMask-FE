import axios from 'axios';
require("dotenv").config();

const API_URL = process.env.VUE_APP_ES_API_ROOT;
const mode = process.env.VUE_APP_ENVIRONMENT;

export default class ElasticSearch {
  get(sub_url, data, headers = {}) {
    let url = `/api${sub_url}`;

    return axios.get(url, {
      headers: {
        ...headers
      },
      data: data
    })
    .then(response => {
      return response.data;
    })
    .catch(e => {
      throw e;
    });
  }

  post(sub_url, content, headers = {}) {
    let url = `/api${sub_url}`;
    return axios.post(url, content, {
      headers: {
        ...headers,
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (typeof(response.data) == 'string') {
        return JSON.parse(response.data);
      }
      return response.data;
    })
    .catch(e => {
      throw e;
    });
  }

  // patch(sub_url, content, headers = {}) {
  //   let token = localStorage.getItem("token");

  //   let url = `${API_URL}` + sub_url;
  //   return axios.patch(url, content, {
  //     headers: {
  //       ...headers,
  //       Authorization: "bearer " + token,
  //     }
  //   })
  //   .then(response => {
  //     return response.data;
  //   })
  //   .catch(e => {
  //     if (e.response.status == 401) {
  //     }
  //     throw e;
  //   });
  // }

  // delete(sub_url, headers = {}) {
  //   let token = localStorage.getItem("token");

  //   let url = `${API_URL}` + sub_url;
  //   return axios.delete(url, {
  //     headers: {
  //       ...headers,
  //       Authorization: "bearer " + token,
  //     }
  //   })
  //   .then(response => {
  //     return response.data;
  //   })
  //   .catch(e => {
  //     if (e.response.status == 401) {
  //     }
  //     throw e;
  //   });
  // }
};
