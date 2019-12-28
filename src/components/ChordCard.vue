<template>
  <div class="chord-card">
    <a-card>
      <div>
          <span class="chord-number">{{ chordRomanNumeral }}</span>
          <span class="chord-name">{{ chordName }}</span>
      </div>
      <div>
        <span class="chord-note" v-for="note in chordStructure" :key="note">{{ note }}</span>
      </div>
      <a-button @click="$emit('remove-chord-card', chordCardId);">Remove</a-button>
    </a-card>
  </div>
</template>
<script>
export default {
  name: 'ChordCard',
  props: ['chordCardId', 'chordRomanNumeral', 'chordName', 'chordStructure']
}
</script>
<style scoped>
.chord-card {
  width: 15%;
  margin: 1%;
  display: inline-block;
}
.chord-name {
  float:right;
  opacity: 50%;
}
.chord-notes {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chord-note {
  margin: 0px 5%;
  opacity: 70%;
}
.content * {
  margin: 5% auto;
  display: inline-block;
  text-align: center;
}
</style>
