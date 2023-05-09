<script setup>
import {ref} from "vue"
const newnote = ref("nonote")
const url = "http://localhost:16001/add"

const savebuttonclicked = (s) => {
    alert("bah" + JSON.stringify(newnote.value))
    fetch(url, {
        method:"POST",
        body:JSON.stringify({note: newnote.value}),
    }).then(s => alert(s)).catch(e=>alert('fail fetch' + e))
}
</script>

<template>
    <div class="border border-black p-2 bg-gray-100 text-xs w-fit">
        <div> Add New Note </div>
        <textarea v-model="newnote" class=""/>
        <div class="border border-black rounded-md bg-blue-100 w-10 text-center"
                @click="savebuttonclicked"> 
            Save 
        </div>
        <div> the note is : {{newnote}} </div>
    </div>
</template>
