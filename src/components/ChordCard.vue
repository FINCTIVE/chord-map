<template>
  <div id="chord-card-wrapper">
    <!-- 嵌套一层才能使用draggable,原因未知  -->
    <div id="chord-card">
      <!-- <a-card> -->
        <div id="chord-card-header">
            <span id="chord-number" >{{ chordRomanNumeral }}</span>
            <span id="chord-name">{{ chordName }}</span>
        </div>
        <div id="chord-structure">
          <span id="chord-note" v-for="note in chordStructure" :key="note">{{ note }}</span>
        </div>
        <a-button id="remove-btn" type="dashed" @click="$emit('remove-chord-card', chordCardId);">Remove</a-button>
      <!-- </a-card> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChordCard',
  props: ['chordCardId', 'chordRomanNumeral', 'chordName', 'chordStructure']
}
</script>
<style scoped>
span {
  font-size: 20px;
}

#chord-card-wrapper {
  margin: 1%;
}
#chord-card {
  width: 190px;
  display: inline-block;
  padding: 10px 20px;
  margin: 0 5%;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

#chord-card:hover {
  box-shadow: 0 5px 12px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.12);
}

#chord-card-header {
  display: flex;
}
#chord-name {
  margin-left: auto;
  /* float: right; */
}

#chord-structure {
  display: flex;
  justify-content: center;
  align-items: center;
}

#chord-note {
  margin: 8% 5%;
}

#remove-btn {
  float: right;
}
</style>
