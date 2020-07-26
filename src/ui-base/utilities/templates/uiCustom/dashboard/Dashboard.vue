<template>
  <div class="padded-container" v-if="!isLoadingContent">
    <b-row>
      <b-col v-if="activeContent === 'dashboardItem1'">
        <b-alert variant="warning" show>Dashboard Active Content: {{activeContent}}</b-alert>
      </b-col>
      <b-col v-else-if="activeContent === 'dashboardItem2'">
        <b-alert variant="success" show>Dashboard Active Content: {{activeContent}}</b-alert>
      </b-col>
      <b-col v-else-if="activeContent === 'dashboardItem3'">
        <b-alert variant="danger" show>Dashboard Active Content: {{activeContent}}</b-alert>
      </b-col>
    </b-row>
  </div>
  <div v-else>
    <loading-screen></loading-screen>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from "vuex";
  import LoadingScreen from "../../ui-base/layout/components/LoadingScreen";
  export default {
    name: "Dashboard",
    data() {
      return {
        activeMenu: 'dashboard',
        defaultContent: 'dashboardItem1'
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

    },
    computed: {
      ...mapGetters([
        'activeContent',
        'isValidContent',
        'isLoadingContent'
      ])
    },
    actions: {
      ...mapActions([
        'setActiveMenu',
        'setActiveContent'
      ])
    },
    components: {
      'loading-screen': LoadingScreen
    },
    watch: {
      $route(to,from){
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
      }
    }
  }
</script>

<style scoped>

</style>
