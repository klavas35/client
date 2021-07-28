<template>
  <div>
    <button v-if="!isAccountValid" @click="loginViaGoogle">
      sign in
    </button>
    <button v-if="isAccountValid" @click="handleClickSignOut">
      sign out
    </button>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
import store from "../store";
export default {
  props: {
    msg: String
  },
  data() {
    return {
      user: ""
    };
  },
  computed:{
    isAccountValid() {
      return store.getters['isAccountValid']
    }
  },
  methods: {
    async loginViaGoogle() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }

        const user = {
          name: googleUser.getBasicProfile().ET,
          surname: googleUser.getBasicProfile().GR,
          gId: googleUser.getBasicProfile().$R,
          email: googleUser.getBasicProfile().zt,
          idToken: googleUser.getAuthResponse().id_token
        };
        jwt.sign(
          { user: user },
          process.env.VUE_APP_JWT_SECRET,
          (err, token) => {
            if (err) {
              console.log(err);
            }
            store.dispatch("jwtToken", token)
          }
        );
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        this.user = "";
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 1em;
}
button:disabled {
  background: #fff;
  color: #ddd;
  cursor: not-allowed;
}
</style>
