 <template>
    <section id="Signin">

        <form action="">
            <h3>Sign in</h3>
            <form-input
                :label="'email'"
                :type="'email'"
                :error="'Please enter a valid email'"
            />
            <button>Next</button>
        </form>

        <!-- <component :is="" /> -->

    </section>
</template>


<script>
import FormInput from '~/components/Form/FormInput'

export default {
    name: 'SigninPage',
    layout: 'simple',
    data: () => ({
        email: null,
        password: null
    }),
    components: {
        FormInput
    },
    computed: {

    }
}
</script>


<style lang="stylus">

</style>
