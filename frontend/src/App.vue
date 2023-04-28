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
        <h1> BLAH </h1>
    </div>
</template>

