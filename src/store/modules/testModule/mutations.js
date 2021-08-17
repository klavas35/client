export default {
    autoLog(state, payload) {
        state.isLogged = payload
    },
    validator(state, payload) {
        const validator = {
            length: payload.length,
            hasNum: payload.hasNum,
            hasUpper: payload.hasUpper,
            hasLow: payload.hasLow,
            hasSpecial: payload.hasSpecial
        }
        state.isValid=validator
    },
    userValidity(state, payload) {
        state.userIsValid = payload
    },
    changeGoogleValidity(state, payload) {
        state.googleAccountIsValid = payload
    },
    facebookLoginMutation(state, payload) {
        if(payload) {
            state.facebookAccountLoggedIn=true
            console.log('logged in with face');
            return;
        }
        state.facebookAccountLoggedIn = false
    }
}