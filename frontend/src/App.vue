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
		}
	},

}

</script>


<template>
    <div class="text-xs">
        <h1> Web Shell </h1>
        <template v-for="(v,k) in ics1" >
            <OneShotCommand :command="v" />
        </template>
        <template v-for="(v,k) in ics" >
            <OneShotCommand :command="v" />
        </template>
    </div>
</template>

