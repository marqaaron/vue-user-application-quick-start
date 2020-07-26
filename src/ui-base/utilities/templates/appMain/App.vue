<template>
  <div>
    <b-container id="app" fluid="true" class="app-container"
                 :style="mainContentAreaStyles">
      <nav-bar></nav-bar>
      <router-view></router-view>
    </b-container>
    <main-menu></main-menu>
    <cover v-if="activeCover != null"></cover>
  </div>
</template>

<script>
  import Navbar from "./ui-base/layout/components/Navbar";
  import MainMenu from "./ui-base/layout/components/mainMenu/MainMenu";
  import Cover from "./ui-base/layout/components/Cover";
  import {mapGetters} from "vuex";

  export default {
    data () {
      return {
        message: 'Application Home Page.'
      }
    },
    created() {
      this.windowWidth = window.innerWidth;
      if(this.windowWidth < this.minBrowserWidth){
        this.$store.dispatch('setActiveCover','displayTooSmall');
      } else {
        this.$store.dispatch('setActiveCover',null);
      }
      this.$store.dispatch('setWindowWidth',this.windowWidth);
      window.addEventListener("resize",this.onWindowResize);
    },
    components: {
      'nav-bar': Navbar,
      'main-menu': MainMenu,
      'cover': Cover
    },
    computed: {
      ...mapGetters([
        'activeCover',
        'minBrowserWidth',
        'pinMenu',
        'pinMenuBreakpoint',
        'mainContentAreaStyles',
        'displayTooSmallWatchBreakpoint'
      ])
    },
    methods: {
      onWindowResize(e){
        this.windowWidth = e.currentTarget.innerWidth;
        if(this.windowWidth < this.displayTooSmallWatchBreakpoint){
          if(this.windowWidth < this.minBrowserWidth){
            this.$store.dispatch('setActiveCover','displayTooSmall')
          } else {
            this.$store.dispatch('setActiveCover',null);
          }
        }
        if(this.windowWidth < this.pinMenuBreakpoint && this.pinMenu){
          this.$store.dispatch('setPinMenu',false)
        }
        if(this.pinMenu){
          this.$store.dispatch('setWindowWidth',this.windowWidth);
        }

      }
    }
  }
</script>

<style>

  *:focus {
    outline: none !important;
  }

  *[disabled] {
    cursor: not-allowed;
  }

  .btn:focus {
    box-shadow: none !important;
  }

  html, body {
    height: 100%;
    overflow: hidden;
  }

  .app-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .padded-container{
    padding: 10px 15px;
  }

  .pointer {
    cursor:pointer
  }

  .scroll-test {
    height:2500px;
  }

</style>
