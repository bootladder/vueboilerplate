<script>
import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';


export default {
	setup () {
		return {
		}
	},

}

</script>


<template>
    <div>
        <h1> BLAH </h1>
        <OneShotCommand command="echo hello jf" />
        <OneShotCommand command="ls -al" />
        <OneShotCommand command="echo hoo ha" />
        <OneShotCommand command="cd /tmp/; ls -al" />
    </div>
</template>

