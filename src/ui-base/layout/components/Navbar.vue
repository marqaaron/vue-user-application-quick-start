<template>
  <b-navbar fixed="top" class="custom-nav-bar" :style="navBarStyles">
    <b-navbar-brand :style="brandTextStyling()">{{appName}}</b-navbar-brand>
    <b-navbar-nav class="ml-auto text-right">
      <span id="pinMenu" style="margin:auto"
            v-if="displayPinButton"
            :style="mainMenuPinStyling()"
            @click="togglePinMenu()"
            title="Pin Menu"
            v-b-tooltip.hover
            class="mr-3 pointer">
        <font-awesome-icon icon="thumbtack"
                           size="lg"/>
      </span>
      <span :style="mainMenuToggleIconStyling()">
        <b-icon icon="list"
                class="pointer menu-toggle-icon ml-2 mr-3"
                scale="2.25"
                title="Toggle Menu"
                v-b-tooltip.hover
                v-b-toggle.sidebar-right
        ></b-icon>
      </span>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    data () {
      return {
        displayPinButton: true,
        toggleIcon: 'hexagon'
      }
    },
    created() {
      if( window.innerWidth < this.pinMenuBreakpoint ){
        this.displayPinButton = false;
      } else {
        this.displayPinButton = true;
      }
      window.addEventListener("resize",this.onWindowResize);
    },
    computed: {
      ...mapGetters([
        'pinMenu',
        'pinMenuBreakpoint',
        'navBarStyles',
        'navBarMainMenuPinStyles',
        'activeNavBarMainMenuPinStyles',
        'navBarToggleIconStyles',
        'navBarBrandTextStyles',
        'appName'
      ])
    },
    methods: {
      togglePinMenu(){
        if(this.pinMenu){
          this.$store.dispatch('setPinMenu',false);
          this.$store.dispatch('setWindowWidth',window.innerWidth);
        } else {
          this.$store.dispatch('setPinMenu',true);
          this.$store.dispatch('setWindowWidth',window.innerWidth);
        }
      },
      onWindowResize(e){
        if( e.currentTarget.innerWidth < this.pinMenuBreakpoint ){
          this.displayPinButton = false;
        } else {
          this.displayPinButton = true;
        }
      },
      mainMenuPinStyling(){
        let styles = [];
        styles.push(this.navBarMainMenuPinStyles);
        if(this.pinMenu){
          styles.push(this.activeNavBarMainMenuPinStyles);
        }
        return styles;
      },
      mainMenuToggleIconStyling(){
        let styles = [];
        styles.push(this.navBarToggleIconStyles);
        return styles;
      },
      brandTextStyling(){
        let styles = [];
        styles.push(this.navBarBrandTextStyles);
        return styles;
      }
    }
  }
</script>

<style scoped>

  .custom-nav-bar {
    -webkit-box-shadow: 0px -19px 18px 10px rgba(74,74,74,1);
    -moz-box-shadow: 0px -19px 18px 10px rgba(74,74,74,1);
    box-shadow: 0px -19px 18px 10px rgba(74,74,74,1);
  }
  .menu-toggle-icon:focus {
    outline: initial;
  }
  .navbar-brand {
    font-weight:bolder;
  }
</style>
