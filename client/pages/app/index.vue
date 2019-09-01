<template>
  <main>
    <header-bar scrolled>

      <nuxt-link
        :to="'/app'"
        slot="logo"
      >
        <search-button />
      </nuxt-link>

      <div slot="main">
        <horizontal-groups />
      </div>

      <user-avatar
          slot="actions"
          clickable
        />

    </header-bar>
  </main>
</template>

<script>
import HeaderBar from '@/components/Header'
import SearchButton from '@/components/Header/SearchButton'
import HorizontalGroups from '@/components/Header/HorizontalGroups'
import UserAvatar from '@/components/Avatars/UserAvatar'

export default {
  middleware: 'auth',
  components: {
    HeaderBar,
    HorizontalGroups,
    UserAvatar,
    SearchButton
  }
}
</script>