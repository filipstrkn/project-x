<template>
  <div class="room-avatar" :class="{ clickable, 'has-badge': room.not }" :style="styles">
      <span v-if="room.not" />
  </div>
</template>

<script>
export default {
    name: 'RoomAvatar',
    props: {
        clickable: {
            type: Boolean,
            default: false
        },
        room: {
            type: Object,
            required: true,
        }
    },
    computed: {
        styles() {
            return {
                backgroundColor: this.room.accent
            }
        }
    }
}
</script>

<style lang="stylus">

.room-avatar
    flex-shrink 0
    width 2em
    height @width
    border-radius 100%
    background alpha(#000, .1)
    display inline-block
    position relative

    &.has-badge::before
        content ""
        position absolute
        top 0
        right @top
        width .5em
        height @width
        background-color red
        border-radius 100%
        z-index 2

    &.clickable
        position relative
        &::after
            content ""
            position absolute
            left 50%
            top 50%
            transform translate(-50%, -50%)
            width 2em
            height @width
            border solid 2px alpha(#000, 0)
            border-radius 100%
            transition all 100ms ease-out

        &:hover::after
            width 2.6em
            height @width
            border-color alpha(#000, .16)
            border-color #000
            cursor pointer

</style>