
import {reactive, ref, watch, watchEffect } from 'vue/dist/vue.esm-bundler.js';
//////////////////////////////////////
import { useMagicKeys } from '@vueuse/core'


/////////////////////////////////////////////////////
// Keyboard State
//
// Sets reactive workingarea, lastkey, controlpanel


export default function() {
    console.log("keyboard.js : this is a function ")
    const keys = useMagicKeys()
    const lastkey = ref("")
    const workingarea = ref("")
    const exp = ref("")
    const inputexpression = reactive({ exp: exp })
    const keybindingexp = ref("")
    const keybindingexpression = reactive({ exp: keybindingexp })
    const controlpanel = ref({ ctrlmode: false })

    const evaluateworkingarea = () => {
            exp.value = workingarea.value
            workingarea.value = "" // Clear Working Area
    }

    const evaluatekeypressexpression = (keypressexp) => {
            keybindingexp.value = keypressexp
    }



    const keypressed = (k) => { 
        if(controlpanel.value.ctrlmode) return;
        if(controlpanel.value.nativemode) return;
        workingarea.value += k; lastkey.value = k 
    }


    const literals = Object.fromEntries([
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    ')', '!', '@', '#', '$', '%', '^', '&', '*', '(',
    '[', ']', ',', '', '~', '=', '.', '?',
    '{', '}', '<', '>', '/', '\\', '|',  `"`  , `'`  , ';', ':']


    .map(l => [l, pressed => { if (pressed) { keypressed(l)}}]))

    const letters = Object.fromEntries([
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm' ]
    .map(l => [l, pressed => { 
        const tt = keys.shift.value ? l.toUpperCase() : l ; if (pressed) { keypressed(tt) } 
    }]))



    const meta = {
    enter: pressed 		=> { 
        if (pressed) { 
            evaluateworkingarea()
        }
        },

    backspace:  v => { if (v) workingarea.value = workingarea.value.slice(0, -1)},
    space:      v => { if (v) keypressed(' ')},
    //control:    v => { if (v){controlpanel.value.ctrlmode = !controlpanel.value.ctrlmode;} }

    }

    const keymap = {
    ...literals, ...letters, ...meta
    }

    for (const [code, callback] of Object.entries(keymap)) {
    watch(keys[code], callback)
    }

    watchEffect( () => {
        if(keys.shift.value && keys.a.value){
            controlpanel.value.shiftplusa = "YES"
        } else{
            controlpanel.value.shiftplusa = "NO"
        }
    })

    watchEffect( () => {
        if(keys.control.value && keys.b.value){
            controlpanel.value.shiftplusb = "YES"
        } else{
            controlpanel.value.shiftplusb = "NO"
        }
    })


    watchEffect( () => {
        if(keys.alt.value){
            //controlpanel.value.nativemode = !controlpanel.value.nativemode
        }
    })

    watchEffect( () => {
        if(!controlpanel.value.ctrlmode) return;
        let evalresult = ""

        if(keys.q.value) 		{evaluatekeypressexpression("keypressed cq"); }
        else if(keys.w.value) 	{evaluatekeypressexpression("keypressed cw"); }
        else if(keys.e.value) 	{evaluatekeypressexpression("keypressed ce"); }
        else if(keys.r.value) 	{evaluatekeypressexpression("keypressed cr"); }
        else if(keys.t.value) 	{evaluatekeypressexpression("keypressed ct"); }
        else if(keys.y.value) 	{evaluatekeypressexpression("keypressed cy"); }
        else if(keys.u.value) 	{evaluatekeypressexpression("keypressed cu"); }
        else if(keys.i.value) 	{evaluatekeypressexpression("keypressed ci"); }
        else if(keys.o.value) 	{evaluatekeypressexpression("keypressed co"); }
        else if(keys.p.value) 	{evaluatekeypressexpression("keypressed cp"); }
        else if(keys.a.value) 	{evaluatekeypressexpression("keypressed ca"); }
        else if(keys.s.value) 	{evaluatekeypressexpression("keypressed cs"); }
        else if(keys.d.value) 	{evaluatekeypressexpression("keypressed cd"); }
        else if(keys.f.value) 	{evaluatekeypressexpression("keypressed cf"); }
        else if(keys.g.value) 	{evaluatekeypressexpression("keypressed cg"); }
        else if(keys.h.value) 	{evaluatekeypressexpression("keypressed ch"); }
        else if(keys.j.value) 	{evaluatekeypressexpression("keypressed cj"); }
        else if(keys.k.value) 	{evaluatekeypressexpression("keypressed ck"); }
        else if(keys.l.value) 	{evaluatekeypressexpression("keypressed cl"); }
        else if(keys.z.value) 	{evaluatekeypressexpression("keypressed cz"); }
        else if(keys.x.value) 	{evaluatekeypressexpression("keypressed cx"); }
        else if(keys.c.value) 	{evaluatekeypressexpression("keypressed cc"); }
        else if(keys.v.value) 	{evaluatekeypressexpression("keypressed cv"); }
        else if(keys.b.value) 	{evaluatekeypressexpression("keypressed cb"); }
        else if(keys.n.value) 	{evaluatekeypressexpression("keypressed cn"); }
        else if(keys.m.value) 	{evaluatekeypressexpression("keypressed cm"); }

        else if(keys['1'].value) 	{evaluatekeypressexpression("keypressed c1"); }
        else if(keys['2'].value) 	{evaluatekeypressexpression("keypressed c2"); }
        else if(keys['3'].value) 	{evaluatekeypressexpression("keypressed c3"); }
        else if(keys['4'].value) 	{evaluatekeypressexpression("keypressed c4"); }
        else if(keys['5'].value) 	{evaluatekeypressexpression("keypressed c5"); }
        else if(keys['6'].value) 	{evaluatekeypressexpression("keypressed c6"); }
        else if(keys['7'].value) 	{evaluatekeypressexpression("keypressed c7"); }
        else if(keys['8'].value) 	{evaluatekeypressexpression("keypressed c8"); }
        else if(keys['9'].value) 	{evaluatekeypressexpression("keypressed c9"); }
        else if(keys['0'].value) 	{evaluatekeypressexpression("keypressed c0"); }



    })

    /////////////////////////////////////////////////////







    return {
        lastkey,
        workingarea,
        controlpanel,
        inputexpression,
        keybindingexpression
    }
}



