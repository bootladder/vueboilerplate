<script>
import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';
const url = "http://localhost:16001/notes"

export default {
	setup () {
		return {
            blah: ref('hello world'),
            notes: ref({}),
		}
	},


    watch: {
        
    },

    methods: {
        dirtyHandler: function() {
            this.fetchNotes()
        },
        fetchNotes: function(){
            
            fetch(url).then(s => s.json()).then(s => this.notes= s).catch(e=>console.log('fail fetch' + e))
        },
     },
    computed: { },


  mounted: function() {
    this.fetchNotes()
  }
}

</script>


<template>
    <div>
        <h1> Note Taker </h1>
        <AddNewNote v-on:dirty="dirtyHandler"/>
        <div class="m-4"></div>
        <ShowNotes :notes="notes"/>
    </div>
</template>

