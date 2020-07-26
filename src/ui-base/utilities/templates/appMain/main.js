import Vue from 'vue';


// IMPORT & APPLY VUE COMPONENTS

import {baseMain} from "./ui-base/baseMain";
baseMain();
import {customMain} from "./ui-custom/customMain";
customMain();


// COMBINE ENDPOINTS

import baseEndpoints from "./ui-base/endpoints/endpoints";
import customEndpoints from "./ui-custom/endpoints";

const combinedEndpoints = function(){
  let endpoints = {};
  for(const [key,value] of Object.entries(baseEndpoints)){
    endpoints[key] = value;
  }
  if(typeof customEndpoints !== 'undefined'){
    for(const [key,value] of Object.entries(customEndpoints)){
      endpoints[key] = value;
    }
  }
  return endpoints;
}

export const endpoints = combinedEndpoints();


// INITIALIZE ROUTER

import VueRouter from 'vue-router';
import {baseRoutes} from "./ui-base/routes/routes";
import {customRoutes} from "./ui-custom/routes";

Vue.use(VueRouter);
const combinedRoutes = function(){
  let routes = [];
  baseRoutes.forEach(function(item,index){
    routes.push(item);
  });
  if(typeof customRoutes !== 'undefined'){
    customRoutes.forEach(function(item,index){
      let key = helpers.searchArrayByPropertyReturnKey(routes,'name',item.name);
      if(key !== false){
        routes[key] = item;
      } else {
        routes.push(item);
      }
    });
  }

  return routes;
}

export const routes = combinedRoutes();

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});


// INITIALIZE VUEX STORE AND MODULES

import Vuex from 'vuex';
import baseVuexModules from "./ui-base/vuex/vuexModules";
import customVuexModules from "./ui-custom/vuexModules";

Vue.use(Vuex);
const combinedVuexModules = function(){
  let modules = {};
  for(const [key,value] of Object.entries(baseVuexModules)){
    modules[key] = value;
  }
  if(typeof customVuexModules !== 'undefined'){
    for(const [key,value] of Object.entries(customVuexModules)){
      modules[key] = value;
    }
  }
  return modules;
}

const vuexConfig = {
  modules: combinedVuexModules(),
  state: {}
}

export const store = new Vuex.Store(vuexConfig);


// INITIALIZE APP

import App from './App.vue';
import helpers from "./ui-base/utilities/helpers";

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  store: store
});
