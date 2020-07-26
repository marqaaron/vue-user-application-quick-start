import api from "../../utilities/api";
import log from "../../utilities/log";
import {endpoints} from "../../../main";

// SET CONFIGURATION
import {config as baseConfig} from "../../baseMain";
import {config as customConfig} from "../../../ui-custom/customMain";

const combinedConfig = function(){
  let config = {};
  for(const [key,value] of Object.entries(baseConfig)){
    config[key] = value;
  }
  if(typeof customConfig !== 'undefined'){
    for(const [key,value] of Object.entries(customConfig)){
      config[key] = value;
    }
  }
  return config;
}

const config = combinedConfig();

export default {
  state: {
    isLoggedIn: false,
    details: null,
    enabled: config.enableAuthentication
  },
  getters: {
    isLoggedIn(state,getters,rootState) {
      return state.isLoggedIn;
    },
    details(state,getters,rootState){
      return state.details;
    },
    authenticationEnabled(state,getters,rootState){
      return state.enabled;
    }
  },
  actions: {
    setIsLoggedIn(context,payload){
      context.commit("setIsLoggedIn",payload);
    },
    logIn({commit,getters},payload){
      return new Promise( (resolve,reject) => {
        log.text("Requesting Login from " + endpoints.login);
        api.post(
          endpoints.login,
          payload
        ).then(
          (response) => {
            log.text("Login successful");
            commit("toggleIsLoggedIn",true);
            commit("setUserDetails",response.data);
            resolve(true);
          },
          (error) => {
            log.obj("Login Request Error",error);
            reject(api.error(error));
          }
        );
      })
    },
    logout(context,payload){
      context.commit("setUserDetails",false);
      context.commit("toggleIsLoggedIn",false);
    },
    requestEmailReminder({commit,getters},payload){
      return new Promise((resolve,reject) => {
        log.text("Requesting Email Reminder from " + endpoints.forgotEmail);
        api.post(
          endpoints.forgotEmail,
          payload
        ).then(
          (response) => {
            log.text("Forgot Email request received successfully");
            resolve(true);
          },
          (error) => {
            log.obj("Forgot Email Request Error",error);
            reject(api.error(error));
          }
        )
      })
    },
    requestPasswordReset({commit,getters},payload){
      return new Promise((resolve,reject) => {
        log.text("Requesting Password Reset from " + endpoints.passwordResetRequest);
        api.post(
          endpoints.passwordResetRequest,
          payload
        ).then(
          (response) => {
            log.text("Password Reset request received successfully");
            resolve(true);
          },
          (error) => {
            log.obj("Password Reset Request Error",error);
            reject(api.error(error));
          }
        )
      })
    },
    validatePasswordResetToken({commit,getters},payload){
      return new Promise((resolve,reject) => {
        log.text("Validating Password Reset Token from " + endpoints.validatePasswordResetToken);
        api.post(
          endpoints.validatePasswordResetToken,
          payload
        ).then(
          (response) => {
            log.text("Password Reset Token Validation request received successfully");
            resolve(true);
          },
          (error) => {
            log.obj("Password Reset Token Validation Request Error",error);
            reject(api.error(error));
          }
        )
      })
    },
    setAuthenticationEnabled(context,payload){
      context.commit('setAuthenticationEnabled',payload);
    },
    resetPassword({commit,getters},payload) {
      return new Promise((resolve, reject) => {
        log.text("Resetting Password from " + endpoints.resetPassword);
        api.post(
          endpoints.resetPassword,
          payload
        ).then(
          (response) => {
            log.text("Password Reset received successfully");
            resolve(true);
          },
          (error) => {
            log.obj("Password Reset Request Error", error);
            reject(api.error(error));
          }
        )
      })
    }
  },
  mutations: {
    setIsLoggedIn(state,payload){
      state.isLoggedIn = payload;
    },
    toggleIsLoggedIn(state, payload) {
      if(payload != null){
        state.isLoggedIn = payload;
      } else {
        state.isLoggedIn = !state.isLoggedIn;
      }
    },
    setUserDetails(state,payload){
      if(payload.password){
        delete payload.password;
      }
      state.details = payload;
    },
    setAuthenticationEnabled(state,payload){
      state.enabled = payload;
    }
  }
}
