
<template>
  <div class="border border-gray-300 p-4">
    <h3 class="font-bold mb-2">Hello</h3>
    <textarea
      class="h-full w-full resize-none border rounded-md p-2"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

const props = {
  modelValue: String
}

const emits = defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Add any custom styles here */
</style>

