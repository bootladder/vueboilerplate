import { createApp } from 'vue'
import './index.css' 
import App from './App.vue'
import AddNewNote from './AddNewNote.vue'
import ShowNotes from './ShowNotes.vue'

const vueapp = createApp(App)
vueapp.component("AddNewNote",AddNewNote)
vueapp.component("ShowNotes",ShowNotes)

vueapp.mount('#app')

