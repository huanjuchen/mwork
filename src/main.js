import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {saveStoreData} from "./utils/StoreUtils"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
  mounted(){
    window.addEventListener("unload",saveStoreData);
  }
}).$mount('#app')
