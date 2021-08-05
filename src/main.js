/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//base
import BaseButton from "./components/ui/BaseButton.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseLogin from "./components/ui/BaseLogin.vue";
import BaseLink from "./components/ui/BaseLink.vue";
import BasePost from "./components/ui/BasePost";
import BaseSpinner from "./components/ui/BaseSpinner";
import BaseDialog from "./components/ui/BaseDialog";
import googleAuth from "vue3-google-oauth2";
//app
const app = createApp(App);

const googleAuthOptions = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: "https://www.googleapis.com/auth/userinfo.profile",
  prompt: "select_account",
  fetch_basic_profile: true
};
//component
app.component("base-button", BaseButton);
app.component("base-card", BaseCard);
app.component("base-login", BaseLogin);
app.component("base-link", BaseLink);
app.component("base-post", BasePost);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);
app.use(store);
app.use(googleAuth, googleAuthOptions);
app.use(router);

app.mount("#app");
