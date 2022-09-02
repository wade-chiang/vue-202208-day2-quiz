<template>

  每頁顯示筆數
  <!-- using v-model.number to convert value from string to number -->
  <select 
    v-model.number="countOfPages"
    @change="emitCountOfPages"
  >
    <option value=10>10</option>
    <option value=20>20</option>
    <option value=30>30</option>
  </select>

</template>



<script>

  import { ref } from 'vue'

  export default {

    setup(props, { emit }) {
      const countOfPages = ref(10)

      const emitCountOfPages = () => {
        emit('updateCountOfPages', countOfPages.value)
      };

      return {
        countOfPages,
        emitCountOfPages
      }
    }

  }


</script>



<style></style>