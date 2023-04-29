<script>
import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';


export default {
	setup () {
		return {
            blah: ref('hello world'),
            userinputtext: ref("userinputtext"),
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
        <InputWidget v-model="userinputtext"/>
    hello
    <pre>{{userinputtext}}</pre>
        <h1> BLAH </h1>
        <h1 class="font-bold"> BLAH </h1>
    </div>
</template>

