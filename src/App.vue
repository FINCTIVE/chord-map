<template>
  <div id="app">
    <!-- 图标字体 -->
    <link
      href="https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.min.css"
      rel="stylesheet"
    />
    <div class="chord-editor">
      <draggable
        :list="list"
        :disabled="!enabled"
        :animation="200"
        ghost-class="ghost-chord"
        :move="checkMove"
        @start="dragging = true"
        @end="dragging = false"
      >
        <div v-for="element in list" :key="element.name">
          <ChordCard v-bind:chordName="element.name"></ChordCard>
        </div>
      </draggable>
      <button class="md-button" @click="add">Add</button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ChordCard from './components/ChordCard.vue'
let id = 1
export default {
  name: 'App',
  components: {
    draggable,
    ChordCard
  },
  data () {
    return {
      enabled: true,
      list: [
        { name: 'I', id: 1 },
        { name: 'II', id: 2 },
        { name: 'III', id: 3 },
        { name: 'IV', id: 4 },
        { name: 'V', id: 5 },
        { name: 'VI', id: 6 },
        { name: 'VII', id: 7 }
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
.ghost-chord-card {
  opacity: 0.5;
}
.chord-editor {
  width: 500px;
  margin: 20px auto;
}
</style>
