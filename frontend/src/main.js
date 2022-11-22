import { createApp } from 'vue'
import './index.css' 
import App from './App.vue'
//const vueapp = createApp(App )


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
    directives,
    })

const vueapp = createApp(App).use(vuetify) //.mount('#app')

vueapp.mount('#app')
