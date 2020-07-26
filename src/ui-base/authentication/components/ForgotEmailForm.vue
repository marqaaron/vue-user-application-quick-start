<template>
  <div id="forgotEmailFormContainer">
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group>
        <label for="email">Email</label>
        <b-form-input
          id="email"
          :state="validationState('email')"
          @blur="onBlur('email')"
          v-model="$v.email.$model"
        ></b-form-input>
        <b-form-invalid-feedback v-if="$v.email.$dirty && !$v.email.required">
          This is required.
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="$v.email.$dirty && !$v.email.email">
          This must be a properly formatted email.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="success" block :disabled="!$v.$anyDirty || $v.$anyError">Submit</b-button>
    </b-form>
    <b-row v-else>
      <b-col cols="12">
        <b-alert variant="success" show>If an account is associated with the address you provided, we'll send a reminder email to prompt you.</b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import alerts from "../../utilities/alerts";
  import {validationMixin} from 'vuelidate';
  import {required, email, minLength} from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
        email: "",
        password: "",
        show: true
      }
    },
    mixins: [
      validationMixin
    ],
    validations: {
      email: {
        required,
        email
      }
    },
    created() {

    },
    computed: {

    },
    methods: {
      onSubmit(event){
        event.preventDefault();
        let payload = {
          email: this.email
        }
        this.$store.dispatch("requestEmailReminder",payload).then(
          (response) => { this.show = false },
          (error) => { this.$swal(alerts.endpointError(error)) }
        );
      },
      validationState(_name){
        if(!this.$v[_name].$dirty){
          return null;
        } else if(this.$v[_name].$dirty && this.$v[_name].$invalid){
          return false;
        } else {
          return true;
        }
      },
      onBlur(_name){
        this.$v[_name].$touch();
      }
    },
    components: {

    }
  }
</script>

<style scoped>

</style>
