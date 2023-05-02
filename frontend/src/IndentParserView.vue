<template>
  <ul class="list-disc pl-4">
    <li v-for="tuple in tuples" :key="tuple[1]" :style="{ marginLeft: tuple[0] * 16 + 'px' }">
      {{ tuple[1] }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tuples: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>

