<template>
    <div
        v-if="notifications > 0"
        class="notification-badge"
    >
        <span>{{ maxNotifications }}</span>
    </div>
</template>

<script>
export default {
    name: 'NotificationBadge',
    props: {
        notifications: {
            type: Number,
            required: true
        }
    },
    computed: {
        maxNotifications() {
            if (this.notifications > 100) return `100+`
            return this.notifications
        }
    }
}
</script>

<style lang="stylus" scoped>

.notification-badge
    position absolute
    top -.2em
    right -.2em
    border-radius 30em
    min-width 1em
    height 1em
    background-color red
    color white
    z-index 2
    padding .2em
    display flex
    justify-content center
    align-items center
    span
        font-size .65em
</style>