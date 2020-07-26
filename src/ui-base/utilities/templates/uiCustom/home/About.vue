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
  import {mapGetters} from "vuex";
  import LoadingScreen from "../../ui-base/layout/components/LoadingScreen";

  export default {
    name: "About",
    data() {
      return {
        message: 'About Us Coming Soon!',
        activeMenu: 'home',
        defaultContent: 'about'
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
