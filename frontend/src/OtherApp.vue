<script>
//
        //positiondata: function(){
        //    return this.userinputtext.split('\n').map( (rawline) => {
        //        const line = rawline.replace(/-/g," ")
        //        const indent = line.length - line.trimLeft().length
        //        const NUMDIGITS = 8
        //        return Math.pow(10,NUMDIGITS - indent - 1)
        //    })
        //},
        //siblingdata: function(){
        //    const NUMDIGITS = 8
        //    var acc = 0
        //    return this.userinputtext.split('\n').map( (rawline) => {
        //        const line = rawline.replace(/-/g," ")
        //        const indent = line.length - line.trimLeft().length
        //        acc =  acc+Math.pow(10,NUMDIGITS - indent - 1)
        //        return acc
        //    })
        //},
        //siblingdictplusclosing: function(){
        //    const NUMDIGITS = 8
        //    var acc = 0
        //    const newdict = JSON.parse(JSON.stringify(this.siblingdict))
        //    this.siblingdict.forEach( d => {
        //        const newitem = [d[0] + Math.pow(10,NUMDIGITS-d[1] -2) * 9, d[1],d[2]]
        //        newdict.push(newitem)
        //    })
        //    return newdict
        //},
        //updownsequence: function(){
        //    var seq = []
        //    var cur = -1
        //    this.indentdata.forEach((tuple) => {
        //        if(tuple[0] > cur)
        //           seq.push(dashes.slice(0,tuple[0]*4) +'<div>')
        //        else if(tuple[0] == cur){
        //           seq.push(dashes.slice(0,tuple[0]*4) +'</div>') 
        //           seq.push(dashes.slice(0,tuple[0]*4) +'<div>')
        //        }
        //        else if(tuple[0] < cur){
        //           for(var i=0; i<cur-tuple[0]+1;i++){ seq.push(dashes.slice(0,((cur-i)*4)) +'</div>') }
        //        }
        //        cur = tuple[0]
        //    })
        //    return seq
        //},

/*

        closingindentdata: function(){
            const blah = JSON.parse(JSON.stringify(this.indentdata)); 
            //for(var i=0; i<this.indentdata.length; i++){
            //}
            for(var i=this.indentdata.length-1; i>=0; i--){
                blah.push([this.indentdata[i][0], "/"+this.indentdata[i][1]])
            }
            return blah;
        },



*/


</script>
<template>
<div>
    <div class="flex flex-row h-96 p-4 border-black border-4">
        <InputWidget v-model="tagTableText" :initialValue="tagTableText"/>
        <pre class="p-1 m-1 bg-gray-100 text-xs">{{positiondata.map(s => s.toString().padStart(8,"0")) }}</pre>
        <pre class="p-1 m-1 bg-gray-100 text-xs">{{siblingdata}}</pre>
        <div class="p-1 m-1 bg-gray-100 text-xs flex flex-col w-48 "> <div v-for="(v,k) in siblingdict"      >{{v}}</div>    </div>
        <div class="p-1 m-1 bg-gray-100 text-xs flex flex-col w-48 "> <div v-for="(v,k) in siblingdictplusclosing"      >{{v}}</div>    </div>
        <div class="p-1 m-1 bg-gray-100 text-xs flex flex-col w-48 "> <div v-for="(v,k) in siblingdictplusclosingsorted">{{v}}</div>    </div>
    </div>
    <div class="flex flex-row">
        <InputWidget v-model="userinputtext" :initialValue="1+1"/>
    </div>
    <div class="flex flex-row">
        <InputWidget v-model="userinputtext" :initialValue="1+1"/>
        <pre class="p-1 m-1 bg-gray-100 text-xs">{{indentdata}}</pre>
        <IndentParserView :tuples="indentdata" class="p-1 m-1 bg-gray-100"/>
        <ColorDivView :tuples="indentdata" class="p-1 m-1 bg-gray-100"/>
        <ColorDivView :tuples="closingindentdata" class="p-1 m-1 bg-gray-100"/>
        <UpDownSequence :seq="updownsequence"/>
    </div>
</div>
</template>


