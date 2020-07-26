<template>
  <div id="coverEditorContainer">
    <b-row class="pt-1 pb-1" v-for="(value,name) in covers" :key="name">
      <b-col cols="12">
        {{prettyKeyName(name)}}:
      </b-col>
      <b-col cols="12">
        <b-form-text id="mainMessageHelp">Main Message</b-form-text>
        <b-form-input
          type="text"
          :value="value.mainMessage"
          :disabled="!unlockForEditing"
          aria-describedby="mainMessageHelp mainMessageInvalid"
          :state="validateState(name,'mainMessage')"
          @update="updateCover($event,name,'mainMessage')"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="mainMessageInvalid">
          A main message is required.
        </b-form-invalid-feedback>
      </b-col>
      <b-col cols="12">
        <b-form-text id="subMessageHelp">Sub Message</b-form-text>
        <b-form-textarea
          :value="value.subMessage"
          :disabled="!unlockForEditing"
          aria-describedby="subMessageHelp subMessageInvalid"
          :state="validateState(name,'subMessage')"
          @update="updateCover($event,name,'subMessage')"
          class="mt-1"
          max-rows="6"
        ></b-form-textarea>
        <b-form-invalid-feedback id="subMessageInvalid">
          A sub message is required.
        </b-form-invalid-feedback>
      </b-col>
      <b-col cols="12">
        <br>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import helpers from "../../utilities/helpers";

  export default {
    props: [
      'editing'
    ],
    data() {
      return {
        validationResults: {
          displayTooSmall: {
            mainMessage: false,
            subMessage: false,
            validationMessages: []
          },
          default: {
            mainMessage: false,
            subMessage: false,
            validationMessages: []
          }
        }
      }
    },
    created() {

    },
    computed: {
      ...mapGetters([
        'covers'
      ]),
      unlockForEditing(){
        if(typeof this.editing === 'undefined'){
          return true;
        } else {
          return this.editing;
        }
      }
    },
    methods: {
      updateCover(event,coverName,messageType){
        let payload = {
          cover: coverName,
          messageType: messageType,
          content: event
        }
        this.$store.dispatch("setCover",payload);
      },
      validateState(coverName,messageType){
        this.validationResults[coverName][messageType] = this.covers[coverName][messageType].length > 0;
        this.$emit('updating',this.validationResults);
        return this.validationResults[coverName][messageType];
      },
      prettyKeyName: function(keyName){
        return helpers.camelKeyToWords(keyName);
      }
    },
    components: {

    }
  }
</script>

<style scoped>


</style>
