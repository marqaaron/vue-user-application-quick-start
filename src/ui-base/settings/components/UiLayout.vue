<template>
  <div id="uiLayoutContainer">
    <b-row>
      <b-col>
        <h5 class="header">
          UI Layout Editor
          <b-button variant="success" size="sm" class="ml-2 float-right" :disabled="preventSave" @click="exportLayoutConfig">Export Layout</b-button>
          <b-button v-if="!editing" variant="warning" size="sm" class="float-right" @click="toggleEditing">Edit</b-button>
          <b-button v-else variant="outline-secondary" size="sm" class="float-right" @click="toggleEditing" :disabled="preventSave">Cancel</b-button>
        </h5>
        <hr>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <h5 class="header">General Layout</h5>
      </b-col>
    </b-row>
    <layout-editor :form-data="formData" :editing="editing" @updating="lockSaveButtonFromLayoutEditor"></layout-editor>
    <b-row>
      <b-col cols="12">
        <br>
        <hr>
        <h5 class="header">Covers</h5>
      </b-col>
    </b-row>
    <cover-editor :editing="editing" @updating="lockSaveButton"></cover-editor>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import CoverEditor from "./CoverEditor";
  import LayoutEditor from "./LayoutEditor";
  import alerts from "../../utilities/alerts";
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
        appName: this.appName,
        pinMenu: this.pinMenu,
        pinMenuBreakpoint: this.pinMenuBreakpoint,
        minBrowserWidth: this.minBrowserWidth,
        displayTooSmallWatchBreakpoint: this.displayTooSmallWatchBreakpoint
      }
    },
    computed: {
      ...mapGetters([
        'pinMenu',
        'pinMenuBreakpoint',
        'minBrowserWidth',
        'displayTooSmallWatchBreakpoint',
        'appName',
        'covers',
        'uiLayout'
      ])
    },
    methods: {
      toggleEditing(){
        this.editing = !this.editing;
      },
      setPinMenu(_value){
        this.$store.dispatch('setPinMenu',_value);
      },
      setPinMenuBreakpoint(event){
        this.$store.dispatch('setPinMenuBreakpoint',event);
      },
      setMinBrowserWidth(event){
        this.$store.dispatch('setMinBrowserWidth',event);
        this.$store.dispatch('setDisplayTooSmallWatchWidth',event);
      },
      setDisplayTooSmallWatchWidth(event){
        this.$store.dispatch('setDisplayTooSmallWatchWidth',event);
      },
      setAppName(event){
        this.$store.dispatch('setAppName',event);
      },
      pinMenuButtonVariant(_value){
        if(this.pinMenu === _value){
          return 'success';
        } else {
          return 'outline-success';
        }
      },
      lockSaveButton(_value){
        let preventSave = false;
        for(const [key,value] of Object.entries(_value)){
         if(!preventSave){
           for(const [key2,value2] of Object.entries(value)){
             if(!value2){
               preventSave = true
             }
           }
         }
        }
        this.preventSave = preventSave;
      },
      lockSaveButtonFromLayoutEditor(_value){
        this.preventSave = _value;
      },
      exportLayoutConfig(){
        let fileName = helpers.createDateTimePrefixedFileName('layoutSetting.json');
        helpers.exportObjectAsFile(this.uiLayout,fileName,'text/json')
      }
    },
    components: {
      'cover-editor': CoverEditor,
      'layout-editor': LayoutEditor
    }
  }
</script>

<style scoped>

  .header {
    padding: 10px 0;
    margin: 0;
  }

</style>
