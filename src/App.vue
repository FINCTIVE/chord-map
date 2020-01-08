<template>
  <div id="app">
    <div id="content">
      <div id="toolbar">
        <a-button @click="showKeyChooser = true">
          <a-icon type="setting" />KEY {{musicTheory.songScale.getChord(1).getName()}}
        </a-button>
        <a-button id="about-btn" @click="showAboutInfo = true">
          <a-icon type="message" />About
        </a-button>
      </div>
      <a-modal title="Settings" v-model="showKeyChooser" @ok="changeSettings">
        <div>
          <a-radio-group v-model="settingTonicName" buttonStyle="solid">
            <a-radio-button value="C">C</a-radio-button>
            <a-radio-button value="D">D</a-radio-button>
            <a-radio-button value="E">E</a-radio-button>
            <a-radio-button value="F">F</a-radio-button>
            <a-radio-button value="A">A</a-radio-button>
            <a-radio-button value="B">B</a-radio-button>
          </a-radio-group>
        </div>
        <br/>
        <div>
          <a-radio-group v-model="settingScaleTypeName" buttonStyle="solid">
            <a-radio-button value="Major">Major</a-radio-button>
            <a-radio-button value="Minor">Minor</a-radio-button>
          </a-radio-group>
        </div>
      </a-modal>
      <a-modal title="Choose the chord number" v-model="showAddChordOptions" @ok="addNewChord">
        <a-radio-group v-model="newChordNumber">
          <a-radio :style="radioStyle" :value=1>1</a-radio>
          <a-radio :style="radioStyle" :value=2>2</a-radio>
          <a-radio :style="radioStyle" :value=3>3</a-radio>
          <a-radio :style="radioStyle" :value=4>4</a-radio>
          <a-radio :style="radioStyle" :value=5>5</a-radio>
          <a-radio :style="radioStyle" :value=6>6</a-radio>
          <a-radio :style="radioStyle" :value=7>7</a-radio>
        </a-radio-group>
      </a-modal>
      <a-drawer
        title="About"
        :placement="'bottom'"
        :closable="true"
        :visible="showAboutInfo"
        @close="showAboutInfo = false"
      >
        <div id="about-info">
          <p>
            Built with
            <a href="https://vuejs.org/">Vue.js</a>
          </p>
          <p>Contact: finctive@qq.com</p>
        </div>
      </a-drawer>
      <ChordMap id="chord-map"
      :musicTheory="musicTheory"
      :musicTheorySongScale="musicTheory.songScale"
      />
      <ChordSequencer id="chord-sequencer"
      :musicTheory="musicTheory"
      :list.sync="list"
      @add-chord="showAddChordOptions = true"
      />
    </div>
  </div>
</template>

<script>
import { MusicTheory } from './musicTheory.js'
import ChordSequencer from './components/ChordSequencer.vue'
import ChordMap from './components/ChordMap.vue'
export default {
  name: 'App',
  components: {
    ChordSequencer,
    ChordMap
  },
  data () {
    return {
      list: [
        { chordCardId: 1, chordNumber: 1 },
        { chordCardId: 2, chordNumber: 5 },
        { chordCardId: 3, chordNumber: 6 },
        { chordCardId: 4, chordNumber: 4 }
      ],
      showKeyChooser: false,
      showAddChordOptions: false,
      showAboutInfo: false,
      settingTonicName: 'C',
      settingScaleTypeName: 'Major',
      newChordNumber: 1,
      musicTheory: new MusicTheory('C', 'Major')
    }
  },
  methods: {
    changeSettings: function (scale) {
      this.musicTheory.songScale = new this.musicTheory.Scale(this.settingTonicName, this.settingScaleTypeName)
      this.showKeyChooser = false
    },
    addNewChord: function () {
      // 最后一个和弦的ID一定是最大的，新和弦ID递增
      if (this.list.length > 0) {
        this.list.push({ chordCardId: this.list[this.list.length - 1].chordCardId + 1, chordNumber: this.newChordNumber })
      } else {
        this.list.push({ chordCardId: 0, chordNumber: this.newChordNumber })
      }
      this.showAddChordOptions = false
    }
  }
}
</script>
<style scoped>
#toolbar{
  margin: 0 0.5%;
  display: flex;
  align-items: left;
}
#toolbar *{
  margin: 1% 0.5%;
}
#toolbar #about-btn{
  margin-left: auto;
}

#chord-map {
  display: flex;
  justify-content: center;
}

#chord-sequencer {
  display: flex;
  justify-content: center;
  align-items: center;
}

#about-info {
  padding: 0 2%;
}
</style>
