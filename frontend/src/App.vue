<script>
import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';


export default {
	setup () {
		return {
            blah: ref('hello world'),
		}
	},


    watch: {},

    methods: { },
    computed: { },


  async mounted() {
  }
}

</script>


<template>
    <div>
        <h1> Note Taker </h1>
        <AddNewNote />
        <div class="m-4"></div>
        <ShowNotes />
    </div>
</template>

