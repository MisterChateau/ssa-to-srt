import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudDownloadAlt, faCircleNotch, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCloudDownloadAlt, faCircleNotch, faExclamationCircle);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store).mount('#app');
