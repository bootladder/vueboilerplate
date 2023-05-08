import { createApp } from 'vue'
import './index.css' 
import App from './App.vue'
import OneShotCommand from './OneShotCommand.vue'

const vueapp = createApp(App)


const f = (name) => {
    vueapp.component(name,eval(name))
}

f("OneShotCommand")


vueapp.mount('#app')
