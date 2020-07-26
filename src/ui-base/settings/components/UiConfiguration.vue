<template>
  <div id="uiConfigurationContainer">
    <b-row class="mb-2">
      <b-col>
        <b-button-group class="btn-block">
          <b-button :variant="buttonGroupVariant('styles')" @click="toggleContent('styles')">Styles</b-button>
          <b-button :variant="buttonGroupVariant('layout')"  @click="toggleContent('layout')">Layout</b-button>
          <b-button :variant="buttonGroupVariant('menus')"  @click="toggleContent('menus')">Menus</b-button>
          <b-button :variant="buttonGroupVariant('other')"  @click="toggleContent('other')">Other</b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <ui-styles v-if="this.content === 'styles'"></ui-styles>
    <ui-layout v-else-if="this.content === 'layout'"></ui-layout>
    <ui-menus v-else-if="this.content === 'menus'"></ui-menus>
    <ui-other v-else-if="this.content === 'other'"></ui-other>
    <b-alert variant="danger" v-else show>No Content Selected!</b-alert>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import UiStyles from "./UiStyles";
  import UiLayout from "./UiLayout";
  import UiMenus from "./UiMenus";
  import UiOther from "./UiOther";

  export default {
    data() {
      return {
        editing: false,
        content: 'styles'
      }
    },
    created() {

    },
    computed: {
      ...mapGetters([

      ])
    },
    methods: {
      toggleContent(_content){
        this.content = _content;
      },
      buttonGroupVariant(_content){
        if(this.content === _content){
          return 'info';
        } else {
          return 'outline-info';
        }
      }
    },
    components: {
      'ui-styles': UiStyles,
      'ui-layout': UiLayout,
      'ui-menus': UiMenus,
      'ui-other': UiOther
    }
  }
</script>

<style scoped>

</style>
