<script setup>
import {ref} from "vue"
const newnote = ref("nonote")
const url = "http://localhost:16001/add"
const emits = defineEmits(['dirty']);
    

const savebuttonclicked = (s) => {
    fetch(url, {
        method:"POST",
        body:JSON.stringify({note: newnote.value}),
    }).then(s => {emits('dirty', {}); newnote.value=""})
    .catch(e=>alert('fail fetch' + e))
}
</script>

<template>
    <div class="border border-black p-1 bg-gray-100 text-xs w-96">
        <div class="mb-2"> Add New Note </div>
        <textarea v-model="newnote" class="w-full h-48 p-1 m-1 border-gray border"/>
        <div class="border border-black rounded-md bg-blue-100 w-10 text-center"
                @click="savebuttonclicked"> 
            Save 
        </div>
    </div>
</template>
