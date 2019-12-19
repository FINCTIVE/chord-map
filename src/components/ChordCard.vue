<template>
  <div>
    <md-card class="chord-card">
      <md-card-header>
        <div class="md-title">{{ getChordNumber(chordNumber) }}</div>
      </md-card-header>
      <md-card-content class="content">
        <div class="name">keyName {{ keyName }}</div>
        <div class="consist">structure</div>
      </md-card-content>
      <md-card-actions>
        <md-button>Remove</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
export default {
  name: 'ChordCard',
  props: ['chordNumber', 'keyName'],
  methods: {
    getChordNumber: function (n) {
      let numbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
      return numbers[n - 1]
    }
  }
}
</script>
<style scoped>
.chord-card {
  width: 45%;
  margin: 2% auto;
  display: block;
}
.content * {
  margin: 5% auto;
  display: inline-block;
  text-align: center;
}
</style>
