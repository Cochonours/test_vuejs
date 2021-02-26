<template>
  <a :href="get_url(fruit.id)" :style="cssProps" class="root">
    <div class="image">
      <img :src="fruit.image" :alt="fruit.name" class="fruit_side">
    </div>
    <div class="title"> {{ fruit.name }}</div>
    <div class="delete">
      <button @click.prevent="delete_fruit(fruit.id)">
        X
      </button>
    </div>
  </a>
</template>

<script>
import fruit_api from '@/data/fruits'

export default {
  name: 'BaseFruit',
  props: {
    fruit: Object,
  },
  methods: {
    get_url(fruit_id) {
      return '/fruit/' + fruit_id
    },
    delete_fruit(fruit_id) {
      return fruit_api.delete_one_async(fruit_id)
        .then(() => {
          this.$destroy()
          this.$el.parentElement.removeChild(this.$el)
        })
        .catch(() => alert("Error while deleting the fruit"))
    },
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
a.root {
  position: relative;
  --block_height: 5em; 
  display: block;
  margin: 1em;
  border: var(--fruit_color) 2px solid;
  border-radius: 1em;
  height: var(--block_height);
  text-decoration: none;
}
.image {
  position: relative;
  float: left;
  width: 30%;
  height: 5em;
}
/* To add alpha to hex color var we  */
.image::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  background-color: var(--fruit_color);
  border-top-left-radius: 0.9em;
  border-bottom-left-radius: 0.9em;
  opacity: 0.3;
}
.image img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.title {
  height: 100%;
  line-height: var(--block_height);
  color: var(--fruit_color);
  text-transform: uppercase;
  font-size: 1em;
  text-decoration: var(--fruit_color);
}
.delete {
  line-height: var(--block_height);
  position: absolute;
  top: 0;
  right: 0;
  border-top-right-radius: 0.9em;
  border-bottom-right-radius: 0.9em;
  background-color: rgb(230, 0, 0);
  display: none; /* Display only on hover over root element */
}
.delete button {
  padding: 0;
  --margin: 1em;
  margin-left: var(--margin);
  margin-right: var(--margin);
}
a.root:hover .delete {
  display: block;
}
</style>