<template>
  <main>
    <header-bar scrolled>

      <div class="add-property" slot="logo">
          <i class="icon ion-md-add" />
      </div>

      <div slot="main">
        <horizontal-groups />
      </div>

      <search-button slot="actions" />
      <user-avatar
          slot="actions"
          clickable
        />
    </header-bar>

    <modal-block v-show="$store.state.quick" />

  </main>
</template>

<script>
import HeaderBar from '@/components/Header'
import SearchButton from '@/components/Header/SearchButton'
import HorizontalGroups from '@/components/Header/HorizontalGroups'
import UserAvatar from '@/components/Avatars/UserAvatar'
import ModalBlock from '@/components/Modal'

export default {
  middleware: 'auth',
  components: {
    HeaderBar,
    HorizontalGroups,
    UserAvatar,
    SearchButton,
    ModalBlock
  },
  data: () => ({
    form: '',
    key: false,
  }),
  mounted() {
    // document.addEventListener('keydown', (e) => {
    //   if (e.metaKey && e.keyCode === 80) {
    //     e.preventDefault()
    //     this.$store.commit('TOGGLE_QUICK')
    //   }
    //   if (this.$store.state.quick && e.key === 'Escape') {
    //     this.$store.commit('TOGGLE_QUICK', false)
    //   }
    // })
  }
}
</script>


<style lang="stylus" scoped>

main
  padding-top 3.8rem

.add-property
  flex-shrink: 0
  width: 2em
  height: @width
  border-radius: 100%
  background-color: white
  border: solid 1px var(--border-color)
  display: flex
  justify-content: center
  align-items: center
  margin: 0.36em
  cursor: pointer
  color: alpha(#000, 0.65)

  &:hover
    color: #000
    border-color: @color

</style>