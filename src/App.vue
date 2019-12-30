<template>
  <div id="app">
    <div id="content">
      <div id="toolbar">
        <a-button @click="showKeyChooser = true">
          <a-icon type="setting" />KEY {{musicTheory.songScale.getChord(1).getName()}}
        </a-button>
        <a-button @click="showAddChordOptions = true">
          <a-icon type="plus" />New Card
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
      <draggable :list="list" :animation="200" ghost-class="ghost-chord-card" id="chord-sequencer">
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
    removeChordCard: function (chordCardID) {
      let index = 0
      for (; this.list[index].chordCardId !== chordCardID; ++index);
      if (index > -1) {
        this.list.splice(index, 1)
      }
    },
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

.ghost-chord-card {
  opacity: 0.5;
}

#chord-sequencer {
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#about-info {
  padding: 0 2%;
}
</style>
