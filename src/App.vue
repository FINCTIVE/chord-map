<template>
  <div id="app">
    <!-- 页面顶端的工具栏 -->
    <div id="toolbar">
      <a-button id="setting-btn" @click="showKeyChooser = true">
        <a-icon type="setting" />KEY {{musicTheory.songScale.getChord(1).getName()}}
      </a-button>
      <a-button id="github-btn" @click="openGithubPage">
        <a-icon type="github" />Github
      </a-button>
      <a-button id="about-btn" @click="showAboutInfo = true">
        <a-icon type="message" />About
      </a-button>
    </div>

    <!-- 调性设置 -->
    <a-modal title="Settings" v-model="showKeyChooser" @ok="changeSettings">
      <div>
        <a-radio-group v-model="settingTonicName" buttonStyle="solid">
          <a-radio-button value="C">C</a-radio-button>
          <a-radio-button value="D">D</a-radio-button>
          <a-radio-button value="E">E</a-radio-button>
          <a-radio-button value="F">F</a-radio-button>
          <a-radio-button value="G">G</a-radio-button>
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

    <!-- 添加和弦窗口 -->
    <a-modal title="Chord Number" v-model="showAddChordOptions" @ok="addNewChord">
      <a-radio-group v-model="newChordNumber">
        <a-radio :value=1>{{musicTheory.songScale.getRomanNumerals(1)}}</a-radio>
        <a-radio :value=2>{{musicTheory.songScale.getRomanNumerals(2)}}</a-radio>
        <a-radio :value=3>{{musicTheory.songScale.getRomanNumerals(3)}}</a-radio>
        <a-radio :value=4>{{musicTheory.songScale.getRomanNumerals(4)}}</a-radio>
        <a-radio :value=5>{{musicTheory.songScale.getRomanNumerals(5)}}</a-radio>
        <a-radio :value=6>{{musicTheory.songScale.getRomanNumerals(6)}}</a-radio>
        <a-radio :value=7>{{musicTheory.songScale.getRomanNumerals(7)}}</a-radio>
      </a-radio-group>
    </a-modal>

    <!-- 关于信息 -->
    <a-drawer
      title="About"
      :placement="'bottom'"
      :closable="true"
      :visible="showAboutInfo"
      @close="showAboutInfo = false"
    >
      <div id="about-info">
        <p>Created by FINCTIVE(镜岛)</p>
        <p>
          Built with
          <a href="https://vuejs.org/" target="_blank">Vue.js</a>,
          <a href="https://www.antdv.com" target="_blank">Ant Design of Vue</a>,
          <a href="https://g6.antv.vision/" target="_blank">AntV-G6</a>,
          <a href="https://sortablejs.github.io/Vue.Draggable" target="_blank">VueDraggable</a>
        </p>
        <p>Do you have any suggestions? Please send me an email!😀</p>
        <p>Contact: finctive@qq.com</p>
      </div>
    </a-drawer>

    <!-- 和弦走向图 -->
    <ChordMap
    :musicTheory="musicTheory"
    :musicTheorySongScale="musicTheory.songScale.getScaleTypeName()"
    :list="list"
    />

    <!-- 和弦卡片 -->
    <ChordSequencer
    :musicTheory="musicTheory"
    :list.sync="list"
    @add-chord="showAddChordOptions = true"
    />
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
      lastChordCardId: 5, // 记录最后一个和弦卡片的id
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
      this.list.push({ chordCardId: this.lastChordCardId + 1, chordNumber: this.newChordNumber })
      this.lastChordCardId += 1
      this.showAddChordOptions = false
    },
    openGithubPage: function () {
      window.open('https://github.com/FINCTIVE/chord-helper')
    }
  }
}
</script>
<style scoped>
#toolbar{
  margin: 0.5% 0;
  display: flex;
}

#toolbar *{
  margin: 0 0.5%;
}

#toolbar #github-btn{
  margin-left: auto;
}
</style>
