<script>
import { app, db } from './firebase.js'
import { collection, doc, onSnapshot, getDoc,getDocs, updateDoc, arrayUnion, setDoc } from "firebase/firestore";

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
            docsincollection: ref({}),
          selectedobject: ref({}),
            activebutton: ref(""),
            logs: ref([]),
            pathlegs: ['Q','W','E','R','T','Y'],
            docpathsteps: ref(["trash", "blah"]),
		}
	},


  watch: {
    "env.thedatamodel": { async handler(newr, oldr) {
            }, deep:true,
        },

        keybindingexpression: {  async handler(exp,old) {
                if(this.keybindingexpression.exp == "") return;

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


        // User changed the path with qwerty
        docpathsteps: {  async handler(exp,old) {
                console.log(this.docpathsteps)
                console.log(this.docpathsteps.length)

                switch(this.docpathsteps.length % 2){
                    case 0: {
                        try{
                            const docRef = doc(db, ...this.docpathsteps)
                            const docSnap = await getDoc(docRef);

                            if(docSnap.data() == null){ 
                                this.selectedobject = "null data"
                                return; 
                            }
                            this.selectedobject = docSnap.data();
                        } catch(e) {
                            this.selectedobject = "error" + e
                        }
                        break;
                    }
                    case 1: {
                        this.selectedobject = "COLLECTION!"
                        try{

                            const querySnapshot = //this.docpathsteps.length == 1?
                                await getDocs(collection(db, ...this.docpathsteps))
                             //:  await getDocs(collection(db, ...this.docpathsteps.slice(0,-1)))
                            

                              this.docsincollection = {}
                            querySnapshot.forEach((doc) => {
                              // doc.data() is never undefined for query doc snapshots
                              this.docsincollection[doc.id] = doc.data();
                              this.logs.push(doc.id, " => ", doc.data());
                            });

                        } catch(e) {
                            this.selectedobject = "error" + e
                        }
                        break;
                    }
                }
            }
            ,deep:true,
        //})
        },




      },

	methods: { 
    
        eval_keybinding: function(a) {
            const key = a.split(" ")[1][1].toUpperCase()

            if(this.pathlegs.includes(key))
                this.activebutton = key

            else if(key == "P")
                this.docpathsteps.pop()

            else if(parseInt(key) >= 0){
                console.log(this.docsincollection[key])
                this.selectedobject = this.docsincollection[Object.keys(this.docsincollection)[key]]
            }
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
        @apply border border-black rounded-lg
    }
    .flexcol{ @apply flex flex-col }
    .flexrow{ @apply flex flex-row }
    .pathlegitemcollection { @apply flexcol mx-1 px-2 bb rounded-lg bg-gray-100}
    .pathlegitemdocument { @apply flexcol mx-1 px-2 bb rounded-lg bg-gray-300}
    .pathlegsetbuttonenabled{ @apply w-6 h-6 bg-red-400 rounded-xl text-center font-bold bb m-1 }
    .pathlegsetbuttondisabled{ @apply w-6 h-6 bg-red-100 rounded-xl text-center font-bold bb m-1 }
    .ctrlmodeenabled{ @apply w-12 h-6 bg-green-400 rounded-xl text-center font-bold bb m-1 }
    .ctrlmodedisabled{ @apply w-12 h-6 bg-green-100 rounded-xl text-center font-bold bb m-1 }
}
</style>

<template>
{{env}}

    <div class="bg-red-100">
        <TitleBar/>

    <!-- Path Nav -->
    <div class="flexrow my-4 bb rounded-lg py-1 bg-blue-100">
        <div v-for="(v,k) in pathlegs" 
            :class="k%2? ['pathlegitemcollection']:['pathlegitemdocument']">
            <div :class="activebutton == v? ['pathlegsetbuttonenabled'] : ['pathlegsetbuttondisabled']"> {{v}} </div>
            <div v-if="activebutton == v">
                <div class="bg-gray-100"> {{workingarea}}  </div>
            </div>
            <div v-else>
                <div class=""> {{docpathsteps[k] }}</div>
            </div>
        </div>

        <div class='pathlegsetbuttondisabled mx-8'> P (Pop) </div>
    </div>

    
    <div>
        Col Path: <span class="font-bold m-1">{{docpathsteps.slice(0,-1).join("/")}} </span>
        Doc Path: <span class="font-bold m-1">{{docpathsteps.join("/")}} </span>
    </div>

    <!-- Obj Render -->
    <div class="w-[700px] h-[200px] bb m-1 p-1 rounded-lg
                flexrow">
        <div class="flexcol overflow-y-scroll">
            <div v-for="(v,k) in Object.keys(docsincollection)" 
                 class="bg-blue-100 p-1 bb text-xs flexrow">
                <div class="bg-blue-300 rounded-xl px-1" > {{k}} </div>
                <div> {{v}} </div>
            </div>
        </div>

        <div class="bg-blue-100 bb mx-1 text-xs overflow-y-scroll h-[200px] w-[400px]">
            {{selectedobject}}
        </div>
    </div>

    <!-- REPL -->
    <div class="flexrow bg-yellow-200 w-[600px] h-12">
        <div class="pathlegsetbuttonenabled"> A </div>
        <div class="">
            <div class="w-[300px] bb"> $>>{{workingarea}} </div>
        </div>
        <div class="pathlegsetbuttonenabled"> X </div>
        <div class="pathlegsetbuttonenabled"> C </div>
    </div>
    
    <div :class="controlpanel.ctrlmode? ['ctrlmodeenabled']: ['ctrlmodedisabled']" >
        CTRL
    </div>

    <div>evalresult: {{evalresult}}  </div>
    <div>activebutton: {{activebutton}}</div>
    <div>Logs: {{logs}}</div>

    </div>
</template>

