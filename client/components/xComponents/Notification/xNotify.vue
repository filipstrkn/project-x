<template>
    <ul>
        <x-notify-card :notification="{type: 'danger'}" />
    </ul>
</template>

<script>
import xNotifyCard from './xNotifyCard'

export default {
    name: 'xNotify',
    components: { xNotifyCard }
}
</script>


<style lang="stylus" scoped>

ul
    position fixed
    bottom 0
    left 50%
    transform translateX(-50%)
    width 100%
    max-width 30em
    padding 0 1em
    box-sizing border-box

</style>


