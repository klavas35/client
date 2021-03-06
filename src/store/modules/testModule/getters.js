export default {
    getAuth(state) {
        return state.isLogged
    },
    isValid(state) {
        return state.isValid
    },
    validUser(state) {
        return state.userIsValid
    },
    isAccountValid(state) {
        return state.googleAccountIsValid
    },
    isFacebookLoggedIn(state) {
        return state.facebookAccountLoggedIn
    }
}