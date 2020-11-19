<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>

      <v-row align="center" justify="center">

        <v-col cols="4" v-for="user in users" :key="user.id">
          <v-card outlined>

            <v-card-text>
              Name: {{ user.name }}
            </v-card-text>

            <v-card-text>
              Nickname: {{ user.nickname }}
            </v-card-text>

            <v-card-actions>
              <v-btn block color="primary" @click="randomizeNickname(user.id)">Randomize Nickname</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>

      <v-row align="center" justify="center">
        <v-col cols="4">
          <v-btn block color="secondary" @click="fetchUsers()">Refresh</v-btn>
        </v-col>
      </v-row>

    </v-main>
  </v-app>
</template>

<script>
import UserApi from "@/services/UserApi"

export default {
  name: 'App',

  created() {
    this.fetchUsers();
  },

  components: {
  },

  data: () => ({
    users: []
  }),

  methods: {
    fetchUsers() {
      UserApi.getUsers().then((list => {
        this.users = list;
      }));
    },
    randomizeNickname(userId) {
      const nicknames = [
        'Fluffy', 'X-Ray', 'Donkey', 'Shrubbery', 'Stanley', 'Doctor Dry'
      ];
      let newNickname = nicknames[Math.floor(Math.random() * Math.floor(nicknames.length))];
      console.log(newNickname);
      UserApi.changeNickname(userId, newNickname).then(user => {
        console.log('New user: ' + user);
      })
    }
  }
};
</script>
