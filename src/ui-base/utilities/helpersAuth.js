import {store} from '../../main';
import localStorage from "../../ui-base/utilities/localStorage";

export const enforceAuthentication = function(_next){
  if(!store.getters.isLoggedIn){
    return _next(store.getters.redirects.logout);
  }
}

export const enforceAlreadyAuthenticated = function(_next){
  if(store.getters.isLoggedIn){
    return _next(store.getters.redirects.login);
  }
}

export const redirectToLoginLocation = function(_next){
  return _next(store.getters.redirects.login);
}

export const pullSaveUserDataFromLocalStorage = function(){
  let user = localStorage.get('user');
  if(user && user.isLoggedIn){
    store.state.authentication = user;
    localStorage.write('user',store.state.authentication);
  } else if(store.state.authentication.isLoggedIn) {
    localStorage.write('user',store.state.authentication);
  }

}

export const removeUserDataFromLocalStorage = function(){
  localStorage.delete('user');
}
