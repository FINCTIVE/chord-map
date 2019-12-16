<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <DND msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import DND from '@/components/DND.vue'

export default {
  name: 'home',
  components: {
    DND
  }
}
</script>
