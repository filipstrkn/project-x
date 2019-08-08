<template>
    <div :class="['x-input', width, { 'active': isActive }]">

        <label
            v-if="typeof label === 'string' && label !== ''"
        >
        {{ label }}
        <span v-if="type === 'password'">{{ strength }}</span>
        </label>
        <input
            v-model="inputVal"
            :type="inputType"
            @input="setStrength"
            @focus="activate"
            @blur="checkContent"
        />

        <i v-if="type === 'password'"
            @click="toggleEye"
            class="icon x-input__icon"
            :class="blink ? 'ion-md-eye-off' : 'ion-md-eye'">
        </i>

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
        },
        getStrength(str) {

            const strongRe = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
            const mediumRe = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")

            if (strongRe.test(str)) {
                console.log('strong')
                return '😍'

            } else if (mediumRe.test(str)) {
                console.log('medium')
                return '🙂'

            } else if (str.length > 3) {
                console.log('weak')
                return '😳'
            }
            return ''
        },
        setStrength(){
            this.strength = this.getStrength(this.inputVal)
        }
    }

}
</script>

<style lang="stylus">
@import "~assets/stylus/form/input"

</style>
