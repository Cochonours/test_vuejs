<template>
    <div>{{ fruit.name }}</div>
</template>

<script>
export default {
  name: 'BaseFruit',
  props: {
    fruit: Object,
  }
}
</script>
