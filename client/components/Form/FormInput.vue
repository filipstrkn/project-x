<template>
    <div :class="['form--input', width, { 'active': isActive }]">

        <label v-if="typeof label === 'string' && label !== ''">{{ label }}</label>
        <input
            :type="inputType"
            @focus="activate"
            @blur="checkContent"
        />

        <i v-if="type === 'password'"
            @click="toggleEye"
            class="icon form--input__icon"
            :class="blink ? 'ion-md-eye' : 'ion-md-eye-off'">
        </i>

    </div>
</template>


<script>
export default {
    name: 'FormInput',
    props: {
        label: {
            type: String,
            required: false,
            default: ''
        },
        type: {
            type: String,
            required: false,
            default: 'text'
        },
        size: {
            type: String,
            required: false
        },
        validation: {
            type: String,
            required: false
        }
    },
    data: () => ({
        isActive: false,
        blink: false
    }),
    computed: {
        width() {
            return this.size && 'is-' + this.size
        },
        isValid: {
            set(val) {

            },
            get() {

            }
        },
        inputType() {
            return this.blink
            ? this.type
            : 'text'
        }
    },
    methods: {
        activate() {
            this.isActive = true
        },
        toggleActive(val) {
            if (val) {
                this.isActive = false
            } else {
                this.isActive = true
            }
        },
        checkContent(e) {
            this.toggleActive(!!!e.target.value.length)
        },
        onValidate() {
            this.$emit('onValidate')
        },
        toggleEye() {
            this.blink = !this.blink
        }
    }

}
</script>

<style lang="stylus">
@import "~assets/stylus/form/input"

</style>
