 <template>
    <section id="Login">

        <div class="signin-body">
            <h3>Reset password</h3>
            <div>
                <x-input
                    v-model="form.email"
                    :label="steps.email.label"
                    :type="steps.email.type"
                    :validate="'email'"
                    :isValid="steps.email.valid"
                    @onValidate="val => (steps.email.valid = val)"
                />
                <div class="x-box">
                    <x-button
                        class="x-box--child is-flex is-primary"
                        :disabled="!steps.email.valid"
                        @action="makeStep(true)">
                        Reset
                    </x-button>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import xInput from '~/components/xComponents/Form/xInput'
import xButton from '~/components/xComponents/Form/xButton'

export default {
    data: () => ({
        steps: {
            email: {
                label: 'email',
                type: 'email',
                valid: false,
                validate: true
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
            fetch('http://localhost:3002/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.form)
            })
            .then(res => {
                if (res.status === 200) return res.json()
                if (res.status >= 400 && res.status < 500) {
                    // run and error dialog
                }
            })
            .then(tokens => {
                console.log(tokens.access_token)
                // save tokens to local storage
                // move to project page
            })
            .catch(err => {
                console.log(err)
            })
        },
        onSubmit() {
            this.signIn(this.form)
        }
    }
}
</script>


<style lang="stylus" scoped>
#Login
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

.signin-body
    margin-bottom 10vh
</style>
