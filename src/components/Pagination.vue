<template>
  
  <ul>
    <li
      @click.prevent="currentPage = (currentPage > 1) ? currentPage - 1 : currentPage"
      @click="emitCurrentPage"
      class="pager">
      <a href="#"> &lt; </a>
    </li>

    <template v-for="n in 10">
      
      <li
        v-if="(n + pageAddAmount) <= totalPages"
        @click.prevent = "currentPage = ( n + pageAddAmount )"
        @click="emitCurrentPage"
          class="pager" 
        :class="{
          'active': currentPage === ( n + pageAddAmount)
        }"
      >
        <!-- n 從 1 開始計算 -->
        <a href="#">{{ n + pageAddAmount }}</a>
      </li>
      
    </template>

    <li
      @click.prevent="currentPage = (currentPage === totalPages) ? currentPage : currentPage + 1"
      @click="emitCurrentPage"
      class="pager">
      <a href="#"> &gt; </a>
    </li>
  </ul>

</template>



<script>

export default {

  props: {
    countOfPages: Number,
    currentPage: Number,
    totalPages: Number,
    pageAddAmount: Number
  },
  
  setup (props, { emit }) {

    const emitCurrentPage = () => {
      emit('updateCurrentPage', props.currentPage)
    };

    return {
      emitCurrentPage
    }
  }
}

</script>



<style>

  ul {
    display: block;
    margin: 1rem auto 2rem;
    overflow: hidden;
  }
  
  .pager {
    float: left;
    display: block;
    height: 30px;
    width: 30px;
    text-align: center;
    margin-top: 5px;
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