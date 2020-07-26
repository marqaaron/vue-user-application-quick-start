<template>
  <div class="padded-container">
    <b-row class="mt-4">
      <b-col cols="8" offset="2">
        <b-row>
          <b-col>
            <h4 class="text-center" v-if="form === 'forgot-username-form'">Request Account Reminder</h4>
            <h4 class="text-center" v-else-if="form === 'forgot-password-form'">Request Password Reset</h4>
            <h4 class="text-center" v-else>Welcome Back.</h4>
          </b-col>
        </b-row>
        <login-form v-if="form === 'login-form'"></login-form>
        <forgot-password-form v-else-if="form === 'forgot-password-form'"></forgot-password-form>
        <forgot-email-form v-else></forgot-email-form>
        <b-row class="mt-2">
          <b-col>
            <div v-if="form === 'login-form'">
              <b-button variant="outline-secondary" block @click="toggleForm('forgot-username-form')">Forgot Email</b-button>
              <b-button variant="outline-secondary" block @click="toggleForm('forgot-password-form')">Forgot Password</b-button>
            </div>
            <b-button variant="outline-secondary" block @click="toggleForm('login-form')" v-else>Back to Login</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import LoginForm from "./components/LoginForm";
  import ForgotPasswordForm from "./components/ForgotPasswordForm";
  import ForgotEmailForm from "./components/ForgotEmailForm";

  export default {
    name: "Authentication",
    data() {
      return {
        form: 'login-form',
        activeMenu: 'authentication',
        defaultContent: 'login'
      }
    },
    created() {
      let activeContent = this.defaultContent;
      this.$store.dispatch('setActiveMenu',this.activeMenu);
      this.$store.dispatch('setActiveContent',activeContent);
    },
    methods: {
      toggleForm(_value) {
        this.form = _value;
      }
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'redirects'
      ])
    },
    components: {
      'login-form': LoginForm,
      'forgot-password-form': ForgotPasswordForm,
      'forgot-email-form': ForgotEmailForm
    },
    watch: {
      isLoggedIn: function(_value){
        if(_value){
          this.$router.push(this.redirects.login);
        }
      }
    }
  }
</script>

<style scoped>

</style>
