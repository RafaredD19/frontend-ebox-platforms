import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import router from './router';

// Importamos el store
import store from './store';

loadFonts()
// Llamar a la acción para inicializar el estado desde localStorage
store.dispatch('initializeStateFromLocalStorage');
createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .mount('#app')
