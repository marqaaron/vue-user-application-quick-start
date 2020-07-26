<template>
  <div id="uiRoutesContainer">
    <b-row>
      <b-col>
        <b-alert variant="primary" show>Manage Routes Feature Coming Soon!</b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  export default {
    data() {
      return {
        editing: false,
        preventSave: false
      }
    },
    created() {

    },
    computed: {
      ...mapGetters([

      ])
    },
    methods: {

    },
    components: {

    }
  }
</script>

<style scoped>

</style>
