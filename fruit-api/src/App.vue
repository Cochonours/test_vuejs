<template>
  <div id="app">
    <ul>
      <li v-for="item in fruits" :key="item.id">
        <base-fruit :fruit="item"/>
      </li>
    </ul>
  </div>
</template>

<script>
import BaseFruit from './components/BaseFruit.vue'
import fruits_api from './data/fruits'

export default {
  name: 'App',
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
     .catch(() => alert('Fruit api not responding..'))
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  list-style-type: none;
}
</style>
