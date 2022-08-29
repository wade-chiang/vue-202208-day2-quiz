
<template>

  <!-- <main>
    <TheWelcome />
  </main> -->

  <h1>YouBike 臺北市公共自行車即時資訊</h1>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>場站名稱</th>
        <th>場站區域</th>
        <th>目前可用車輛
          <i class="fa fa-sort-asc" aria-hidden="true"></i>
          <i class="fa fa-sort-desc" aria-hidden="true"></i>
        </th>
        <th>總停車格
          <i class="fa fa-sort-asc" aria-hidden="true"></i>
          <i class="fa fa-sort-desc" aria-hidden="true"></i>
        </th>
        <th>資料更新時間</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in uBikeStops" :key="s.sno">
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



<style scoped>
  
</style>



<script>
import { ref, computed, createApp } from "vue";

import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';


export default {
  components: {
    TheWelcome
  },
  setup() {
    const uBikeStops = ref([]);
    const isStopsFilter = ref(false);

    fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
      .then(res => res.json())
      .then(json => {
        const stops = Object.keys(json.retVal).map(key => json.retVal[key]);
        uBikeStops.value = stops;
      });

    const filtedStops = computed(() => {
      return isStopsFilter.value ? uBikeStops.value.filter(d => d.sbi > 0) : uBikeStops.value;
    });

    const timeFormat = (val) => {
      // 時間格式
      const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
      return val.replace(pattern, '$1/$2/$3 $4:$5:$6');
    };

    return {
      uBikeStops,
      filtedStops,
      isStopsFilter,
      timeFormat
    }
  }
}

</script>