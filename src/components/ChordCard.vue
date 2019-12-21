<template>
  <div class="chord-card">
    <md-card md-with-hover>
      <md-card-header>
        <div>
          <span class="chord-number md-title">{{ chordRomanNumeral }}</span>
          <span class="chord-name md-title">{{ chordName }}</span>
        </div>
      </md-card-header>
      <md-card-content class="chord-notes">
        <span class="chord-note md-headline" v-for="note in chordStructure" :key="note">{{ note }}</span>
      </md-card-content>
      <md-card-actions>
        <md-button @click="$emit('remove-chord-card', chordCardId);">Remove</md-button>
      </md-card-actions>
    </md-card>
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
