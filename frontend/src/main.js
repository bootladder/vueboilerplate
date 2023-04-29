import { createApp } from 'vue'
import './index.css' 
import App from './App.vue'

import InputWidget from './InputWidget.vue'

const vueapp = createApp(App)

const f = (name) => {
    vueapp.component(name,eval(name))
}

f("InputWidget")



vueapp.mount('#app')
