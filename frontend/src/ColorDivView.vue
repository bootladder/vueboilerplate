
<template>
  <div class="w-[200px]">
    <div v-for="tuple in tuples" :style="{
      marginLeft: tuple[0] * 16 + 'px',
      marginRight: tuple[0] * 16 + 'px',
    }"
    class="h-4 m-1">
        <div class="text-xs w-full flex flex-row justify-left "
            :style="{
                  backgroundColor: colors[tuple[0]],
                }"
            >
            <div>{{ tuple[1] }}</div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tuples: {
    type: Array,
    default: () => []
  }
})

const colors = ['#fde5cd', '#fad2bd', '#f8b8a8', '#f5948b', '#ef6f6f', '#e54758', '#d71b5f', '#b80b48', '#900c3f', '#5e1f3f']
</script>

<style scoped>
div {
  color: black;
}
</style>

