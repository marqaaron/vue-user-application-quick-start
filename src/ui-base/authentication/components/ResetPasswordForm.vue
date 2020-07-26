<template>
  <div id="passwordResetFormContainer">
    <b-row>
      <b-col>
        <b-alert variant="primary" class="text-center" show>Password Reset Form Coming Soon!</b-alert>
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
        this.$store.dispatch("requestPasswordReset",payload).then(
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
