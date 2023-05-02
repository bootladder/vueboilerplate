<script>
const cl = console.log
import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';
const dashes="-----------------------------------------------------"


export default {
	setup () {
		return {
            blah: ref('hello world'),
            userinputtext: ref("d\n d\n d\n"),
		}
	},


    watch: {},

    methods: { },
    computed: { 
        indentdata: function(){
            const poop = (this.userinputtext.split('\n').map((line) => {
                        const indent = line.length - line.trimLeft().length
                        return [indent,line.trimLeft()]
                    }))
            cl(poop)
            return poop
        },
        updownsequence: function(){
            var seq = []
            var cur = -1
            this.indentdata.forEach((tuple) => {
                if(tuple[0] > cur)
                   seq.push(dashes.slice(0,tuple[0]*4) +'<div>')
                else if(tuple[0] == cur){
                   seq.push(dashes.slice(0,tuple[0]*4) +'</div>') 
                   seq.push(dashes.slice(0,tuple[0]*4) +'<div>')
                }
                else if(tuple[0] < cur){
                   for(var i=0; i<cur-tuple[0]+1;i++){ seq.push(dashes.slice(0,((cur-i)*4)) +'</div>') }
                }
                cur = tuple[0]
            })
            return seq
        },
        closingindentdata: function(){
            const blah = JSON.parse(JSON.stringify(this.indentdata)); 
            //for(var i=0; i<this.indentdata.length; i++){
            //}
            for(var i=this.indentdata.length-1; i>=0; i--){
                blah.push([this.indentdata[i][0], "/"+this.indentdata[i][1]])
            }
            return blah;
        },
    },


  async mounted() {
  }
}

</script>


<template>
alright!
    <div class="flex flex-row">
        <InputWidget v-model="userinputtext"/>
        <pre class="p-1 m-1 bg-gray-100 text-xs">{{indentdata}}</pre>
        <IndentParserView :tuples="indentdata" class="p-1 m-1 bg-gray-100"/>
        <ColorDivView :tuples="indentdata" class="p-1 m-1 bg-gray-100"/>
        <ColorDivView :tuples="closingindentdata" class="p-1 m-1 bg-gray-100"/>
        <UpDownSequence :seq="updownsequence"/>
    </div>
</template>

