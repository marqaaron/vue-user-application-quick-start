<template>
  <div id="loadingScreenContainer">
    <div id="loadingSpinner">
      <loading-spinner></loading-spinner>
    </div>
  </div>
</template>

<script>
  import LoadingSpinner from "./LoadingSpinner";
  export default {
    data(){
      return {

      }
    },
    components: {
      'loading-spinner': LoadingSpinner
    }
  }
</script>

<style scoped>

  #loadingScreenContainer{
    position: absolute;
    display:grid;
    grid-template-areas: 'top top top'
                        'left middle right'
                        'bottom bottom bottom';
    height:100%;
    width:100%;
  }

  #loadingSpinner{
    grid-area:middle;
  }

</style>
