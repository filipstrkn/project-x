 <template>
    <section id="Signin">

        <div class="signin-bpdy">
            <h3>Sign in</h3>
            <div v-show="steps.current === 0">
                <x-input
                    v-model="form.email"
                    :label="steps.email.label"
                    :type="steps.email.type"
                    :error="steps.email.error"
                    :validate="'email'"
                    :isValid="steps.email.valid"
                    @onValidate="val => (steps.email.valid = val)"
                />
                <div class="x-box">
                    <x-button
                        class="x-box--child is-flex"
                        :disabled="!steps.email.valid"
                        @action="makeStep(true)">
                        Next
                    </x-button>
                </div>
            </div>

            <div v-show="steps.current === 1">
                <x-input
                    v-model="form.password"
                    :label="steps.password.label"
                    :type="steps.password.type"
                    :error="steps.password.error"
                />

                <div class="x-box is-justified-between">
                    <x-button
                        @action="makeStep(false)">
                        <i class="icon ion-md-arrow-back" />
                    </x-button>
                    <x-button
                        class="x-box--child is-primary is-large"
                        :disabled="!(form.password.length > 3)"
                        @action="onSubmit">
                        Login
                    </x-button>
                </div>
            </div>
        </div>


        <nuxt-link class="x-link" :to="'/'">I am new here</nuxt-link>
        <nuxt-link class="x-link" :to="'/'">I have forgot password</nuxt-link>

    </section>
</template>


<script>
import xInput from '~/components/xComponents/Form/xInput'
import xButton from '~/components/xComponents/Form/xButton'

export default {
    name: 'SigninPage',
    layout: 'simple',
    data: () => ({
        steps: {
            current: 0,
            email: {
                label: 'email',
                type: 'text',
                error: 'Please enter a valid email',
                valid: false,
                validate: true
            },
            password: {
                label: 'password',
                type: 'password',
                error: 'your password should'
            }
        },
        form: {
            email: '',
            password: ''
        }
    }),
    components: {
        xInput,
        xButton
    },
    methods: {
        makeStep(where) {
            this.steps.current = where
                ? ( this.steps.current + 1 )
                : ( this.steps.current - 1 )
        },
        signIn(form) {
            fetch('POST', {

            })
            // if success
            // -> change route
            // -> repeat
        },
        onSubmit(e) {
            e.preventDefault()
            this.signIn(this.form)
        }
    }
}
</script>


<style lang="stylus">
@import "~assets/stylus/button"
@import "~assets/stylus/link"

#Signin
    display flex
    flex-direction column
    align-items center
    justify-content center
    height 100vh
    width 100%

    h3
        text-align center

    & > div
        width 20em

.x-box
    display flex
    &.is-justified-between
        justify-content space-between

    &.is-justified-right
        justify-content flex-end


.x-box--child
    &.is-right
        align-self flex-end
    &.is-flex
        flex 1

.signin-bpdy
    margin-bottom 10vh

</style>
