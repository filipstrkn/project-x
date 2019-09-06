<template>
    <section id="ModalBlock">
        <div @click="closeModal" class="overlay"></div>
        <div class="modal-body">
            <div>
                <input type="text" />
            </div>
            <ul>
                <li></li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ModalBlock',
    methods: {
        closeModal() {
            this.$store.commit('TOGGLE_QUICK', false)
        }
    },
    mounted() {
        document.addEventListener('keydown', (e) => {
            if (e.metaKey && e.keyCode === 80) {
                e.preventDefault()
                this.$store.commit('TOGGLE_QUICK')
            }
            if (this.$store.state.quick && e.key === 'Escape') {
                this.$store.commit('TOGGLE_QUICK', false)
            }
        })
    },
    beforeDestroy() {
        document.removeEventListener('keydown')
    }
}
</script>

<style lang="stylus" scoped>

#ModalBlock
    position fixed
    top 0
    left 0
    z-index 10
    width 100vw
    height 100vh
    display flex
    justify-content center
    align-items center

.overlay
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color alpha(#000, .2)

.modal-body
    background-color #fff
    width 10em
    height 12em
    z-index 10
    border-radius 8px
    box-shadow 0 3px 10px alpha(#000, .1)

</style>