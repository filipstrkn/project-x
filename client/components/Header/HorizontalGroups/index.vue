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

        <div class="add-property">
            <i class="icon ion-md-add" />
        </div>
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
          ],
      rooms: [
        { name: 'Ola', accent: '#343090', not: 0 },
        { name: 'Bom Dia', accent: '#5f59f7', not: 3 },
        { name: 'Ahoj', accent: '#5f59f7', not: 10 },
        { name: 'Cus', accent: '#a1ffe3', not: 0 },
        { name: 'Cau', accent: '#44c2fd', not: 1 },
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
    border-right: 1px solid var(--border-color)

    & > *
      margin: 0.36em



  & > section:last-of-type
      margin-right: 0
      padding-right: 0
      border: none


.actions
  padding: 0 1em


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

.ghost
    opacity 0

// .AHOJ
//     background-color red !important

</style>