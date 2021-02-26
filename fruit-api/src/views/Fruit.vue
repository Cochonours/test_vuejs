<template>
  <div class="fruit" :style="cssProps" v-if="fruit !== null">
    <h1>{{fruit.name}}</h1>
    <img :src="fruit.image" :alt="fruit.name">
    <p>Taste: {{fruit.taste}}</p>
    <p>{{fruit.description}}</p>
    <p>Price: {{format_price(fruit.price)}}</p>
  </div>
</template>


<script>

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
  created() {
    this.$store.dispatch('get_fruit', this.$route.params.id)
      .then((fruit) => this.fruit = fruit)
  },
  computed: {
    cssProps() {
      return {
        '--fruit_color': this.fruit.color,
      }
    },
  },
}
</script>

<style scoped>
.fruit {
  margin: 1em;
  border: var(--fruit_color) 2px solid;
  color: var(--fruit_color);
  border-radius: 1em;

  max-width: 800px;
  margin: auto;
}
h1 {
  text-transform: capitalize;
}
img {
  height: 5em;
  width: 5em;
}
</style>
