<template>
  <div id="notFoundContainer">
    <b-row class="pt-3">
      <b-col>
        <b-alert variant="danger" show>{{message}}</b-alert>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    export default {
      name: "NotFound",
      data() {
        return {
          message: 'Page Not Found!'
        }
      }
    }
</script>

<style scoped>
  #notFoundContainer{
    padding: 0 8px;
  }
</style>
