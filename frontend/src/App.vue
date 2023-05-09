<script>
import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';

const initcommands = [
"cat ~/.webshellinit.poop",
"echo hello jf",
"ls -al",
"echo hoo ha",
"cd /tmp/; ls -al",
]

const initcommands1 = [
"echo other set of commands",
"ls -a",
"echo hoo ha",
]






export default {
	setup () {
		return {
            ics: ref(initcommands),
            ics1: ref(initcommands1),
            webshellinit: ref({}),
            initready: ref(false),
		}
	},
    mounted() {
        fetch("/command", {
            method: "POST",
            body: "cat ~/.webshellinit.poop",
        }).then( s => s.json()).then(s =>  {this.webshellinit = s;this.initready=true})
        
    },

}

</script>


<template>
    <div v-if="initready" class="text-xs">
        <h1> Web Shell </h1>
        <h1> Init: {{webshellinit}} </h1>
        <pre> {{webshellinit}} </pre>
        <pre> {{webshellinit.shellwindows}} </pre>
        
        <div class="flex flex-row">
            <template v-for="(v,k) in webshellinit.framewindowlayout[0]" >
                <div class="w-24 h-24 bg-red-100 border border-black">
                    <OneShotCommand :command="webshellinit.shellwindows[v]" />
                </div>
            </template>
        </div>
        
        <div class="flex flex-row">
            <template v-for="(v,k) in webshellinit.framewindowlayout[1]" >
                <div class="w-24 h-24 bg-red-100 border border-black">
                </div>
            </template>
        </div>


        <template v-for="(v,k) in webshellinit.shellwindows" >
            <OneShotCommand :command="v" />
        </template>
    </div>
</template>
<!--
        <template v-for="(v,k) in ics1" >
            <OneShotCommand :command="v" />
        </template>
        <template v-for="(v,k) in ics" >
            <OneShotCommand :command="v" />
        </template>
-->
