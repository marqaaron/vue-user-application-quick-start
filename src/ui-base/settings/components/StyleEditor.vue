<template>
  <div class="style-editor-container" v-if="typeof valueData.editable !== 'undefined'" >
    <b-row>
      <b-col cols="12">
        <h6>{{prettyKeyName(keyName)}}</h6>
      </b-col>
    </b-row>
    <b-row  v-for="(value,name) in valueData" :key="name" >
      <b-col cols="12" v-if="name !== 'editable' && valueData.editable[name]">
        <b-row class="pt-1 pb-1">
          <b-col cols="4">
            <p class="pl-3">{{name}}:</p>
          </b-col>
          <b-col cols="2">
            <v-popover offset="10" v-if="(name ==='color' || name === 'backgroundColor') && unlockForEditing">
              <div class="color-square unlocked-color-square pointer" :style="{backgroundColor: value}"></div>
              <template slot="popover">
                <chrome-picker :value="valueData[name]" @input="updateValue($event,valueData,name)"></chrome-picker>
              </template>
            </v-popover>
            <div v-else-if="name === 'boxShadow'" class="color-square" :style="{boxShadow: value}"></div>
            <div v-else-if="(name ==='color' || name === 'backgroundColor') && !unlockForEditing" class="color-square" :style="{backgroundColor: value}"></div>
          </b-col>
          <b-col cols="6">
            <b-form-input v-model="valueData[name]" :disabled="!unlockForEditing"></b-form-input>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { Chrome } from 'vue-color';
  import helpers from "../../utilities/helpers";

  export default {
    props: [
      'keyName',
      'valueData',
      'editing'
    ],
    data() {
      return {

      }
    },
    created() {

    },
    computed: {
      unlockForEditing(){
        if(typeof this.editing === 'undefined'){
          return true;
        } else {
          return this.editing;
        }
      }
    },
    methods: {
      updateValue: function(event,values,name){
        this.valueData[name] = helpers.createRgbaString(event);
      },
      prettyKeyName: function(keyName){
        return helpers.camelKeyToWords(keyName);
      }
    },
    components: {
      'chrome-picker' : Chrome
    }
  }
</script>

<style>
  .color-square {
    width: 25px;
    height: 25px;
    border: 2px solid grey;
    margin:auto;
  }
  .unlocked-color-square {
    -webkit-box-shadow: 0px 0px 15px 0px rgba(255,242,0,1);
    -moz-box-shadow: 0px 0px 15px 0px rgba(255,242,0,1);
    box-shadow: 0px 0px 15px 0px rgba(255,242,0,1);
  }
  .trigger {
    width:100%;
  }
  .popover {
    opacity: 1;
  }
  .popover-inner {
    max-width: initial;
    padding:0;
    background-color: rgba(255, 255, 255, 0);
  }
</style>
