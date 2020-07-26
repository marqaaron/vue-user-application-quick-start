import baseStyles from "../../../../styles/styles";
import customStyles from "../../../../../ui-custom/styles";
import baseMenuItems from "../menuItems";
import customMenuItems from "../../../../../ui-custom/menuItems";
import baseMenuSettings from "../menuSettings";
import customMenuSettings from "../../../../../ui-custom/menuSettings";
import helpers from "../../../../utilities/helpers";

const menus = function(){
  let combinedMenus = [];
  baseMenuItems.forEach(function(item,index){
    combinedMenus.push(item);
  })
  customMenuItems.forEach(function(item,index){
    let key = helpers.searchArrayByPropertyReturnKey(combinedMenus,'name',item.name);
    if(key !== false){
      combinedMenus[key] = item;
    } else {
      combinedMenus.push(item);
    }
  })
  combinedMenus = helpers.sortArrayBySingleObjProperty(combinedMenus,'listPosition','ascending');
  return combinedMenus;
}

const styles = function(){
  let styles = {};
  for(const [key,value] of Object.entries(baseStyles)){
    styles[key] = value;
  }
  for(const [key,value] of Object.entries(customStyles)){
    styles[key] = value;
  }
  return styles;
}

const menuSettings = function(){
  let settings = {};
  for(const [key,value] of Object.entries(baseMenuSettings)){
    settings[key] = value;
  }
  for(const [key,value] of Object.entries(customMenuSettings)){
    settings[key] = value;
  }
  return settings;
}

export default {
  state: {
    activeMenu: 'home',
    activeContent: 'homeItem1',
    isLoadingContent: false,
    settings: menuSettings(),
    styles: styles(),
    menus: menus()
  },
  getters: {
    activeMenu(state,getters,rootState){
      return state.activeMenu;
    },
    activeContent(state,getters,rootState){
      return state.activeContent;
    },
    menus(state,getters,rootState){
      return state.menus;
    },
    isValidContent(state,getters,rootState){
      let menus = getters.menus;
      let items;
      let valid = false;
      menus.forEach(function(item,index){
        if(item.name === getters.activeMenu && !valid){
          items = item.items;
          items.forEach(function(link){
            if(link.name === getters.activeContent && !valid){
              valid = true;
            }
          })
        }
      })
      return valid;
    },
    redirects(state,getters,rootState){
      return {
        'login' : state.settings.loginRedirect,
        'logout' : state.settings.logoutRedirect
      };
    },
    isLoadingContent(state,getters,rootState){
      return state.isLoadingContent;
    },
    menuTextStyles(state,getters,rootState){
      return state.styles.menuText;
    },
    menuSubTextStyles(state,getters,rootState){
      return state.styles.menuSubText;
    },
    activeMenuTextStyles(state,getters,rootState){
      return state.styles.activeMenuText;
    },
    activeMenuSubTextStyles(state,getters,rootState){
      return state.styles.activeMenuSubText;
    },
    hoverMenuTextStyles(state,getters,rootState){
      return state.styles.hoverMenuText;
    },
    hoverMenuSubTextStyles(state,getters,rootState){
      return state.styles.hoverMenuSubText;
    },
    menuTextBorderStyles(state,getters,rootState){
      if(state.settings.enableMenuTextBorder){
        return state.styles.menuTextBottomBorder;
      } else {
        return {};
      }
    },
    menuSubTextBorderStyles(state,getters,rootState){
      if(state.settings.enableMenuSubTextBorder){
        return state.styles.menuSubTextBottomBorder;
      } else {
        return {};
      }
    },
    sidebarSettings(state,getters,rootState){
      return {
        title: state.settings.sidebarMainMenuName,
        position: state.settings.sidebarMainMenuRightPosition,
        text: state.settings.sidebarMainMenuTextVariant,
        background: state.settings.sidebarMainMenuBackgroundVariant,
        backdrop: state.settings.sidebarMainMenuBackdropEnabled,
        backdropVariant: state.settings.sidebarMainMenuBackdropVariant,
        shadow: state.settings.sidebarMainMenuShadowVariant
      }
    },
    sidebarMainMenuRightPosition(state,getters,rootState){
      return state.settings.sidebarMainMenuRightPosition;
    },
    menuSettings(state,getters,rootState){
      return state.settings;
    }
  },
  actions: {
    setActiveMenu(context,payload){
      context.commit("setActiveMenu",payload);
    },
    setActiveContent(context,payload){
      context.commit('setIsLoadingContent', true);
      context.commit("setActiveContent",payload);
      setTimeout(function(){
        context.commit('setIsLoadingContent', false);
      },context.state.settings.defaultLoadingTimeout);
    },
    setIsLoadingContent(context,payload){
      context.commit("setIsLoadingContent",payload);
    },
    setMenuSettings(context,payload){
      context.commit("setMenuSettings",payload);
    }
  },
  mutations: {
    setActiveMenu(state,payload){
      state.activeMenu = payload;
    },
    setActiveContent(state,payload){
      state.activeContent = payload;
    },
    setIsLoadingContent(state,payload){
      state.isLoadingContent = payload;
    },
    setMenuSettings(state,payload){
      state.settings = payload;
    }
  }
}
