import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  strict: true,

  state: {
  },

  mutations: {    // Commit and track state changes

  },

  actions: {  // Async API requests and updating state through mutations

  },

  getters: {    // Access state (can also filter state data here)

  },

});
