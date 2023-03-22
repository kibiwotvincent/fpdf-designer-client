import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from '@/router'
import store from "@/store.js";
import * as te from 'tw-elements'

import '@/index.css'
import '@/assets/css/style.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(te)

app.mount('#app')
