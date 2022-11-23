<script>
import { app, db } from './firebase.js'
import { collection, doc, onSnapshot, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";

import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';

import keyboard from './keyboard.js';
const keyboardstuff = keyboard()

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
          ...keyboardstuff,
          evalresult: ref("blah"),
          env: env,
            selectedobject: ref({}),
          model: 3,
            pathlegs: ['Q','W','E','R','T'],
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

<style>

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .bb  {
        @apply border border-black
    }
    .pathlegsetbutton{
        @apply text-center text-xs bg-red-400;
    }
    .flexcol{ @apply flex flex-col }
    .flexrow{ @apply flex flex-row }
    .pathlegitem { @apply flexcol mx-1 px-1 bb}
    .ctrlbutton{ @apply w-6 h-6 bg-red-400 rounded-xl text-center font-bold bb m-1 }
}
</style>

<template>
{{env}}

    <div class="bg-red-100">
        <TitleBar/>
        <v-btn>hello </v-btn >

    <!-- Path Nav -->
    <div class="flexrow my4">
        <div v-for="(v,k) in pathlegs" 
            class="pathlegitem">
            <div class="ctrlbutton"> {{v}} </div>
            <div class=""> 12345678 </div>
        </div>
    </div>

    <!-- Obj Render -->
    <div class="bg-blue-100 w-[400px] h-[200px]">
        <div>
            {{selectedobject}}
        </div>
    </div>

    <!-- REPL -->
    <div class="flexrow bg-yellow-200 w-[600px] h-12">
        <div class="ctrlbutton"> A </div>
        <div class="">
            <div class="w-[300px] bb"> $>{{workingarea}} </div>
        </div>
        <div class="ctrlbutton"> X </div>
        <div class="ctrlbutton"> C </div>
    </div>

    {{evalresult}}

    </div>
</template>

