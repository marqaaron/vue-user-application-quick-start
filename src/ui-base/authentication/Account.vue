<template>
  <div class="padded-container" v-if="!isLoadingContent">
    <b-row>
      <b-col>
        <b-alert variant="primary" show>Account Details Coming Soon!</b-alert>
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

  export default {
    name: "Account",
    data() {
      return {
        form: 'login-form',
        activeMenu: 'account',
        defaultContent: 'profile'
      }
    },
    created() {
      let activeContent = this.defaultContent;
      this.$store.dispatch('setActiveMenu',this.activeMenu);
      this.$store.dispatch('setActiveContent',activeContent);
    },
    methods: {

    },
    computed: {
      ...mapGetters([
        'isLoadingContent'
      ])
    },
    components: {
      'loading-screen': LoadingScreen
    },
    watch: {

    }
  }
</script>

<style scoped>

</style>
