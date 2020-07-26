import api from "../../utilities/api";
import log from "../../utilities/log";
import {endpoints} from "../../../main";

export default {
  state: {
    users: [],
  },
  getters: {
    users(state,rootState){
      return state.users;
    }
  },
  actions: {
    getUsers({commit,getters},payload) {
      return new Promise ( (resolve,reject) => {
        log.text("Requesting Users from " + endpoints.users);
        api.get(endpoints.users).then(
          (response) => {
            log.text("Users successfully retrieved");
            commit("setUsers",response.data);
            resolve(true);
          },
          (error) => {
            log.obj("Users Request Error",error);
            reject(api.error(error));
          }
        )
      })
    }
  },
  mutations: {
    setUsers(state,payload){
      state.users = payload;
    }
  }
}
