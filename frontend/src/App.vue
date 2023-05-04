<script>
import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';


export default {
	setup () {
		return {
            blah: ref('hello world'),
            result: ref("result"),
		}
	},


    watch: {},

    methods: { },
    computed: { },


  async mounted() {
    fetch("/command", {
        method: "POST",
        body: "ls -al",
    }).then( s => s.text()).then(s =>  this.result = s)
  }
}

</script>


<template>
    <div>
<pre>{{result}}</pre>
kjk
        <h1> BLAH </h1>
    </div>
</template>

