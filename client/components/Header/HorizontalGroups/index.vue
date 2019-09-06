<template>
    <div class="groups">

        <draggable
            v-model="rooms"
            v-bind="dragOptions"
            tag="section"
            @start="toggleDragging"
            @end="toggleDragging"
            class="group"
        >
            <room-avatar
                v-for="(room, index) in rooms"
                :key="`${room.name} + ${index}`"
                :room="room"
                clickable
            />
        </draggable>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import RoomAvatar from "@/components/Avatars/RoomAvatar"

export default {
  name: "HorizontalGroups",
  components: { RoomAvatar, draggable },
  data: () => ({
      drag: false,
      rooms: [
        { name: 'Cus', accent: '#ffead5', not: false },
        { name: 'Cau', accent: '#d5e0ff', not: true },
        { name: 'Cau', accent: '#ffd9d9', not: true },
        { name: 'Cau', accent: '#ffd5fb', not: false },
        { name: 'Cau', accent: '#ffead5', not: false },
        { name: 'Cau', accent: '#ffead5', not: false },
        { name: 'Oi', accent: '#ffead5', not: false }
      ]
  }),
  computed: {
    dragOptions: () => ({
      animation: 150,
      group: "description",
      disabled: false,
      ghostClass: "ghost"
    })
  },
  methods: {
      toggleDragging() {
          this.drag = !this.drag
      }
  }
}
</script>

<style lang="stylus" scoped>
.groups
    display: flex
    align-items: center
    height: var(--header-height)


  .group
    display: flex
    align-items: center
    height: 3.6em
    margin-right: 1em
    padding-right: @margin-right
    // border-right: 1px solid alpha(#000, .1)

    & > *
      margin: 0.36em



  // & > section:last-of-type
  //     margin-right: 0
  //     padding-right: 0
  //     border: none
  //     & > *
  //       opacity .3
  //       transition opacity 150ms ease-out

  //     &:hover > *
  //       opacity 1


.actions
  padding: 0 1em




.ghost
    // opacity 0 !important
    background none !important
    border dashed 1px var(--border-color)
    &::after,
    &::before
      content ""
      display none !important


// .AHOJ
//     background-color red !important

</style>