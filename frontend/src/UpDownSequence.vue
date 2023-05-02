<template>
<div class="flex flex-col">
    <div v-for="(v,k) in seq">
        {{v}}
    </div>
</div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  seq: {
    type: Array,
    default: () => []
  }
})

</script>
