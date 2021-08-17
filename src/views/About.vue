<template>
  <h2>{{ FBstatus }}</h2>
  <button v-if="!FBstatus" @click="loginWithFacebook">
    LOGIN WITH FACEBOOK
  </button>
  <button v-else @click="logOutFromFacebook">LOGOUT FROM FACEBOOK</button>
</template>

<script>
import store from "../store";
/* eslint-disable */

export default {
  computed: {
    FBstatus() {
      return store.getters["isFacebookLoggedIn"];
    }
  },
  methods: {
    loginWithFacebook() {
      FB.login(
        response => {
          if (response.authResponse) {
            console.log(`this is response : ${JSON.stringify(response)}`);

            FB.api("/me", {fields: 'first_name, last_name, email'}, (user) => {
              console.log(`this is user ${JSON.stringify(user)}`);
              const fbUser ={
                name : user.first_name,
                surname: user.last_name,
                email:user.email,
                facebookId:user.id,
                accessToken:response.authResponse.accessToken,
                type:'facebookRegister'
              }
              store.dispatch("registerUser", fbUser);
            });
            return;
          }
          console.log("login error");
        },
        { scope: "public_profile,email", enable_profile_selecto: true }
      );
    },
    logOutFromFacebook() {
        store.dispatch('logOutFromFacebook')
    }
  }
};
</script>

<style></style>
