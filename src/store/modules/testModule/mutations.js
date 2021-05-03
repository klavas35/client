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
    }
}