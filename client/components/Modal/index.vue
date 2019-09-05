<template>
  <section id="ModalBlock">
      <div @click="closeModal" class="overlay"></div>
  </section>
</template>

<script>
export default {
    name: 'ModalBlock',
    methods: {
        closeModal() {

        }
    },
    mounted() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                document.body.style.background = 'none'
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

</style>