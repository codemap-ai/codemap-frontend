import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Markdown from 'vue3-markdown-it';

createApp(App).use(store).use(router).use(Markdown).mount('#app')
