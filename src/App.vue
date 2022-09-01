
<template>



  <h1>YouBike 臺北市公共自行車即時資訊</h1>

  <search @updateSearch="updateSearch" />

  <!-- <UbikeTable :fetchStops="uBikeStops" /> -->
  <ubike-table :fetchStops="sortedStops" @updateSort="updateSortFunc" />

</template>


<style >

  body {
    padding: 1em;
  }

  ul {
    display: block;
    margin: 1rem auto 2rem;
    overflow: hidden;
  }

  .pager {
    float: left;
    display: block;
    height: 25px;
    text-align: center;
    margin-right: 5px;
    border: 1px solid #aaa;
  }

  .pager.active a {
    background-color: #000;
    color: #fff !important;
  }

  .pager a {
    padding: 5px;
    line-height: 25px;
    text-decoration: none;
  }

</style>



<script>

// 欄位說明:
    // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
    // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
    // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
    // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站停用狀態


import { ref, computed } from "vue";

import UbikeTable from "./components/UbikeTable.vue";
import Search from "./components/Search.vue";

export default {
  components: {
    UbikeTable,
    Search
  },
  setup() {
    const uBikeStops = ref([]);
    // const isStopsFilter = ref(false);
    const stopSearch = ref("");
    const isAsc = ref();
    const currentSort = ref();


    fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
      .then(res => res.json())
      .then(json => {
        const stops = Object.keys(json.retVal).map(key => json.retVal[key]);
        uBikeStops.value = stops;
      });


    const updateSearch = (val) => {
      stopSearch.value = val
    }

    const updateSortFunc = (currentSortValue, isAscValue) => {
      currentSort.value = currentSortValue
      isAsc.value = isAscValue
    }

    const filtedStops = computed(() => {
      return stopSearch.value ? uBikeStops.value.filter(d => d.sna.includes(stopSearch.value)) : uBikeStops.value;
    });


    const sortedStops = computed(() => {
      if (currentSort.value === '') {
        return filtedStops.value
      }
      // 因為sort過後會破壞性的改變原本的陣列，所以clone一個新的陣列stops來使用
      const stops = [...filtedStops.value];
      if (isAsc.value) {
        stops.sort((a, b) => a[currentSort.value] - b[currentSort.value]);
      } else {
        stops.sort((a, b) => b[currentSort.value] - a[currentSort.value]);
      }

      return stops;
    });


    return {
      uBikeStops,
      filtedStops,
      // isStopsFilter,
      // stopSearch,
      updateSearch,
      isAsc,
      currentSort,
      updateSortFunc,
      sortedStops
      // stops,
    }
  }
}

</script>