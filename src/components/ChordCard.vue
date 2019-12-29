<template>
  <div id="chord-card">
    <a-card>
      <div>
          <span id="chord-number" class="music-info">{{ chordRomanNumeral }}</span>
          <span id="chord-name" class="music-info">{{ chordName }}</span>
      </div>
      <div id="chord-structure" class="music-info">
        <span id="chord-note" v-for="note in chordStructure" :key="note">{{ note }}</span>
      </div>
      <a-button id="remove-btn" type="dashed" @click="$emit('remove-chord-card', chordCardId);">Remove</a-button>
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
.music-info {
  font-size: 20px;
}
#chord-card {
  width: 15%;
  margin: 1%;
  display: inline-block;
}
#chord-name {
  float: right;
  opacity: 85%;
}
#chord-structure {
  display: flex;
  justify-content: center;
  align-items: center;
}
#chord-note {
  margin: 8% 5%;
  opacity: 80%;
}
#remove-btn {
  float: right;
}
</style>
