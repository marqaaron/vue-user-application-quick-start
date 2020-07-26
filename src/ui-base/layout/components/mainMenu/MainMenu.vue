<template>
  <b-sidebar id="sidebar-right"
             :title="sidebarSettings.title"
             :right="sidebarSettings.position"
             :shadow="sidebarSettings.shadow"
             :backdrop="sidebarSettings.backdrop"
             :backdrop-variant="sidebarSettings.backdropVariant"
             :bg-variant="sidebarSettings.background"
             :text-variant="sidebarSettings.text"
             v-if="!pinMenu">
    <menu-links></menu-links>
    <template v-slot:footer>
      <menu-buttons></menu-buttons>
    </template>

  </b-sidebar>
  <div id="pinnedMenu" :style="pinnedMainMenuStyles" v-else>
    <menu-links></menu-links>
    <div id="bottomButtons">
      <menu-buttons></menu-buttons>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import MainMenuLinks from "./components/MainMenuLinks";
  import MainMenuButtons from "./components/MainMenuButtons";

  export default {
    created() {

    },
    computed: {
      ...mapGetters([
        'activeMenu',
        'activeContent',
        'menus',
        'isLoggedIn',
        'pinMenu',
        'pinMenuWidth',
        'pinnedMainMenuStyles',
        'sidebarSettings'
      ])
    },
    components: {
      'menu-links': MainMenuLinks,
      'menu-buttons': MainMenuButtons
    }
  }
</script>

<style scoped>

  #pinnedMenu {
    position: absolute;
    height:100%;
  }

  #bottomButtons{
    position:absolute;
    width: 100%;
    bottom:0;
  }

</style>
