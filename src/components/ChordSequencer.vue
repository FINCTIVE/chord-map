<template>
  <div id="chord-sequencer-wrapper">
    <draggable :list="list" :animation="200" id="chord-sequencer">
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
    <a-button id="add-btn" shape="circle" icon="plus" size="large" @click="$emit('add-chord')"/>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import ChordCard from './ChordCard.vue'
export default {
  name: 'ChordSequencer',
  components: {
    draggable,
    ChordCard
  },
  props: ['musicTheory', 'list'],
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
#chord-sequencer-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}

#chord-sequencer {
  flex-basis: 70%;
  display: inline-flex ;
  flex-wrap: wrap;
  justify-content: center;
}
#add-btn {
  flex-basis: auto;
  display: inline-flex;
  justify-content: center;
  margin-left: 1%;
}
</style>
