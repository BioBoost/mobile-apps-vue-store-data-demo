import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import UserApi from "@/services/UserApi";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  strict: true,

  state: {
    users: []
  },

  mutations: {    // Commit and track state changes

    setUsers(state, users) {
      state.users = users
    },

    updateUser(state, payload) {
      const user = state.users.find(u => u.id === payload.id);
      Object.assign(user, payload);   // Copies properties => reactivity OK!

      // Also see: https://gist.github.com/BioBoost/3eda05866ac4154a56d67ff9673c9fae
    }

  },

  actions: {  // Async API requests and updating state through mutations

    // Returns nothing
    // Actually not needed as users data is updated and reactivity takes
    // care of the rest
    fetchUsers( {commit} ) {
      console.log("Fetching users from the API ...");
      UserApi.getUsers().then((list => {
        commit("setUsers", list);
      }));
    },

    // But if you want to display message on fail or something
    // a promise needs to be returned
    fetchUsersWithFeedback( {commit} ) {
      console.log("Fetching users from the API with feedback ...");

      return new Promise((resolve, reject) => {
        UserApi.getUsers().then((list => {
          commit("setUsers", list);
          resolve('All good');
        }))
        .catch(error => {
          reject(error);
        });
      });
    },

    updateUserNickname( {commit}, { userId, nickname }) {

      console.log("Updating user nickname to " + nickname);

      UserApi.changeNickname(userId, nickname)
      .then(user => { // user is response of the API
        commit('updateUser', user);
      })

    }
  },

  getters: {    // Access state (can also filter state data here)

    users(state) {
      return state.users;
    },

  },

});
