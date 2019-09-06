export default {

    SET_AUTH(state, isLogedIn) {
        state.auth = isLogedIn
    },


    TOGGLE_QUICK(state, payload) {
        if (payload && typeof payload === 'boolean') {
            state.quick = payload
        } else {
            state.quick = !state.quick
        }
    }

}