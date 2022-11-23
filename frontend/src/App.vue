<script>
import { app, db } from './firebase.js'
import { collection, doc, onSnapshot, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";

import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';

const TitleBar = {
    template: '<div class="border border-black text-center font-bold bg-orange-300 rounded-lg"> Firestore Interface </div>'
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

    const docRef = doc(db, "bootladder", "index","temp","tempdoc")
    const docSnap = await getDoc(docRef);

    if(docSnap.data() == null){ return; }
    this.env = docSnap.data();

  }
}

</script>

<template>
{{env}}

    <div class="bg-red-100">
        <TitleBar/>
        <v-btn>hello </v-btn >
    </div>
</template>

