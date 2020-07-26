<template>
  <div id="spinnerContainer">
    <circle-spin v-if="spinner() === 'circle-spin'"></circle-spin>
    <square v-if="spinner() === 'square'"></square>
    <tile v-if="spinner() === 'tile'"></tile>
    <pulse v-if="spinner() === 'pulse'"></pulse>
    <fold v-if="spinner() === 'fold'"></fold>
    <cube v-if="spinner() === 'cube'"></cube>
    <bounce v-if="spinner() === 'bounce'"></bounce>
    <h5 class="text-center mt-5">Loading</h5>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        spinners: [
          'circle-spin',
          'square',
          'tile',
          'pulse',
          'fold',
          'bounce'
        ]
      }
    },
    methods: {
      spinner: function(){
        return this.spinners[this.getRandomSpinnerArrayPosition];
      }
    },
    computed: {
      getRandomSpinnerArrayPosition: function(){
        let randomSpinnerArrayPosition = Math.floor(Math.random() * (this.spinners.length));
        return randomSpinnerArrayPosition;
      }
    }
  }
</script>

<style>
  #spinnerContainer {
    width:100%;
  }

  .spinner,
  .sk-fading-circle,
  .sk-folding-cube {
    margin: 0 auto !important;
    width: 70px !important;
    height: 70px !important;
  }
</style>
