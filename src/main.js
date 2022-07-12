import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import './index.css'

const app = createApp(App)

//install store instance as a plugin
app.use(store)
app.use(router)

app.mount('#app')
