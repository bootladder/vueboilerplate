console.log("WELKSGSJS")
import { createApp } from 'vue'
import './index.css' 
import App from './App.vue'
console.log("WELKSGSJS")

import ColorDivView from './ColorDivView.vue'
import UpDownSequence from './UpDownSequence.vue'
import InputWidget from './InputWidget.vue'
import IndentParserView from './IndentParserView.vue'
import OtherApp from './OtherApp.vue'
console.log("DONE INPOUTWIDG")

console.log(InputWidget)

const vueapp = createApp(App)

//const f = (name) => {
//    vueapp.component(name,eval(name))
//}
console.log("WTF222")
vueapp.component("ColorDivView",ColorDivView)
vueapp.component("UpDownSequence",UpDownSequence)
vueapp.component("InputWidget",InputWidget)
vueapp.component("IndentParserView",IndentParserView)

console.log("WTF111")
//f("ColorDivView")
//f("UpDownSequence")
//console.log("WTF")
//f("InputWidget")
//f("IndentParserView")




vueapp.mount('#app')
