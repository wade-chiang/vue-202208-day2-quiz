<template>

  <button @click="emitCurrentSort">
    重置排序
  </button>

</template>



<script>

  import { ref } from 'vue'

  export default {

    setup(props, { emit }) {

      const currentSort = ref("")

      const emitCurrentSort = () => {
        emit('updateCurrentSort', currentSort.value)
      }

      return {
        currentSort,
        emitCurrentSort
      }
    }

  }


</script>



<style>

  button {
    position: absolute;
    right: 30px;
  }

</style>