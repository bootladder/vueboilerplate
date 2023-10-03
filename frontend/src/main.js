console.log("WELKSGSJS")
import { createApp } from 'vue'
import './index.css' 
import App from './App.vue'
console.log("WELKSGSJS")

import ColorDivView from './ColorDivView.vue'
import UpDownSequence from './UpDownSequence.vue'
import InputWidget from './InputWidget.vue'
import IndentParserView from './IndentParserView.vue'

const vueapp = createApp(App)

vueapp.component("ColorDivView",ColorDivView)
vueapp.component("UpDownSequence",UpDownSequence)
vueapp.component("InputWidget",InputWidget)
vueapp.component("IndentParserView",IndentParserView)





vueapp.mount('#app')
