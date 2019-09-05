<template>
    <div class="groups">

        <!-- <draggable
            v-model="pinned"
            v-bind="dragOptions"
            tag="section"
            @start="toggleDragging"
            @end="toggleDragging"
            class="group"
        >
            <room-avatar
                v-for="(room, index) in pinned"
                :key="`${room.name} + ${index}`"
                clickable
                :room="room"
            />
        </draggable> -->

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
      pinned: [
          { name: 'Ola', accent: '#343090', not: 0 },
          { name: 'Bom Dia', accent: '#5f59f7', not: 3 },
        { name: 'Ahoj', accent: '#5f59f7', not: 10 },
          ],
      rooms: [
        { name: 'Cus', accent: '#a1ffe3', not: 0 },
        { name: 'Cau', accent: '#44c2fd', not: 1 },
        { name: 'Cau', accent: '#44c2fd', not: 2 },
        { name: 'Cau', accent: '#44c2fd', not: 0 },
        { name: 'Cau', accent: '#44c2fd', not: 0 },
        { name: 'Cau', accent: '#44c2fd', not: 0 },
        { name: 'Oi', accent: '#8c61ff', not: 0 }
      ]
  }),
  computed: {
    dragOptions() {
        return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
        };
    }
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
    opacity 0 !important

// .AHOJ
//     background-color red !important

</style>