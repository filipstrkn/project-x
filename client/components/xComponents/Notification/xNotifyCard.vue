<template>
    <li :class="classStyle">
        <span class="close">
            <i class="icon ion-md-close" />
        </span>
        <div class="body">
            I am a notification card
        </div>
    </li>
</template>

<script>
export default {
    name: 'xNotifyCard',
    props: {
        notification: {
            type: Object,
            required: true
        }
    },
    computed: {
        classStyle() {
            return 'is-' + this.notification.type
        }
    }
}
</script>


<style lang="stylus" scoped>
@import "~assets/xStyles/_variables"

li
    position relative
    display block
    min-height: 6em
    width 100%
    margin .6em 0
    border-radius 8px
    border solid 1px

    &.is-danger
        background-color PINK
        border-color PINK - 16

    &.is-info
        background-color BLUE
        border-color BLUE - 16

.close
    position absolute
    padding .6em
    top .2em
    right .2em
    opacity .6
    cursor pointer
    width 2em
    height @width
    display flex
    justify-content space-between
    align-items center

.body
    padding 1em

</style>


