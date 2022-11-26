<script>
import {ref} from 'vue'
    
    export default {
        props: ["dir"],

        computed: {
        },
        setup() {
            return {
            }

        },
    }

</script>

<template>

    <template v-if="dir == 'x'">

        <div class="border-r border-white bg-green-800 text-[2px] flexrow h-[5px]" >
                                                    ">
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
            <div class="w-[50px] text-center  border-r border-white" > 1 </div>
        </div>

    </template>

    <template v-else >
        <div class="border-black bg-green-800 text-[2px] flexcol w-[5px]" >
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
            <div class="h-[50px] text-center border border-indigo-100" > 1 </div>
        </div>

    </template>

</template>

<!--

-->



