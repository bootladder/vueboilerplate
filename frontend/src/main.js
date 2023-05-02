import { createApp } from 'vue'
import './index.css' 
import App from './App.vue'

import InputWidget from './InputWidget.vue'
import IndentParserView from './IndentParserView.vue'
import ColorDivView from './ColorDivView.vue'
import UpDownSequence from './UpDownSequence.vue'

console.log(InputWidget)

const vueapp = createApp(App)

const f = (name) => {
    vueapp.component(name,eval(name))
}

f("InputWidget")
f("IndentParserView")
f("ColorDivView")
f("UpDownSequence")




vueapp.mount('#app')
