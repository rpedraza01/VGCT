import Vue from "vue";
import App from "@/components/App.vue";
import BootstrapVue from "bootstrap-vue";
import JWTTest from "@/views/JWTTest.vue";
import store from "@/store/index.js"
import router from "@/router"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueCompositionApi from '@vue/composition-api';

Vue.use(BootstrapVue)
Vue.use(VueCompositionApi);
Vue.use(JWTTest)
// Vue.use(store)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");