<template>
  <div class="container">
    <div v-if="state.posts.length === 0">
      <table class="table table-bordered border-primary mt-4">
        <tr>
          <td>자료 없음</td>
        </tr>
      </table>
    </div>

     <div v-for="board in state.posts" :key="board.id">
      <div class="card m-2">
        <div class="card-body">
          <h4 class="card-title">{{ board.title }}</h4>
          <router-link :to="'/board/' + board.id" class="btn btn-primary">상세보기</router-link>
        </div>
      </div>
    </div>
<!--
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled': boards.first, 'active': !boards.first }">
        <a class="page-link" :href="getPaginationLink(boards.number - 1)">Previous</a>
      </li>
      <li class="page-item" :class="{ 'disabled': boards.last, 'active': !boards.last }">
        <a class="page-link" :href="getPaginationLink(boards.number + 1)">Next</a>
      </li>
    </ul> -->
  </div>
</template>
  
<script>
import axios from 'axios';
import { reactive } from 'vue';
export default {
  name : "Home",

  setup() {
    const state = reactive({
      posts: [],
    });
    
    axios.get("/api/home")
      .then((res) => {
      state.posts = res.data.content;
    })
    .catch(err => {
      console.error(err);
    });

    return {state};
  }
}
</script>


<style scoped>
  /* Add your styles here */
</style>
  