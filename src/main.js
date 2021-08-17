import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import router from './router'
import Parse from 'parse/dist/parse.min.js'

const app = createApp(App).use(router)
installElementPlus(app)
app.mount('#app')

// Pare initialization
Parse.initialize("0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei", "BX6kliENeqAtsDZe6r5Wxwud6qax5THTcmyp5KkB");
Parse.serverURL = "https://parseapi.back4app.com/";
// Make Parse accessible with this
app.config.globalProperties.$Parse = Parse;