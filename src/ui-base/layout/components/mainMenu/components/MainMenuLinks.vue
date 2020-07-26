<template>
  <div id="menuContainer">
    <div v-for="(menu,index) in menus" v-if="(!menu.authRequired || isLoggedIn || !authenticationEnabled) && menu.display">
      <div v-if="!menu.externalLink">
        <router-link tag="div" :to="menu.link">
          <div class="menu-text pointer"
               @mouseover="setHoverMenuText(menu.name)"
               @mouseleave="setHoverMenuText(null)"
               :style="menuTextStyling(menu.name,index,menus.length)">
            {{menu.headerText}}
          </div>
        </router-link>
        <template v-if="menu.name === activeMenu || !isLoggedIn && menu.name === 'home'">
          <router-link tag="div" :to="item.link" v-for="(item,index) in menu.items" :key="index">
            <div class="sub-menu-text pointer"
                 @mouseover="setHoverMenuSubText(item.name)"
                 @mouseleave="setHoverMenuSubText(null)"
                 :style="menSubTextStyling(item.name,index,menu.items.length)">
              {{item.title}}
            </div>
          </router-link>
        </template>
      </div>
      <div v-else>
        <div class="menu-text pointer"
             @mouseover="setHoverMenuText(menu.name)"
             @mouseleave="setHoverMenuText(null)"
             @click="goToLink(menu.link)"
             :style="menuTextStyling(menu.name,index,menus.length)">
          {{menu.headerText}}
        </div>
        <template v-if="menu.name === activeMenu || !isLoggedIn && menu.name === 'home'">
          <div class="sub-menu-text pointer" v-for="(item,index) in menu.items" :key="index"
               @mouseover="setHoverMenuSubText(item.name)"
               @mouseleave="setHoverMenuSubText(null)"
               @click="goToLink(item.link)"
               :style="menSubTextStyling(item.name,index,menu.items.length)">
            {{item.title}}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    data(){
      return {
        hoverMenuText: null,
        hoverMenuSubText: null
      }
    },
    computed: {
      ...mapGetters([
        'activeMenu',
        'activeContent',
        'menus',
        'isLoggedIn',
        'pinMenu',
        'menuTextStyles',
        'menuSubTextStyles',
        'activeMenuTextStyles',
        'activeMenuSubTextStyles',
        'hoverMenuTextStyles',
        'hoverMenuSubTextStyles',
        'menuTextBorderStyles',
        'menuSubTextBorderStyles',
        'authenticationEnabled'
      ])
    },
    methods: {
      menuTextStyling(name,index,arrayLength){
        let styles = [];
        styles.push(this.menuTextStyles);
        if(index !== arrayLength - 1){
          styles.push(this.menuTextBorderStyles);
        }
        if(this.hoverMenuText === name){
          styles.push(this.hoverMenuTextStyles);
        }
        if(this.activeMenu === name){
          styles.push(this.activeMenuTextStyles);
        }
        return styles;
      },
      setHoverMenuText(name){
        this.hoverMenuText = name;
      },
      menSubTextStyling(name,index,arrayLength){
        let styles = [];
        styles.push(this.menuSubTextStyles);
        if(index !== arrayLength - 1){
          styles.push(this.menuSubTextBorderStyles);
        }
        if(this.hoverMenuSubText === name){
          styles.push(this.hoverMenuSubTextStyles);
        }
        if(this.activeContent === name){
          styles.push(this.activeMenuSubTextStyles);
        }
        return styles;
      },
      setHoverMenuSubText(name){
        this.hoverMenuSubText = name;
      },
      goToLink(_link){
        window.open(_link,'_blank');
      }
    }
  }
</script>

<style scoped>

  #menuContainer {
    padding: 0 5px;
  }

</style>
