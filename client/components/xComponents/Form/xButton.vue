<template>
    <button @click.prevent="onAction" class="x-button">
        <slot />
    </button>
</template>

<script>
export default {
    name: 'xButton',
    methods: {
        onAction() {
            this.$emit('action')
        }
    }
}
</script>