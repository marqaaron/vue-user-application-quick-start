import Home from "./home/Home";
import Dashboard from "./dashboard/Dashboard";
import About from "./home/About";
import Contact from "./home/Contact";
import {store} from "../main";
import localStorage from "../ui-base/utilities/localStorage";
import {enforceAuthentication,pullSaveUserDataFromLocalStorage,enforceAlreadyAuthenticated,removeUserDataFromLocalStorage} from "../ui-base/utilities/helpersAuth";

export const customRoutes = [
  {
    path: '/',
    name: 'viewHome',
    component: Home,
    beforeEnter(to, from, next) {
      if(store.getters.authenticationEnabled){
        pullSaveUserDataFromLocalStorage();
        //enforceAuthentication(next);
      } else {
        removeUserDataFromLocalStorage();
      }
      next();
    }
  },
  {
    path: '/about',
    name: 'viewAbout',
    component: About,
    beforeEnter(to, from, next) {
      if(store.getters.authenticationEnabled){
        pullSaveUserDataFromLocalStorage();
        //enforceAuthentication(next);
      } else {
        removeUserDataFromLocalStorage();
      }
      next();
    }
  },
  {
    path: '/contact',
    name: 'viewContact',
    component: Contact,
    beforeEnter(to, from, next) {
      if(store.getters.authenticationEnabled){
        pullSaveUserDataFromLocalStorage();
        //enforceAuthentication(next);
      } else {
        removeUserDataFromLocalStorage();
      }
      next();
    }
  },
  {
    path: '/dashboard/:activeContent?',
    name: 'viewDashboard',
    component: Dashboard,
    beforeEnter(to,from,next){
      if(store.getters.authenticationEnabled){
        pullSaveUserDataFromLocalStorage();
        enforceAuthentication(next);
      } else {
        removeUserDataFromLocalStorage();
      }
      next();
    }
  }
];
