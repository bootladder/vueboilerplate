<script setup>
import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';

const result = ref("res")
  const props = defineProps(['command'])

  onMounted( () =>  {
        fetch("/command", {
            method: "POST",
            body: props.command,
        }).then( s => s.text()).then(s =>  result.value = s)
    })

</script>

<template>
    <div class="border border-black p-1">
        <pre>> {{command}}</pre>
        <pre>{{result}}</pre>
    </div>
</template>
