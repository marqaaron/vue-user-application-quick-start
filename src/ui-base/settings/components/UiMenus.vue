<template>
  <div id="uiMenusContainer">
    <menu-settings-editor></menu-settings-editor>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import MenuSettingsEditor from "./MenuSettingsEditor";

  export default {
    data() {
      return {

      }
    },
    created() {

    },
    computed: {
      ...mapGetters([

      ])
    },
    methods: {

    },
    components: {
      'menu-settings-editor' : MenuSettingsEditor
    }
  }
</script>

<style scoped>

</style>
