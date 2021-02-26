<template>
  <div class="home">
    <ul>
      <li v-for="item in fruits" :key="item.id">
        <base-fruit :fruit="item"/>
      </li>
    </ul>
  </div>
</template>

<script>

import BaseFruit from '@/components/BaseFruit.vue'
import {mapState} from "vuex";

export default {
  name: 'Home',
  components: {
    BaseFruit
  },
  computed: mapState(['fruits']),
  created() {
    this.$store.dispatch('load_fruits');
  },
}
</script>

<style scoped>
ul {
  padding: 0;
}
.home {
  max-width: 800px;
  margin: auto;
}
</style>
