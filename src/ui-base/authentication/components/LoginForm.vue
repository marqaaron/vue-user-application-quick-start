<template>
  <div id="loginFormContainer">
    <b-form @submit.prevent="onSubmit" v-if="show">
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
      <b-form-group>
        <label for="password">Password</label>
        <b-form-input
          id="password"
          :state="validationState('password')"
          @blur="onBlur('password')"
          v-model="$v.password.$model"
        ></b-form-input>
        <b-form-invalid-feedback v-if="$v.password.$dirty && !$v.password.required">
          This is required.
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="$v.password.$dirty && !$v.password.minLength">
          This must be 8 or more characters long.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="success" block :disabled="!$v.$anyDirty || $v.$anyError">Submit</b-button>
    </b-form>
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
      },
      password: {
        required,
        minLength: minLength(8)
      }
    },
    created() {

    },
    computed: {
      ...mapGetters([

      ])
    },
    methods: {
      onSubmit(event){
        let postData = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch("logIn",postData).then(
          (response) => { },
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
    components: {},
    watch: {}
  }
</script>

<style scoped>

</style>
