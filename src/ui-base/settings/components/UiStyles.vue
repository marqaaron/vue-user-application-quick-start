<template>
  <div id="uiStylesContainer">
    <b-row>
      <b-col>
        <h5 class="header">
          UI Styles Editor
          <b-button variant="success" size="sm" class="ml-2 float-right" @click="exportStyles">Export Styles</b-button>
          <b-button v-if="!editing" variant="warning" size="sm" class="float-right" @click="toggleEditing">Edit</b-button>
          <b-button v-else variant="outline-secondary" size="sm" class="float-right" @click="toggleEditing">Cancel</b-button>
        </h5>
        <hr>
      </b-col>
    </b-row>
    <style-editor v-for="(value,name) in uiStyles"
                  class="mt-2"
                  :keyName="name"
                  :valueData="value"
                  :editing="editing"
                  :key="name"></style-editor>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import StyleEditor from "./StyleEditor";
  import alerts from "../../utilities/alerts";
  import helpers from "../../utilities/helpers";

  export default {
    data() {
      return {
        editing: false
      }
    },
    created() {

    },
    computed: {
      ...mapGetters([
        'uiStyles'
      ])
    },
    methods: {
      toggleEditing(){
        this.editing = !this.editing;
      },
      exportStyles(){
        let fileName = helpers.createDateTimePrefixedFileName('styles.json');
        helpers.exportObjectAsFile(this.uiStyles,fileName,'text/json')
      }
    },
    components: {
      'style-editor': StyleEditor
    }
  }
</script>

<style scoped>

  .header {
    padding: 10px 0;
    margin: 0;
  }

</style>
