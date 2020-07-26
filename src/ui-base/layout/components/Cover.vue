<template>
  <div id="coverContainer">
    <div id="coverMessageContainer">
      <h5>{{activeCoverMessage.mainMessage}}</h5>
      <br/>
      <br/>
      <p>{{activeCoverMessage.subMessage}}</p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "Cover",
    data() {
      return {
        message: 'Cover Component Created!',
      }
    },
    created() {

    },
    computed: {
      ...mapGetters([
        'activeCover',
        'activeCoverMessage'
      ])
    }
  }
</script>

<style scoped>

  #coverContainer {
    top:0;
    z-index:10001;
    height:100%;
    width:100%;
    position:absolute;
    display:grid;
    background-color: #282828;
    grid-template-rows: 25% 1fr 25%;
    grid-template-columns: 10% 1fr 10%;
  }

  #coverMessageContainer {
    grid-row: 2;
    grid-column: 2;
    text-align:center;
    color:white;
  }

</style>
