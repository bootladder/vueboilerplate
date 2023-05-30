<script>
const cl = console.log
import {onMounted,ref, watch} from 'vue/dist/vue.esm-bundler.js';
const dashes="-----------------------------------------------------"
const initTagTable = {
    'd': '<div>',
    '/d': '</div>',
    'dr': '<div class="text-lg" style="display:flex; flex-direction:row; background-color: red">',
    '/dr': '</div>',
    'dc': '<div style="display:flex; flex-direction:column; background-color: blue">',
    '/dc': '</div>',
    't': 'hello',
    '/t': '',
}


export default {
	setup () {
		return {
            blah: ref('hello world'),
            userinputtext: ref("dc\n-d\n-t\nd"),
            tagTableText: ref(JSON.stringify(initTagTable,null,2) ),
            outputref: ref(null),
		}
	},


    watch: {},

    methods: {
        loadoutputhtml:function(){
            this.$refs.outputref.innerHTML = this.outputhtmlstring
        },
        enterpressed: function(){
            const temp = this.userinputtext.replace(/" "/g,"-")
            this.userinputtext = this.userinputtext.replace(/ /g,"-")
        },
     },
    computed: { 
        tagTable: function(){
            return JSON.parse(this.tagTableText)
        },
        indentdata: function(){
            const poop = (this.userinputtext.split('\n').map((rawline) => {
                        cl(rawline)
                        const line = rawline.replace(/-/g," ")
                        cl(line)
                        const indent = line.length - line.trimLeft().length
                        cl(indent)
                        return [indent,line.trimLeft()]
                    }))
            cl(poop)
            return poop
        },
        siblingdict: function(){
            const NUMDIGITS = 8
            var acc = 0
            return this.userinputtext.split('\n').map( (rawline) => {
                const line = rawline.replace(/-/g," ")
                const indent = line.length - line.trimLeft().length
                acc =  acc+Math.pow(10,NUMDIGITS - indent - 1)
                return [acc, indent, line.trimLeft()]
            })
        },
        siblingdictplusclosingsorted: function(){
            const NUMDIGITS = 8
            var acc = 0
            const newdict = JSON.parse(JSON.stringify(this.siblingdict))
            this.siblingdict.forEach( d => {
                const newitem = [d[0] + Math.pow(10,NUMDIGITS-d[1] -2) * 9, d[1],"/"+d[2]]
                newdict.push(newitem)
            })
            return newdict.sort( (d1,d2) => parseInt(d1[0]) > parseInt(d2[0]))
        },
        outputarray: function(){
            return this.siblingdictplusclosingsorted.map(s => dashes.slice(0,s[1]*4) +  this.tagTable[s[2]])
        },

        outputarrayraw: function(){
            return this.siblingdictplusclosingsorted.map(s =>this.tagTable[s[2]])
        },
        outputhtmlstring: function(){
            return this.outputarrayraw.join("")
        },

    },


  async mounted() {
  }
}

</script>


<template >
<div class="flex flex-col">
    <div v-html="outputhtmlstring"></div>
    <div class="flex flex-row justify-between h-96 border-4 border-black">
        <InputWidget v-model="userinputtext" :initialValue="userinputtext" @enterpressed="enterpressed"/>
        <div @click="loadoutputhtml" ref="outputref"></div>
        <pre class="p-1 m-1 bg-gray-100 text-xs">{{outputarray}}</pre>
    </div>
</div>
</template>

