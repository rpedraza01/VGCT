<template>
  <div class="jwt-test">
    <div fluid>
      <h1>JSON Web Token Test</h1>
      <input v-model="username" placeholder="username here..." />
      <input v-model="password" placeholder="password here..." />
      <button @click="getToken">Get token from Django backend</button>
      <button @click="deleteToken">Remove token from Vue frontend</button>
      <h3>Access token:</h3>
      <p>{{access}}</p>
      <h3>Refresh token:</h3>
      <p>{{refresh}}</p>
      <button @click="inspectToken">Inspect token</button>
      <button @click="testAPI">Test Protected Django API</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import store from '../store/index.js'


export default {
  name: "jwtTest",
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    getToken() {
      // call state obtain token here
      const payload = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("obtainToken", payload);
    },
    inspectToken() {
      this.$store.dispatch("inspectToken");
    },
    deleteToken() {
      this.$store.dispatch("deleteToken");
    },
    testAPI() {
      axios({
        method: "get",
        url: "http://localhost:8000/api/v1/testAuthentication", // Update our API for this
        headers: {
          authorization: `Bearer ${this.access}`
        }
      })
        .then(response => alert(response.data.message))
        .catch(error => {
          alert("Error with request...not authenticated");
          console.log(error);
        });
    }
  },
  computed: {
    access() {
      return this.$store.getters.accessToken;
    },
    refresh() {
      return this.$store.getters.refreshToken;
    }
  }
};
</script>