<template>
  <div class="padded-container" v-if="!isLoadingContent">
    <b-row class="mt-4">
      <b-col cols="8" offset="2">
        <b-row>
          <b-col>
            <h4 class="text-center" >Reset Password</h4>
          </b-col>
        </b-row>
        <reset-password-form v-if="validToken"></reset-password-form>
        <b-row v-else>
          <b-col>
            <b-alert variant="danger" class="text-center" show>{{invalidMessage}}</b-alert>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <b-button variant="outline-secondary" block @click="onCancel">{{buttonText}}</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
  <div v-else>
    <loading-screen></loading-screen>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import ResetPasswordForm from "./components/ResetPasswordForm";
  import LoadingScreen from "../layout/components/LoadingScreen";

  export default {
    name: "ResetPassword",
    data() {
      return {
        activeMenu: 'account',
        defaultContent: 'reset-password',
        validToken: true,
        invalidMessage: "A valid token was not provided. Please request a new password reset link.",
        buttonText: 'Cancel'
      }
    },
    created() {
      if(typeof this.$route.query.token !== "undefined"){
        this.token = this.$route.query.token;
        this.$router.push('reset-password');
        let payload = {
          token: this.token
        }
        this.$store.dispatch('validatePasswordResetToken',payload).then(
          (response) => {
            this.validToken = true;
            let activeContent = this.defaultContent;
            this.$store.dispatch('setActiveMenu',this.activeMenu);
            this.$store.dispatch('setActiveContent',activeContent);
          },
          (error) => {
            this.validToken = false;
          }
        );

      } else {
        if(this.isLoggedIn){
          this.validToken = true;
        } else {
          this.buttonText = 'Back To Login';
          this.validToken = false;
        }
        let activeContent = this.defaultContent;
        this.$store.dispatch('setActiveMenu',this.activeMenu);
        this.$store.dispatch('setActiveContent',activeContent);
      }
    },
    methods: {
      onCancel() {
        if(this.isLoggedIn){
          this.$router.push(this.redirects.login);
        } else {
          this.$router.push(this.redirects.logout);
        }
      }
    },
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'redirects',
        'isLoadingContent'
      ])
    },
    components: {
      'reset-password-form': ResetPasswordForm,
      'loading-screen': LoadingScreen
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
