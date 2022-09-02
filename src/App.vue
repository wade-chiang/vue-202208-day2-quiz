
<template>

  <h1>YouBike 臺北市公共自行車即時資訊</h1>


  <search @updateSearch="updateSearch" />


  <row-per-page
    @updateCountOfPages="updateCountOfPagesFunc"
  />


  <reset-order
    @updateCurrentSort="updateCurrentSortFunc"
  />


  <ubike-table :fetchStops="splitedStops" @updateSort="updateSortFunc" />


  <pagination
    :countOfPages="countOfPages"
    :currentPage="currentPage"
    :totalPages="totalPages"
    :pageAddAmount="pageAddAmount"
    @updateCurrentPage="updateCurrentPageFunc"
  />

</template>



<script>

// 欄位說明:
    // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
    // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
    // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
    // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站停用狀態

import { ref, computed, watch } from "vue";


import UbikeTable from "./components/UbikeTable.vue";
import Search from "./components/Search.vue";
import Pagination from "./components/Pagination.vue";
import RowPerPage from "./components/RowPerPage.vue";
import ResetOrder from "./components/ResetOrder.vue";


export default {
  components: {
    UbikeTable,
    Search,
    Pagination,
    RowPerPage,
    ResetOrder
},

  setup() {
    const uBikeStops = ref([]);

    // for search function with Search.vue
    const stopSearch = ref("");

    // for list order, sort with UbikeTable.vue
    const isAsc = ref();
    const currentSort = ref();

    // fetch api to get uBikeStops Information
    fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
      .then(res => res.json())
      .then(json => {
        const stops = Object.keys(json.retVal).map(key => json.retVal[key]);
        uBikeStops.value = stops;
      });


    //////////////////// for Search.vue
    
    // get data from Search.vue (emitSearch)
    const updateSearch = (val) => {
      stopSearch.value = val
    }

    // using search bar to return filtedStops
    const filtedStops = computed(() => {
      return stopSearch.value ? uBikeStops.value.filter(d => d.sna.includes(stopSearch.value)) : uBikeStops.value;
    });



    //////////////////// for UbikeTable.vue

    // get data from UbikeTable.vue (emitSetOrder)
    const updateSortFunc = (currentSortValue, isAscValue) => {
      currentSort.value = currentSortValue
      isAsc.value = isAscValue
    }

    // return filted stops or sorted stops to display in UbikeTabke.vue
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


    //////////////////// for Pagination.vue

    // 每頁顯示10筆
    const countOfPages = ref(10);
    
    // set current page to page 1
    const currentPage = ref(1);
    
    // count the total page by calculate with filtedStops.value.length and countOfPages
    const totalPages = computed( () => Math.ceil(filtedStops.value.length / countOfPages.value) );

    // count splited stops depends on countOfPages
    const splitedStops = computed ( () => {
      let start = (currentPage.value - 1 ) * countOfPages.value
      let end = start + countOfPages.value
      return sortedStops.value.slice(start, end)
    })

    // i don't know how to explain it , it's about display the page button
    const pageAddAmount = computed(() => {
      return Math.floor( (currentPage.value - 1) / 10 ) * 10;
    });

    // return to page 1 if using the search function
    watch([stopSearch, countOfPages], () => {
      currentPage.value = 1
    })

    // get current page from Pagination.vue (emitCurrentPage)
    const updateCurrentPageFunc = (val) => {
      currentPage.value = val
    }


    //////////////////// for RowPerPage.vue
    const updateCountOfPagesFunc = (val) => {
      countOfPages.value = val
    }


    //////////////////// for ResetOrder.vue
    const updateCurrentSortFunc = (val) => {
      currentSort.value = ""
    }


    return {
      uBikeStops,
      filtedStops,
      updateSearch,
      isAsc,
      currentSort,
      updateSortFunc,
      sortedStops,
      countOfPages,
      currentPage,
      totalPages,
      splitedStops,
      pageAddAmount,
      updateCurrentPageFunc,
      updateCountOfPagesFunc,
      updateCurrentSortFunc
    }
  }
}

</script>



<style >

  body {
    padding: 1em;
  }

</style>