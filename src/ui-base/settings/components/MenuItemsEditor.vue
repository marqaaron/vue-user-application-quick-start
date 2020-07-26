<template>
  <div id="menuItemsEditorContainer">
    <b-row>
      <b-col>
        <h5 class="header">
          Menu Items
          <b-button variant="success" size="sm" class="ml-2 float-right" :disabled="preventSave" @click="exportMenuItems">Export Menu Items</b-button>
          <b-button v-if="!editing" variant="warning" size="sm" class="float-right" @click="toggleEditing">Edit</b-button>
          <b-button v-else variant="outline-secondary" size="sm" class="float-right" @click="toggleEditing" :disabled="preventSave">Cancel</b-button>
        </h5>
        <hr>
      </b-col>
    </b-row>
    <b-row v-if="!editing">
      <b-col>
        <b-alert variant="primary" show>Static Menu Items</b-alert>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <b-alert variant="warning" show>Editing Menu Items</b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import helpers from "../../utilities/helpers";

  export default {
    data() {
      return {
        editing: false,
        preventSave: false
      }
    },
    created() {
      this.formData = {

      }
    },
    computed: {
      ...mapGetters([
        'menus'
      ])
    },
    methods: {
      toggleEditing(){
        this.editing = !this.editing;
      },
      exportMenuItems(){
        let fileName = helpers.createDateTimePrefixedFileName('menuItems.js');
        helpers.exportObjectAsFile(this.menus,fileName,'text/json')
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
