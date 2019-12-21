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
        <!-- <md-icon>music_note</md-icon> -->
        KEY {{musicTheory.songScale.getChord(1).getName()}}
      </md-button>
      <md-button class="md-primary add-btn" @click="showAddChordOptions = true">
        Add Chord
      </md-button>
      <md-button class="md-primary about-btn" @click="showAbout = true">ABOUT</md-button>
    </div>
    <!-- About -->
    <md-dialog-alert :md-active.sync="showAbout" md-content="Helloooo!" md-confirm-text="Close" />
    <!-- KeyChooser Window-->
    <md-dialog :md-active.sync="showKeyChooser" class="music-options">
      <md-dialog-title>Settings</md-dialog-title>
      <div class="key-chooser-options">
        <md-radio v-model="settingTonicName" :value="'C'" v-on:change="changeTonic">C</md-radio>
        <md-radio v-model="settingTonicName" :value="'D'" v-on:change="changeTonic">D</md-radio>
        <md-radio v-model="settingTonicName" :value="'E'" v-on:change="changeTonic">E</md-radio>
        <md-radio v-model="settingTonicName" :value="'F'" v-on:change="changeTonic">F</md-radio>
        <md-radio v-model="settingTonicName" :value="'A'" v-on:change="changeTonic">A</md-radio>
        <md-radio v-model="settingTonicName" :value="'B'" v-on:change="changeTonic">B</md-radio>
      </div>
      <div class="scale-chooser-options">
        <md-radio v-model="settingScaleTypeName" :value="'Major'" v-on:change="changeScale">Major</md-radio>
        <md-radio v-model="settingScaleTypeName" :value="'Minor'" v-on:change="changeScale">Minor</md-radio>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showKeyChooser = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- Add Chord -->
    <md-dialog :md-active.sync="showAddChordOptions" class="music-options">
      <md-dialog-title>未完成</md-dialog-title>

      施工施工施工
      <md-dialog-actions>
        <md-button class="md-primary" @click="showAddChordOptions = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- 和弦排序 -->
    <draggable :list="list" :animation="200" ghost-class="ghost-chord" class="chord-sequencer">
      <ChordCard
        v-for="element in list"
        :key="element.chordCardId"
        :chordCardId="element.chordCardId"
        :chordNumber="musicTheory.songScale.getRomanNumerals(element.chordNumber)"
        :chordName="musicTheory.songScale.getChord(element.chordNumber).getName()"
        :chordStructure="musicTheory.songScale.getChord(element.chordNumber).structure.map(x => x.getName())"
        v-on:remove-chord-card="removeChordCard"
      ></ChordCard>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ChordCard from './components/ChordCard.vue'
import { MusicTheory } from './musicTheory.js'

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
        { chordCardId: 3211, chordNumber: 2 },
        { chordCardId: 82, chordNumber: 3 },
        { chordCardId: 44, chordNumber: 4 }
      ],
      showAbout: false,
      showKeyChooser: false,
      showAddChordOptions: false,
      settingTonicName: 'C',
      settingScaleTypeName: 'Major',
      musicTheory: new MusicTheory('C', 'Major')
    }
  },
  methods: {
    removeChordCard: function (chordCardID) {
      let index = 0
      for (; this.list[index].chordCardId !== chordCardID; ++index);
      if (index > -1) {
        this.list.splice(index, 1)
      }
    },
    changeTonic: function (tonic) {
      this.musicTheory.songScale = new this.musicTheory.Scale(this.settingTonicName, this.settingScaleTypeName)
    },
    changeScale: function (scale) {
      this.musicTheory.songScale = new this.musicTheory.Scale(this.settingTonicName, this.settingScaleTypeName)
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
.top-menu .key-chooser-btn{
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
