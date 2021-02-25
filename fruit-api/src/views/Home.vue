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
import fruits_api from '@/data/fruits'

export default {
  name: 'Home',
  components: {
    BaseFruit
  },
  data() {
    return {
      fruits: []
    }
  },
  mounted() {
    // Get the list of fruits and update our data for display
    fruits_api.get_all_async().then(fruits => this.fruits = fruits)
     .catch((e) => console.error(e) && alert('Fruit api not responding..'))
  },
}
</script>
