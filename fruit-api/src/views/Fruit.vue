<template>
  <div class="fruit" v-if="fruit !== null">
    <h1>{{fruit.name}}</h1>
    <img :src="fruit.image" :alt="fruit.name">
    <div>Taste: {{fruit.taste}}</div>
    <div>{{fruit.description}}</div>
    <div>Price: {{format_price(fruit.price)}}</div>
  </div>
</template>


<script>
import fruits_api from '@/data/fruits'

export default {
  name: 'Fruit',
  data() {
    return {
      fruit: null
    }
  },
  methods: {
    format_price(price_str) {
      return price_str + ' €'
    }
  },
  mounted() {
    fruits_api.get_one_async(this.$route.params.id).then(resp => {
        console.log(resp.data) 
        this.fruit = resp.data
      })
     .catch((e) => console.error(e) && alert('Fruit api not responding..'))
  },
}
</script>

<style scoped>
h1 {
  text-transform: capitalize;
}
img {
  height: 5em;
  width: 5em;
}
</style>
