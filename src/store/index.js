import axios from 'axios'
import { createStore } from 'vuex'
import {app} from "../main";

axios.defaults.baseURL = "https://alumni-softeng-api.herokuapp.com/api/";
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status == 401) {
      app.config.globalProperties.$router.push({ name: "login" });
    }

    return Promise.reject(err);
  }
);

export default createStore({
  state: {
    loggedIn: {},
    user: [],
    alumni: [],
    profile: {}
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },
    users(state) {
      return state.users;
    },
    alumni(state) {
      return state.alumni;
    },
    profile(state) {
      return state.profile;
    }
  },
  mutations: {
    loggedIn(state, payload) {
      state.loggedIn = payload;
    },
    users(state, payload) {
      state.users = payload;
    },
    alumni(state, payload) {
      state.alumni = payload;
    },
    profile(state, payload) {
      state.profile = payload;
    },
  },
  actions: {
    async login(context, data) {
      await axios.post('login', data).then((res) => {
        console.log(res);
        context.commit('loggedIn', res.data);
        // localStorage.setItem('token')
      })
    },
    async register(context, data) {
      await axios.post('register', data);
    },
    async users(context) {
      await axios.get('users').then((res) => {
        context.commit('users', res.data);
      })
    },
    async alumni(context) {
      await axios.get('users?role=2').then((res) => {
        context.commit('alumni', res.data);
      })
    },
    async profile(context) {
      await axios.get('profile').then((res) => {
        context.commit('profile', res.data);
      })
    }
  }
})
