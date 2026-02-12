import { createApp } from 'vue'
import App from './App.vue'

import Router from './routes/'
import { createPinia } from 'pinia'

/* Import the FontAwesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* Import FontAwesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* Import specific icons (solid, regular, and brand) */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

/* Add the imported icons to the library */
library.add(fas, far, fab);

const pinia = createPinia()

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(pinia)
.use(Router)
.mount('#app')
