<template>
  <div id="app">
    <!-- 图标字体导入 -->
    <link
      href="https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.min.css"
      rel="stylesheet"
    />
    <div class="top-menu" md-elevation="0">
      <md-button class="md-primary key-chooser-btn" @click="showKeyChooser = true"><md-icon>music_note</md-icon>KEY Cm</md-button>
      <md-button class="md-primary about-btn" @click="showAbout = true">ABOUT</md-button>
    </div>
    <!-- About -->
    <md-dialog-alert
      :md-active.sync="showAbout"
      md-content="Helloooo!"
      md-confirm-text="Close" />
    <md-dialog :md-active.sync="showKeyChooser">
      <md-dialog-title>Choose Your Key</md-dialog-title>
      <md-content>
          <md-radio v-model="radio" :value="false">Boolean</md-radio>
          <md-radio v-model="radio" value="my-radio">String</md-radio>
          <md-radio v-model="radio" :value="objA">Object A</md-radio>
          <md-radio v-model="radio" :value="objB">Object B</md-radio>
          <md-radio v-model="radio" :value="objB">Object B</md-radio>
          <md-radio v-model="radio">No Value</md-radio>
          <md-radio v-model="radio" disabled>Disabled</md-radio>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showKeyChooser = false">Close</md-button>
        <md-button class="md-primary" @click="showKeyChooser = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <div class="chord-sequencer">
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
      dragging: false,
      showAbout: false,
      showKeyChooser: false
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
.top-menu {
  position: fixed;
  top:0;
  width:100%;
}
.top-menu .key-chooser-btn{
  text-transform: none !important;
}
.top-menu .about-btn{
  float: right;
}
.about {
  float : right;
}
.chord-sequencer {
  padding-top: 30px;
  width: 500px;
  margin: 20px auto;
}
</style>
