<script setup>
    import {onMounted,ref} from "vue"
      const props = defineProps(['notes'])

    onMounted( () => {
    })
</script>
<template>
    <div class="border border-black p-2 bg-gray-100 text-xs w-fit">
        Show Notes
    </div>
{{notes}}
</template>
