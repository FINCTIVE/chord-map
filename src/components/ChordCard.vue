<template>
    <div>
        <md-card class="chord-card">
          <md-card-header>
            <div class="md-title">{{ chordName }}</div>
          </md-card-header>
          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
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
  props: ['chordName']
}
</script>
<style scoped>
.chord-card{
  margin: 20px auto;
  display: block;
}
</style>
