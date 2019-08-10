<template>
    <div :class="['x-input', width, { 'active': isActive }]">

        <label v-if="typeof label === 'string' && label !== ''">
            {{ label }}<span v-if="type === 'password'"> {{ strength }}</span>
        </label>

        <input
            v-model="inputVal"
            :type="inputType"
            @input="onInput"
            @focus="toggleActive(false)"
            @blur="isEmpty"
        />

        <div class="input__sides x-box">
            <div
                v-if="isActive && validate"
                class="input__validation"
                :class="isValid && 'is-valid'">
                <i v-show="isValid"  class="icon ion-md-checkmark" />
            </div>

            <div
                v-if="type === 'password'"
                @click="toggleEye"
                class="input__icon">
                <i class="icon" :class="blink ? 'ion-md-eye-off' : 'ion-md-eye'" />
            </div>
        </div>

    </div>
</template>


<script>
export default {
    name: 'xInput',
    props: {
        value: {
            required: true
        },
        label: {
            type: String,
            required: false,
            default: ''
        },
        type: {
            type: String,
            required: false,
            default: 'text',
            validator: (val) => ['text', 'password', 'email'].includes(val)
        },
        size: {
            type: String,
            required: false
        },
        validate: {
            type: String,
            required: false
        },
        isValid: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    data() {
        return {
            inputVal: this.value,
            isActive: false,
            blink: false,
            strength: ''
        }
    },
    watch: {
        inputVal(val) {
            this.$emit('input', val)
        }
    },
    computed: {
        width() {
            return this.size && 'is-' + this.size
        },
        inputType() {
            return this.blink
            ? 'text'
            : this.type
        },
    },
    methods: {
        onInput() {
            if (this.validate && this.validate === 'email') {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                this.$emit('onValidate', re.test(this.inputVal.toLowerCase().trim()))
            }
            if (this.validate && this.validate === 'password') {
                this.strength = this.getStrength(this.inputVal)
            }

        },
        toggleActive(val) {
            this.isActive = !val
        },
        isEmpty(e) {
            this.toggleActive(!!!e.target.value.length)
        },
        toggleEye() {
            this.blink = !this.blink
        },
        getStrength(str) {
            const strongRe = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
            const mediumRe = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")

            if (strongRe.test(str)) return '😍'
            else if (mediumRe.test(str)) return '🙂'
            else if (str.length > 3) return '😳'
            return ''
        }
    }

}
</script>

<style lang="stylus" scoped>
.input__sides
    position absolute
    top 50%
    right .3em
    transform: translateY(-50%)
    align-items center

    & > *
        flex-grow 0
        flex-shrink 0


.input__icon,
.input__validation
    position relative
    border-radius: 100%
    i
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -50%)


.input__icon
    border: solid 1px #cacaca
    width: 2.4em
    height @width
    transition: border-color 150ms ease-out
    cursor pointer

.input__validation
    transform: scale(.3)
    border-radius: 100%
    background-color #000
    margin .36em
    width: 1.6em
    height @width
    text-align: center
    line-height: 1.6
    transition: all 250ms ease-out

    &.is-valid
        background-color #eedeff
        transform: scale(1)
</style>
