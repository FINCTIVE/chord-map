<template>
  <div>
    <div class="container">
      <button class="md-button" @click="add">Add</button>
      <button class="md-button" @click="replace">Replace</button>
      <!-- 设置是否禁用拖拽 -->
      <!-- <input id="disabled" type="checkbox" v-model="enabled" class="form-check-input" />
      <label class="form-check-label" for="disabled">DnD enabled</label> -->
      <div class="chord-container">
        <draggable
          :list="list"
          :disabled="!enabled"
          :animation="200"
          class="list-group"
          ghost-class="ghost-chord"
          :move="checkMove"
          @start="dragging = true"
          @end="dragging = false"
        >
          <div v-for="element in list" :key="element.name">
            <ChordCard v-bind:chordName="element.name"></ChordCard>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ChordCard from '../components/ChordCard.vue'
let id = 1
export default {
  name: 'Home',
  components: {
    draggable,
    ChordCard
  },
  data () {
    return {
      enabled: true,
      list: [
        { name: 'wula', id: 0 },
        { name: 'Joao', id: 1 },
        { name: 'C#', id: 2 },
        { name: 'J-FLAT', id: 3 },
        { name: 'GIAO', id: 4 }
      ],
      dragging: false
    }
  },
  computed: {
  },
  methods: {
    add: function () {
      this.list.push({ name: 'Juan ' + id, id: id++ })
    },
    replace: function () {
      this.list = [{ name: 'Edgard', id: id++ }]
    },
    checkMove: function (e) {
      window.console.log('Future index: ' + e.draggedContext.futureIndex)
    }
  }
}
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost-chord {
  opacity: 0.5;
}
/* .list-group{
  opacity: 0.5;
} */
</style>
