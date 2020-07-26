<template>
  <div class="padded-container" v-if="!isLoadingContent">
    <ui-configuration v-if="activeContent === 'ui-configuration'"></ui-configuration>
    <b-row v-else-if="activeContent === 'user-access' && authenticationEnabled">
      <b-col>
        <b-alert variant="primary" show>User Access Management Coming Soon!</b-alert>
      </b-col>
    </b-row>
    <b-row v-else-if="activeContent === 'user-access' && !authenticationEnabled">
      <b-col>
        <b-alert variant="danger" show>Authentication is Disabled.</b-alert>
        <b-alert variant="info" show>To enable this feature, modify the configuration located in the customMain.js file.</b-alert>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <b-alert variant="warning" show>No Content Selected.</b-alert>
      </b-col>
    </b-row>
  </div>
  <div v-else>
    <loading-screen></loading-screen>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import LoadingScreen from "../layout/components/LoadingScreen";
  import UiConfiguration from "./components/UiConfiguration";
  import alerts from "../utilities/alerts";

  export default {
    name: "Admin",
    data() {
      return {
        message: 'Admin Component Created!',
        activeMenu: 'settings',
        defaultContent: 'ui-configuration'
      }
    },
    created() {
      let activeContent;
      if(typeof this.$route.params.activeContent != 'undefined'){
        activeContent = this.$route.params.activeContent;
        this.$store.dispatch('setActiveMenu',this.activeMenu);
        this.$store.dispatch('setActiveContent',activeContent);
        if(!this.isValidContent){
          this.$router.push('/' + this.activeMenu + '/' + this.defaultContent);
        }
      } else {
        this.$router.push('/' + this.activeMenu + '/' + this.defaultContent);
      }
      this.$store.dispatch('getUsers').then(
        (response) => { },
        (error) => { this.$swal(alerts.endpointError(error)) }
      );
    },
    computed: {
      ...mapGetters([
        'activeContent',
        'isValidContent',
        'isLoadingContent',
        'users',
        'authenticationEnabled'
      ])
    },
    components: {
      'loading-screen': LoadingScreen,
      'ui-configuration' : UiConfiguration
    },
    watch: {
      $route(to, from) {
        let activeContent;
        if (typeof this.$route.params.activeContent != 'undefined') {
          activeContent = this.$route.params.activeContent;
          this.$store.dispatch('setActiveMenu', this.activeMenu);
          this.$store.dispatch('setActiveContent', activeContent);
          if(!this.isValidContent){
            this.$router.push('/' + this.activeMenu + '/' + this.defaultContent);
          }
        } else {
          this.$router.push('/' + this.activeMenu + '/' + this.defaultContent);
        }
      }
    }
  }
</script>

<style scoped>

</style>
