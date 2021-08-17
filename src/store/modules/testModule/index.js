import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
export default {
    state() {
        return {
            isLogged: false,
            isValid:{},
            googleAccountIsValid:false,
            facebookAccountLoggedIn:false
        }
    },
    mutations,
    actions,
    getters
}