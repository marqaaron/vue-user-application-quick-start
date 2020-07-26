import Vue from "vue";
import VueResource from 'vue-resource';
import VueSpinners from 'vue-spinners';
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VTooltip from 'v-tooltip';
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuelidate from "vuelidate";

export const baseMain = function(){
  library.add(faThumbtack);
  Vue.component('font-awesome-icon', FontAwesomeIcon);
  Vue.use(BootstrapVue);
  Vue.use(IconsPlugin);
  Vue.use(VueSpinners);
  Vue.use(VTooltip);
  Vue.use(VueSweetalert2);
  Vue.use(Vuelidate);
  Vue.use(VueResource);
}

export const config = {
  enableAuthentication: false
}


