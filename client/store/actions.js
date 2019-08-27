export default {


    nuxtServerInit({ commit }, { req }) {
        if (req.session) {
            console.log('Whaaaaaaaaaaaaaat?')
        }
    },


    authUser() {

    }

}