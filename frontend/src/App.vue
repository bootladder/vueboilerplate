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
        const env = ref({ thedatamodel: { shapes: {}}, })
        
		return {
          ...keyboardstuff,
          evalresult: ref("blah"),
          env: env,
          selectedobject: ref({}),
            activebutton: ref(""),
            pathlegs: ['Q','W','E','R','T'],
            docpathsteps: ref(["bootladder", "index","CRM","rolodex"]),
		}
	},


  watch: {
    "env.thedatamodel": { async handler(newr, oldr) {
            }, deep:true,
        },

        keybindingexpression: {  async handler(exp,old) {
                console.log("KEYBINDING EXPRESSON")
                if(this.keybindingexpression.exp == "") return;
                console.log("KEYBINDING EXPRESSON IS: " + this.keybindingexpression.exp)


                // KLUDGE INDICATORS
                this.env.lastcontrolkeypressed = this.lastkey
                setTimeout( () => {this.env.lastcontrolkeypressed = ""}  , 100)

                this.evalresult = "Hello"
                this.eval_keybinding(this.keybindingexpression.exp)
                this.keybindingexpression.exp = ""
            }
            ,deep:true,
        //})
        },

        inputexpression: {  async handler(exp,old) {
                if(this.inputexpression.exp == "") return;

                this.eval_inputexpression(this.inputexpression.exp)
                this.inputexpression.exp = ""
            }
            ,deep:true,
        //})
        },




      },

	methods: { 
    
        eval_keybinding: function(a) {
            this.activebutton = a.split(" ")[1][1].toUpperCase()
        },
    
        eval_inputexpression: function(a) {
            console.log(this.pathlegs)
            console.log(this.pathlegs.indexOf(this.activebutton))
            console.log(a)
            console.log(this.activebutton)
            console.log(this.pathlegs)
            console.log(this.pathlegs.includes(this.activebutton))
            if(this.pathlegs.includes(this.activebutton)){
                this.evalresult = "chlkasdjlksaj"
               this.docpathsteps[ this.pathlegs.indexOf(this.activebutton) ] = a
               this.activebutton = ""
            }
            this.evalresult = "yay"
        },

    },
	computed: { },


  async mounted() {

    console.log(this.docpathsteps)
    const docRef = doc(db, ...this.docpathsteps)
    const docSnap = await getDoc(docRef);

    if(docSnap.data() == null){ return; }
    this.selectedobject = docSnap.data();

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
    .ctrlmodeenabled{ @apply w-12 h-6 bg-red-400 rounded-xl text-center font-bold bb m-1 }
    .ctrlmodedisabled{ @apply w-12 h-6 bg-blue-400 rounded-xl text-center font-bold bb m-1 }
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
            <div v-if="activebutton == v">
                <div class="bg-gray-100"> {{workingarea}}  </div>
            </div>
            <div v-else>
                <div class=""> {{docpathsteps[k] }}</div>
            </div>
        </div>
    </div>

    <!-- Obj Render -->
    <div class="bg-blue-100 w-[400px] h-[200px]">
        <div class="overflow-y-scroll h-[200px]">
            {{selectedobject}}
        </div>
    </div>

    <!-- REPL -->
    <div class="flexrow bg-yellow-200 w-[600px] h-12">
        <div class="ctrlbutton"> A </div>
        <div class="">
            <div class="w-[300px] bb"> $>>{{workingarea}} </div>
        </div>
        <div class="ctrlbutton"> X </div>
        <div class="ctrlbutton"> C </div>
    </div>
    
    <div :class="controlpanel.ctrlmode? ['ctrlmodeenabled']: ['ctrlmodedisabled']" >
        CTRL
    </div>

    <div>evalresult: {{evalresult}}  </div>
    <div>activebutton: {{activebutton}}</div>

    </div>
</template>

