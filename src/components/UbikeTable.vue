<template>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>場站名稱</th>
        <th>場站區域</th>

        <th @click="emitSetOrder('sbi', !isAsc)">
          目前可用車輛

          <template v-if=" currentSort === 'sbi' ">
            <i v-if="isAsc" class="fa fa-sort-asc" aria-hidden="true"></i>
            <i v-else class="fa fa-sort-desc" aria-hidden="true"></i>
          </template>

        </th>

        <th @click="emitSetOrder('tot', !isAsc)">
          總停車格

          <template v-if=" currentSort === 'tot' ">
            <i v-if="isAsc" class="fa fa-sort-asc" aria-hidden="true"></i>
            <i v-else class="fa fa-sort-desc" aria-hidden="true"></i>
          </template>

        </th>

        <th>資料更新時間</th>
      </tr>
    </thead>
    <tbody>
      <!-- <tr v-for="s in stops" :key="s.sno"> -->
      <tr v-for="s in fetchStops" :key="s.sno">
        <!-- <tr v-for="s in sortedStops" :key="s.sno"> -->
        <td>{{ s.sno }}</td>
        <td>{{ s.sna }}</td>
        <td>{{ s.sarea }}</td>
        <td>{{ s.sbi }}</td>
        <td>{{ s.tot }}</td>
        <td>{{ timeFormat(s.mday) }}</td>
      </tr>
    </tbody>
  </table>

</template>



<script>

import { ref } from "vue";

export default {

  props: {
    fetchStops : Array
  },

  setup(props, { emit }) {

    const currentSort = ref("sbi")

    const isAsc = ref(false)

    const emitSetOrder = (field, order) => {
      currentSort.value = field;
      isAsc.value = order
      emit('updateSort', currentSort.value, isAsc.value)
    }

    const timeFormat = (val) => {
      // 時間格式
      const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
      return val.replace(pattern, '$1/$2/$3 $4:$5:$6');
    };

    return {
      timeFormat,
      isAsc,
      currentSort,
      emitSetOrder
    }
  }
}

</script>



<style></style>



