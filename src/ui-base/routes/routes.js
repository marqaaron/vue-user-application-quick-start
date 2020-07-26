import NotFound from "./NotFound";
import Settings from "../settings/Settings";
import Authentication from "../authentication/Authentication";
import ResetPassword from "../authentication/ResetPassword";
import Account from "../authentication/Account";
import {store} from "../../main";
import localStorage from "../utilities/localStorage";
import {enforceAuthentication,pullSaveUserDataFromLocalStorage,enforceAlreadyAuthenticated,redirectToLoginLocation,removeUserDataFromLocalStorage} from "../utilities/helpersAuth";

export const baseRoutes = [
  {
    path: '/login',
    name: 'viewLogin',
    component: Authentication,
    beforeEnter(to, from, next) {
      if(store.getters.authenticationEnabled){
        pullSaveUserDataFromLocalStorage();
        enforceAlreadyAuthenticated(next);
      } else {
        removeUserDataFromLocalStorage();
        redirectToLoginLocation(next);
      }
      next();
    }
  },
  {
    path: '/reset-password',
    name: 'viewResetPassword',
    component: ResetPassword,
    beforeEnter(to, from, next) {
      if(store.getters.authenticationEnabled){
        pullSaveUserDataFromLocalStorage();
        //enforceAuthentication(next);
      } else {
        removeUserDataFromLocalStorage();
        redirectToLoginLocation(next);
      }
      next();
    }
  },
  {
    path: '/settings/:activeContent?',
    name: 'viewSettingsAccess',
    component: Settings,
    beforeEnter(to,from,next){
      if(store.getters.authenticationEnabled){
        pullSaveUserDataFromLocalStorage();
        enforceAuthentication(next);
      } else {
        removeUserDataFromLocalStorage();
      }
      next();
    }
  },
  {
    path: '/account/:activeContent?',
    name: 'viewAccount',
    component: Account,
    beforeEnter(to,from,next){
      if(store.getters.authenticationEnabled){
        pullSaveUserDataFromLocalStorage();
        enforceAuthentication(next);
      } else {
        removeUserDataFromLocalStorage();
        redirectToLoginLocation(next);
      }
      next();
    }
  },
  {
    path: '*',
    component: NotFound,
    beforeEnter(to, from, next) {
      if(store.getters.authenticationEnabled){
        pullSaveUserDataFromLocalStorage();
        //enforceAuthentication(next);
      } else {
        removeUserDataFromLocalStorage();
      }
      next();
    }
  }
];
