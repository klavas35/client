/* eslint-disable */
import {
    createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//base
import BaseButton from './components/ui/BaseButton.vue'
import BaseCard from './components/ui/BaseCard.vue'
import BaseLogin from './components/ui/BaseLogin.vue'
import BaseLink from './components/ui/BaseLink.vue'
import BasePost from './components/ui/BasePost'
import BaseSpinner from './components/ui/BaseSpinner'
import BaseDialog from './components/ui/BaseDialog'
//app
const app = createApp(App)
//component
app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-login', BaseLogin)
app.component('base-link', BaseLink)
app.component('base-post', BasePost)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)
app.use(store)
app.use(router)
app.mount("#app");