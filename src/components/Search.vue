<template>

  <input type="text" placeholder="站點查詢" v-model="stopSearch" v-on:input="emitSearch">

</template>



<script>
  
import { ref, computed } from 'vue'

export default {

  setup(props, { emit }) {

    const stopSearch = ref("")    

    const emitSearch = () => {
      emit('updateSearch', stopSearch.value)
    };


    return {
      stopSearch,
      emitSearch
    }
  }
}

</script>



<style>
</style>