import Vue from "vue";
import App from "@/components/App.vue";
import BootstrapVue from "bootstrap-vue";
// import JWTTest from ".views/JWTTest.vue";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueCompositionApi from '@vue/composition-api';

Vue.use(BootstrapVue)
Vue.use(VueCompositionApi);
// Vue.use(JWTTest)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");