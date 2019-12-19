<template>
  <div id="app">
    <!-- 图标字体导入 -->
    <link
      href="https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.min.css"
      rel="stylesheet"
    />
    <!-- 顶端工具栏 -->
    <div class="top-menu" md-elevation="0">
      <md-button class="md-primary key-chooser-btn" @click="showKeyChooser = true">
        <md-icon>music_note</md-icon>
        KEY {{keyName}}
      </md-button>
      <md-button class="md-primary about-btn" @click="showAbout = true">ABOUT</md-button>
    </div>
    <!-- About -->
    <md-dialog-alert :md-active.sync="showAbout" md-content="Helloooo!" md-confirm-text="Close" />
    <!-- KeyChooser Window-->
    <md-dialog :md-active.sync="showKeyChooser" class="music-options">
      <md-dialog-title>Settings</md-dialog-title>
      <div class="key-chooser-options">
        <md-radio v-model="musicKey" :value="'C'">C</md-radio>
        <md-radio v-model="musicKey" :value="'D'">D</md-radio>
        <md-radio v-model="musicKey" :value="'E'">E</md-radio>
        <md-radio v-model="musicKey" :value="'F'">F</md-radio>
        <md-radio v-model="musicKey" :value="'A'">A</md-radio>
        <md-radio v-model="musicKey" :value="'B'">B</md-radio>
      </div>
      <div class="scale-chooser-options">
        <md-radio v-model="musicScale" :value="'Major'">Major</md-radio>
        <md-radio v-model="musicScale" :value="'Minor'">Minor</md-radio>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showKeyChooser = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- 和弦排序 -->
    <draggable :list="list" :animation="200" ghost-class="ghost-chord" class="chord-sequencer">
      <ChordCard v-for="element in list"
      :key="element.chordCardId"
      :chordNumber="element.chordNumber"
      :keyName="keyName"
      :chordCardId="element.chordCardId"
      v-on:remove-chord-card="removeChordCard"></ChordCard>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ChordCard from './components/ChordCard.vue'
export default {
  name: 'App',
  components: {
    draggable,
    ChordCard
  },
  data () {
    return {
      list: [
        { chordCardId: 1, chordNumber: 1 },
        // { chordCardId: 2, chordNumber: 4 },
        // { chordCardId: 3, chordNumber: 3 },
        // { chordCardId: 5, chordNumber: 4 },
        // { chordCardId: 32, chordNumber: 3 },
        // { chordCardId: 232, chordNumber: 3 },
        { chordCardId: 3211, chordNumber: 3 },
        { chordCardId: 82, chordNumber: 3 },
        { chordCardId: 44, chordNumber: 7 }
      ],
      showAbout: false,
      showKeyChooser: false,
      musicKey: 'C',
      musicScale: 'Major'
    }
  },
  computed: {
    keyName: function () {
      let scale = ''
      if (this.musicScale === 'Major') { scale = '' } else { scale = 'm' }
      return this.musicKey + scale
    }
  },
  methods: {
    removeChordCard: function (chordCardID) {
      let index = 0
      for (; this.list[index].chordCardId !== chordCardID; ++index);
      if (index > -1) {
        this.list.splice(index, 1)
      }
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
  top: 0;
  width: 100%;
}
.top-menu .key-chooser-btn {
  text-transform: none !important;
}
.top-menu .about-btn {
  float: right;
}
.about {
  float: right;
}
.music-options * {
  margin: 2em;
  margin-top: 1em;
  margin-bottom: 1em;
}
.chord-sequencer {
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
