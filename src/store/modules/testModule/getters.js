export default {
    getAuth(state) {
        return state.isLogged
    },
    isValid(state) {
        return state.isValid
    },
    validUser(state) {
        return state.userIsValid
    }
}