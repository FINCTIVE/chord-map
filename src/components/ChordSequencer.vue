<template>
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
    <a-button shape="circle" icon="plus" size="large" @click="$emit('add-chord')"/>
  </draggable>
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
/* .ghost-chord-card {
  opacity: 0.5;
} */
</style>
