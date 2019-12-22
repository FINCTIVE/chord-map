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
    <md-dialog :md-active.sync="showAbout" class="dialog-window">
      <div class="md-title">About</div>
      <div class="md-body-1">
        <p>联系开发者：finctive@qq.com</p>
        <p>各项功能还没有完成开发，欢迎提建议~</p>
        <p>本网站使用了以下开源框架：vuejs, vuematerial, draggable</p>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showAbout = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- KeyChooser Window-->
    <md-dialog :md-active.sync="showKeyChooser" class="dialog-window">
      <div class="md-title">Settings</div>
      <div>
        <md-radio v-model="settingTonicName" :value="'C'" v-on:change="changeTonic">C</md-radio>
        <md-radio v-model="settingTonicName" :value="'D'" v-on:change="changeTonic">D</md-radio>
        <md-radio v-model="settingTonicName" :value="'E'" v-on:change="changeTonic">E</md-radio>
        <md-radio v-model="settingTonicName" :value="'F'" v-on:change="changeTonic">F</md-radio>
        <md-radio v-model="settingTonicName" :value="'A'" v-on:change="changeTonic">A</md-radio>
        <md-radio v-model="settingTonicName" :value="'B'" v-on:change="changeTonic">B</md-radio>
      </div>
      <div>
        <md-radio v-model="settingScaleTypeName" :value="'Major'" v-on:change="changeScale">Major</md-radio>
        <md-radio v-model="settingScaleTypeName" :value="'Minor'" v-on:change="changeScale">Minor</md-radio>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showKeyChooser = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- Add Chord Window-->
    <md-dialog :md-active.sync="showAddChordOptions" class="dialog-window">
      <div class="md-title">Choose the chord number</div>
      <div>
        <md-radio v-model="newChordNumber" :value=1>1</md-radio>
        <md-radio v-model="newChordNumber" :value=2>2</md-radio>
        <md-radio v-model="newChordNumber" :value=3>3</md-radio>
        <md-radio v-model="newChordNumber" :value=4>4</md-radio>
        <md-radio v-model="newChordNumber" :value=5>5</md-radio>
        <md-radio v-model="newChordNumber" :value=6>6</md-radio>
        <md-radio v-model="newChordNumber" :value=7>7</md-radio>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showAddChordOptions = false; addNewChord()">Add</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- 和弦卡片排序 -->
    <draggable :list="list" :animation="200" ghost-class="ghost-chord" class="chord-sequencer">
      <ChordCard
        v-for="element in list"
        :key="element.chordCardId"
        :chordCardId="element.chordCardId"
        :chordRomanNumeral="musicTheory.songScale.getRomanNumerals(element.chordNumber)"
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
        { chordCardId: 2, chordNumber: 5 },
        { chordCardId: 3, chordNumber: 6 },
        { chordCardId: 4, chordNumber: 4 }
        // { chordCardId: 1, chordNumber: 1 },
        // { chordCardId: 2, chordNumber: 2 },
        // { chordCardId: 3, chordNumber: 3 },
        // { chordCardId: 4, chordNumber: 4 },
        // { chordCardId: 5, chordNumber: 5 },
        // { chordCardId: 6, chordNumber: 6 },
        // { chordCardId: 7, chordNumber: 7 }
      ],
      showAbout: false,
      showKeyChooser: false,
      showAddChordOptions: false,
      settingTonicName: 'C',
      settingScaleTypeName: 'Major',
      newChordNumber: 1,
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
    },
    addNewChord: function () {
      // 最后一个和弦的ID一定是最大的，新和弦递增
      if (this.list.length > 0) {
        this.list.push({ chordCardId: this.list[this.list.length - 1].chordCardId + 1, chordNumber: this.newChordNumber })
      } else {
        this.list.push({ chordCardId: 0, chordNumber: this.newChordNumber })
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
.top-menu .key-chooser-btn{
  text-transform: none !important;
}
.top-menu .about-btn {
  float: right;
}
.about {
  float: right;
}
.dialog-window * {
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
