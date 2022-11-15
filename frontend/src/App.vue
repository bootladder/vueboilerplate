<script>

import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';

const TitleBar = {
    template: '<div class="border border-black text-center font-bold bg-orange-300 rounded-lg"> Boilerplate </div>'
}
    
export default {
	components: {
        TitleBar,
	},
	setup () {

        const env = ref({
            thedatamodel: { shapes: {}},
        })
        
		return {
            env: env,
		}
	},


  watch: {
    "env.thedatamodel": { async handler(newr, oldr) {
            }, deep:true,
        },
      },

	methods: {
	},

	computed: {
	},


  async mounted() {
  }
}

</script>

<template>

    <div class="">
        <TitleBar/>
    </div>
</template>

