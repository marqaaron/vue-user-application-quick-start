<template>
  <div id="uiOtherContainer">
    <b-row>
      <b-col>
        <h5 class="header">
          Setting Exports for Customization
        </h5>
        <hr>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6" style="margin:auto">
        <b-button variant="success" size="sm" @click="exportEndpoints" block>Export Endpoints</b-button>
      </b-col>
      <b-col cols="6">
        <b-button variant="success" size="sm" @click="exportMenuItems" block>Export Menu Items</b-button>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col cols="12">
        <h5 class="header">
          Additional Configurations
        </h5>
        <hr>
      </b-col>
      <b-col cols="12">
        <b-alert variant="primary" show>Additional Configuration Coming Soon!</b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import helpers from "../../utilities/helpers";
  import {endpoints} from "../../../main";

  export default {
    data() {
      return {

      }
    },
    created() {

    },
    computed: {
      ...mapGetters([
        'menus'
      ])
    },
    methods: {
      exportMenuItems(){
        let fileName = helpers.createDateTimePrefixedFileName('menuItems.json');
        helpers.exportObjectAsFile(this.menus,fileName,'text/json')
      },
      exportEndpoints(){
        let fileName = helpers.createDateTimePrefixedFileName('endpoints.json');
        helpers.exportObjectAsFile(endpoints,fileName,'text/json')
      }
    },
    components: {

    }
  }
</script>

<style scoped>
  .header {
    padding: 10px 0;
    margin: 0;
  }
</style>
