<template>
  <a :href="get_url(fruit.id)" :style="cssProps" class="root">
    <div class="image">
      <img :src="fruit.image" :alt="fruit.name" class="fruit_side">
    </div>
    <div class="title"> {{ fruit.name }}</div>
  </a>
</template>

<script>

export default {
  name: 'BaseFruit',
  props: {
    fruit: Object,
  },
  methods: {
    get_url(fruit_id) {
      return '/fruit/' + fruit_id
    }
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
.root {
  display: flex;
  justify-content: center;
  margin: 1em;
  border: grey 1px solid;
  border-radius: 1em;
  background-color: var(--fruit_color);
}
.image {
  height: 5em;
  width: 5em;
  margin-right: 1em;
}
.image img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.title {
  align-self: center;
}
</style>