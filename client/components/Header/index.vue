<template>

    <header>
        <section class="header__logo">
            <slot name="logo" />
        </section>
        <section class="header__main" :class="{ 'scrolled': scrolled }">
            <slot name="main" />
        </section>
        <section class="header__actions">
            <slot name="actions" />
        </section>
    </header>

</template>

<script>
export default {
    name: 'HeaderBar',
    props: {
        scrolled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="stylus" scoped>

header
    position fixed
    display flex
    justify-content space-between
    width 100%
    height var(--header-height)
    background-color alpha(#fff, .98)
    overflow hidden
    // background-color blue

    & > section
        flex-grow 1
        display flex
        align-items center
        overflow hidden

.header__main
    &.scrolled
        white-space nowrap
        overflow-x scroll
        height calc(var(--header-height) + 25px)
        display block

.header__logo,
.header__actions
    flex-shrink 0
    flex-grow 0
    display flex
    justify-content flex-end
    padding 0 1em
.header__logo
    padding-right 0

</style>