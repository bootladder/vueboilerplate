<script setup>
    import {onMounted,ref} from "vue"
    const url = "http://localhost:16001/notes"
    const notes = ref({})

    onMounted( () => {
        fetch(url).then(s => s.json()).then(s => notes.value = s).catch(e=>console.log('fail fetch' + e))
    })
</script>
<template>
    <div class="border border-black p-2 bg-gray-100 text-xs w-fit">
        Show Notes
    </div>
{{notes}}
</template>
