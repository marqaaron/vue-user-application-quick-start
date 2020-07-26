<template>
  <div class="padded-container" v-if="!isLoadingContent">
    <b-row>
      <b-col>
        <b-alert variant="primary" show>{{message}}</b-alert>
      </b-col>
    </b-row>
  </div>
  <div v-else>
    <loading-screen></loading-screen>
  </div>
</template>

<script>
  import LoadingScreen from "../../ui-base/layout/components/LoadingScreen";
  import {mapGetters} from "vuex";
  export default {
    name: "Home",
    data() {
      return {
        message: 'Home Page Coming Soon!',
        activeMenu: 'home',
        defaultContent: 'welcome'
      }
    },
    created() {
      let activeContent;
      if(typeof this.$route.params.activeContent != 'undefined'){
        activeContent = this.$route.params.activeContent;
      } else {
        activeContent = this.defaultContent;
      }
      this.$store.dispatch('setActiveMenu',this.activeMenu);
      this.$store.dispatch('setActiveContent',activeContent);
    },
    computed: {
      ...mapGetters([
        'isLoadingContent'
      ])
    },
    components: {
      'loading-screen': LoadingScreen
    }
  }
</script>

<style scoped>

</style>
