<template>
  <main>
    <header-bar scrolled>
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
import HorizontalGroups from '@/components/Header/HorizontalGroups'
import UserAvatar from '@/components/Avatars/UserAvatar'

export default {
  middleware: 'auth',
  components: {
    HeaderBar,
    HorizontalGroups,
    UserAvatar
  }
}
</script>