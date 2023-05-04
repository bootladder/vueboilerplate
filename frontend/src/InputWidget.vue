
<template>
  <div class="text-xs border border-gray-300 p-4 h-96 w-96">
    <h3 class="font-bold mb-2">Hello</h3>
    <textarea
        :value="initialValue"   
      class="h-full w-full resize-none border rounded-md p-2"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup>
import { defineEmits,defineProps } from 'vue'

const props = defineProps(['modelValue','initialValue'])

const emits = defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Add any custom styles here */
</style>

