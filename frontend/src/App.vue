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
      model: 3,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
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

    <div class="bg-red-100">
        <TitleBar/>
        <v-btn>hello </v-btn >
  <v-carousel v-model="model">
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="color"
    >
      <v-sheet
        :color="color"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            Slide {{ i + 1 }}
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
    </div>
</template>

