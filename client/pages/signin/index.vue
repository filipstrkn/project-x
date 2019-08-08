 <template>
    <section id="Signin">

        <form action="">
            <h3>Sign in</h3>
            <div v-show="step === 0">
                <x-input
                    v-model="form.email"
                    :label="'email'"
                    :error="'Please enter a valid email'"
                />
                <div class="x-box is-justified-right">
                    <x-button @action="onSubmit">
                        Next
                    </x-button>
                </div>
            </div>

            <div v-show="step === 1">
                <x-input
                    v-model="form.password"
                    :label="'password'"
                    :type="'password'"
                    :error="'Please enter a valid email'"
                />
                <div class="x-box is-justified-between">
                    <x-button @action="makeStep(false)">
                        <i class="icon x-input__icon ion-md-arrow-back" />
                    </x-button>
                    <x-button @action="onSubmit" class="is-primary is-large">Login</x-button>
                </div>
            </div>
        </form>

    </section>
</template>


<script>
import xInput from '~/components/xComponents/Form/xInput'
import xButton from '~/components/xComponents/Form/xButton'

export default {
    name: 'SigninPage',
    layout: 'simple',
    data: () => ({
        step: 0,
        steps: [
            {
                model: 'email',
                label: 'email',
                type: 'text',
                error: 'Please enter a valid email'
            },
            {
                model: 'password',
                label: 'password',
                type: 'password',
                error: 'your password should'
            }
        ],
        finalStep: 1,
        form: {
            email: null,
            password: null
        }
    }),
    components: {
        xInput,
        xButton
    },
    methods: {
        makeStep(where) {
            this.step = where
                ? ( this.step + 1 )
                : ( this.step - 1 )
        },
        signIn(form) {
            fetch('POST', {

            })
            // if success
            // -> change route
            // -> repeat
        },
        onSubmit() {
            if (this.step === this.finalStep) this.signIn(this.form)
            else this.makeStep(true)
        }
    }
}
</script>


<style lang="stylus" scoped>
@import "~assets/stylus/button"

#Signin
    display flex
    align-items center
    justify-content center
    height 100vh
    width 100%

    h3
        text-align center

    form
        width 20em
        height @width

.x-box
    display flex
    &.is-justified-between
        justify-content space-between

    &.is-justified-right
        justify-content flex-end

</style>
