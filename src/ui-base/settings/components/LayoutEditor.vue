<template>
  <div id="layoutEditorFormContainer">
    <b-form v-if="show">
      <b-form-group>
        <label for="appName">App Name</label>
        <b-form-input
          id="appName"
          :state="validationState('appName')"
          @blur="onBlur('appName')"
          @update="onUpdate($event,'appName')"
          v-model="$v.appName.$model"
          :disabled="!editing"
        ></b-form-input>
        <b-form-invalid-feedback v-if="$v.appName.$dirty && !$v.appName.required">
          This is required.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label for="pinMenuBreakpoint">Pinned Menu Breakpoint (pixels)</label>
        <b-form-input
          id="pinMenuBreakpoint"
          :state="validationState('pinMenuBreakpoint')"
          @blur="onBlur('pinMenuBreakpoint')"
          @update="onUpdate($event,'pinMenuBreakpoint')"
          v-model="$v.pinMenuBreakpoint.$model"
          :disabled="!editing"
          type="number"
        ></b-form-input>
        <b-form-invalid-feedback v-if="$v.pinMenuBreakpoint.$dirty && !$v.pinMenuBreakpoint.required">
          This is required.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label for="minBrowserWidth">Minimum Browser Width (pixels)</label>
        <b-form-input
          id="minBrowserWidth"
          :state="validationState('minBrowserWidth')"
          @blur="onBlur('minBrowserWidth')"
          @update="onUpdate($event,'minBrowserWidth')"
          v-model="$v.minBrowserWidth.$model"
          :disabled="!editing"
          type="number"
        ></b-form-input>
        <b-form-invalid-feedback v-if="$v.minBrowserWidth.$dirty && !$v.minBrowserWidth.required">
          This is required.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label for="displayTooSmallWatchBreakpoint">Display Too Small Breakpoint Watch (pixels)</label>
        <b-form-input
          id="displayTooSmallWatchBreakpoint"
          :value="displayTooSmallWatchBreakpoint"
          :state="true"
          type="number"
          disabled
        ></b-form-input>
      </b-form-group>

      <b-form-checkbox
        id="pinMenuSwitch"
        v-model="$v.pinMenu.$model"
        @change="onChangePinMenu($event)"
        :disabled="!editing"
        switch
      >
        Display Menu on Load
      </b-form-checkbox>
    </b-form>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {validationMixin} from 'vuelidate';
  import {required} from 'vuelidate/lib/validators';

  export default {
    props: {
      'formData': {
        type: Object,
        default: function(){
          return {
            appName: "",
            pinMenu: true,
            pinMenuBreakpoint: 992,
            minBrowserWidth: 320,
            displayTooSmallWatchBreakpoint: 400
          }
        }
      },
      'editing': {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        show: false,
        appName: '',
        pinMenu: false,
        pinMenuBreakpoint: 0,
        minBrowserWidth: 0
      }
    },
    mixins: [
      validationMixin
    ],
    validations: {
      appName: {
        required
      },
      pinMenu: {
        required
      },
      pinMenuBreakpoint: {
        required
      },
      minBrowserWidth: {
        required
      }
    },
    created() {
      this.appName = this.$props.formData.appName;
      this.pinMenu = this.$props.formData.pinMenu;
      this.pinMenuBreakpoint = this.$props.formData.pinMenuBreakpoint;
      this.minBrowserWidth = this.$props.formData.minBrowserWidth;
      this.$nextTick(()=>{
        this.show = true;
      })
    },
    computed: {
      ...mapGetters([
        'displayTooSmallWatchBreakpoint'
      ])
    },
    methods: {
      validationState(_name){
        if(this.$v[_name].$dirty && this.$v[_name].$invalid){
          return false;
        } else {
          return true;
        }
      },
      onBlur(_name){
        this.$v[_name].$touch();
      },
      onUpdate(event,_name){
        if(_name === 'appName'){
          this.$store.dispatch('setAppName',event);
        } else if(_name === 'pinMenuBreakpoint'){
          this.$store.dispatch('setPinMenuBreakpoint',event);
        } else if(_name === 'minBrowserWidth'){
          this.$store.dispatch('setMinBrowserWidth',event);
          this.$store.dispatch('setDisplayTooSmallWatchWidth',event);
        } else if(_name === 'displayTooSmallWatchBreakpoint'){
          this.$store.dispatch('setDisplayTooSmallWatchWidth',event);
        }
        this.$emit('updating',this.$v.$anyError);
        this.$nextTick(()=>{
          this.validationState(_name);
        })
      },
      onChangePinMenu(event){
        this.$store.dispatch('setPinMenu',event);
      }
    },
    components: {},
    watch: {}
  }
</script>

<style scoped>

</style>
