<template>
  <div id="menuSettingsEditorContainer">
    <b-row>
      <b-col>
        <h5 class="header">
          Menu Settings
          <b-button variant="success" size="sm" class="ml-2 float-right" :disabled="preventExport" @click="exportMenuSettings">Export Menu Settings</b-button>
          <b-button v-if="!editing" variant="warning" size="sm" class="float-right" @click="toggleEditing">Edit</b-button>
          <b-button-group class="float-right" v-else>
            <b-button variant="outline-secondary" size="sm"  @click="toggleEditing">Cancel</b-button>
            <b-button variant="primary" size="sm" @click="saveChanges" :disabled="$v.$anyError">Save</b-button>
          </b-button-group>
        </h5>
        <hr>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form>
          <b-form-group>
            <label for="loginRedirect">Login Redirect</label>
            <b-form-input
              id="loginRedirect"
              :state="validationState('loginRedirect')"
              @blur="onBlur('loginRedirect')"
              @update="onUpdate($event,'loginRedirect')"
              v-model="$v.loginRedirect.$model"
              :disabled="!editing"
            ></b-form-input>
            <b-form-invalid-feedback v-if="$v.loginRedirect.$dirty && !$v.loginRedirect.required">
              This is required.
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <label for="logoutRedirect">Logout Redirect</label>
            <b-form-input
              id="logoutRedirect"
              :state="validationState('logoutRedirect')"
              @blur="onBlur('logoutRedirect')"
              @update="onUpdate($event,'logoutRedirect')"
              v-model="$v.logoutRedirect.$model"
              :disabled="!editing"
            ></b-form-input>
            <b-form-invalid-feedback v-if="$v.logoutRedirect.$dirty && !$v.logoutRedirect.required">
              This is required.
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <label for="sidebarMainMenuName">Sidebar Main Menu Name</label>
            <b-form-input
              id="sidebarMainMenuName"
              :state="validationState('sidebarMainMenuName')"
              @blur="onBlur('sidebarMainMenuName')"
              @update="onUpdate($event,'sidebarMainMenuName')"
              v-model="$v.sidebarMainMenuName.$model"
              :disabled="!editing"
            ></b-form-input>
            <b-form-invalid-feedback v-if="$v.sidebarMainMenuName.$dirty && !$v.sidebarMainMenuName.required">
              This is required.
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <label for="sidebarMainMenuBackgroundVariant">Slider Sidebar Background Variant</label>
            <b-form-select
              id="sidebarMainMenuBackgroundVariant"
              v-model="$v.sidebarMainMenuBackgroundVariant.$model"
              :options="sidebarMainMenuBackgroundOptions"
              @change="onChangeSelect($event,'sidebarMainMenuBackgroundVariant')"
              :state="validationState('sidebarMainMenuBackgroundVariant')"
              :disabled="!editing"></b-form-select>
          </b-form-group>
          <b-form-group>
            <label for="sliderSideBarTextVariant">Slider Sidebar Text Variant</label>
            <b-form-select
              id="sliderSideBarTextVariant"
              v-model="$v.sidebarMainMenuTextVariant.$model"
              :options="sidebarMainMenuTextOptions"
              @change="onChangeSelect($event,'sidebarMainMenuTextVariant')"
              :state="validationState('sidebarMainMenuTextVariant')"
              :disabled="!editing"></b-form-select>
          </b-form-group>
          <b-form-group>
            <label for="sliderSideBarTextVariant">Slider Sidebar Backdrop Variant</label>
            <b-form-select
              id="sidebarMainMenuBackdropVariant"
              v-model="$v.sidebarMainMenuBackdropVariant.$model"
              :options="sidebarMainMenuTextOptions"
              @change="onChangeSelect($event,'sidebarMainMenuBackdropVariant')"
              :state="validationState('sidebarMainMenuBackdropVariant')"
              :disabled="!editing"></b-form-select>
          </b-form-group>
          <b-form-group>
            <label for="sidebarMainMenuShadowVariant">Slider Sidebar Dropshadow Variant</label>
            <b-form-select
              id="sidebarMainMenuShadowVariant"
              v-model="$v.sidebarMainMenuShadowVariant.$model"
              :options="sidebarMainMenuShadowOptions"
              @change="onChangeSelect($event,'sidebarMainMenuShadowVariant')"
              :state="validationState('sidebarMainMenuShadowVariant')"
              :disabled="!editing"></b-form-select>
          </b-form-group>
          <b-form-checkbox
            id="sidebarMainMenuRightPosition"
            v-model="$v.sidebarMainMenuRightPosition.$model"
            @change="onChangeToggle($event,'sidebarMainMenuRightPosition')"
            :disabled="!editing"
            switch
          >
            Sidebar Positioned on Right
          </b-form-checkbox>
          <b-form-checkbox
            id="sidebarMainMenuBackdropEnabled"
            v-model="$v.sidebarMainMenuBackdropEnabled.$model"
            @change="onChangeToggle($event,'sidebarMainMenuBackdropEnabled')"
            :disabled="!editing"
            switch
          >
            Enable Main Menu Backdrop
          </b-form-checkbox>
          <b-form-checkbox
            id="enableMenuTextBorder"
            v-model="$v.enableMenuTextBorder.$model"
            @change="onChangeToggle($event,'enableMenuTextBorder')"
            :disabled="!editing"
            switch
          >
            Enable Menu Main Link Border
          </b-form-checkbox>
          <b-form-checkbox
            id="enableMenuSubTextBorder"
            v-model="$v.enableMenuSubTextBorder.$model"
            @change="onChangeToggle($event,'enableMenuSubTextBorder')"
            :disabled="!editing"
            switch
          >
            Enable Menu Sub Link Border
          </b-form-checkbox>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import helpers from "../../utilities/helpers";
  import {validationMixin} from 'vuelidate';
  import {required} from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
        editing: false,
        preventExport: false,
        loginRedirect: '',
        logoutRedirect: '',
        sidebarMainMenuName: '',
        sidebarMainMenuRightPosition: true,
        enableMenuTextBorder: true,
        enableMenuSubTextBorder: true,
        sidebarMainMenuBackdropEnabled: true,
        sidebarMainMenuTextVariant: 'dark',
        sidebarMainMenuBackgroundVariant: 'light',
        sidebarMainMenuBackdropVariant: 'dark',
        sidebarMainMenuShadowVariant: 'lg',
        sidebarMainMenuTextOptions: [
          {
            value: 'dark',
            text: 'Dark Scheme'
          },
          {
            value: 'light',
            text: 'Light Scheme'
          }
        ],
        sidebarMainMenuBackgroundOptions: [
          {
            value: 'dark',
            text: 'Dark Scheme'
          },
          {
            value: 'light',
            text: 'Light Scheme'
          }
        ],
        sidebarMainMenuBackdropOptions: [
          {
            value: 'dark',
            text: 'Dark Scheme'
          },
          {
            value: 'light',
            text: 'Light Scheme'
          }
        ],
        sidebarMainMenuShadowOptions: [
          {
            value: 'sm',
            text: 'Small'
          },
          {
            value: 'md',
            text: 'Medium'
          },
          {
            value: 'lg',
            text: 'Large'
          }
        ]
      }
    },
    created() {
      this.setTemporaryMenuSettings(this.menuSettings)
    },
    mixins: [
      validationMixin
    ],
    validations: {
      loginRedirect: {
        required
      },
      logoutRedirect: {
        required
      },
      sidebarMainMenuName: {
        required
      },
      sidebarMainMenuRightPosition: {

      },
      enableMenuTextBorder: {

      },
      enableMenuSubTextBorder: {

      },
      sidebarMainMenuBackdropEnabled: {

      },
      sidebarMainMenuTextVariant: {

      },
      sidebarMainMenuBackgroundVariant: {

      },
      sidebarMainMenuBackdropVariant: {

      },
      sidebarMainMenuShadowVariant: {

      }
    },
    computed: {
      ...mapGetters([
        'menuSettings'
      ])
    },
    methods: {
      setTemporaryMenuSettings(_settings){
        this.temporaryMenuSettings = Object.assign({},_settings);
        this.loginRedirect = this.temporaryMenuSettings.loginRedirect;
        this.logoutRedirect = this.temporaryMenuSettings.logoutRedirect;
        this.sidebarMainMenuName = this.temporaryMenuSettings.sidebarMainMenuName;
        this.sidebarMainMenuRightPosition = this.temporaryMenuSettings.sidebarMainMenuRightPosition;
        this.enableMenuTextBorder = this.temporaryMenuSettings.enableMenuTextBorder;
        this.enableMenuSubTextBorder = this.temporaryMenuSettings.enableMenuSubTextBorder;
        this.sidebarMainMenuBackdropEnabled = this.temporaryMenuSettings.sidebarMainMenuBackdropEnabled;
        this.sidebarMainMenuBackgroundVariant = this.temporaryMenuSettings.sidebarMainMenuBackgroundVariant;
        this.sidebarMainMenuBackdropVariant = this.temporaryMenuSettings.sidebarMainMenuBackdropVariant;
        this.sidebarMainMenuShadowVariant = this.temporaryMenuSettings.sidebarMainMenuShadowVariant;
      },
      toggleEditing(){
        this.editing = !this.editing;
        this.preventExport = !this.preventExport;
        this.setTemporaryMenuSettings(this.menuSettings);
      },
      saveChanges(){
        this.editing = !this.editing;
        this.preventExport = !this.preventExport;
        this.$store.dispatch('setMenuSettings',this.temporaryMenuSettings);
      },
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
        this.temporaryMenuSettings[_name] = event;
        this.$nextTick(()=>{
          this.validationState(_name);
        })
      },
      onChangeToggle(event,_name){
        this.temporaryMenuSettings[_name] = event;
      },
      onChangeSelect(event,_name){
        this.temporaryMenuSettings[_name] = event;
      },
      exportMenuSettings(){
        let fileName = helpers.createDateTimePrefixedFileName('menuSetting.json');
        helpers.exportObjectAsFile(this.menuSettings,fileName,'text/json')
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
