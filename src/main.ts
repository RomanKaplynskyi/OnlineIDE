import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
import 'vuetify/dist/vuetify.min.css';
import router from './router';
Vue.config.productionTip = false;
new Vue({
    render: h => h(App),
    router,
    vuetify
}).$mount("#app");
//# sourceMappingURL=main.js.map