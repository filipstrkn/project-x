<template>

    <div class="form__text-input">
        <label v-if="typeof label === 'string' && label !== ''" for="">{{ label }}</label>
        <input type="text" />
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
        }
    }
}
</script>

