<template>
  <div class="search-button">
      <i class="icon ion-md-search" />
  </div>
</template>

<script>
export default {
    name: 'SearchButton'
}
</script>

<style lang="stylus" scoped>

.search-button
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