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

    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled': state.page.first, 'active': !state.page.first }">
        <button class="page-link" @click="prev()">Previous</button>
      </li>
      <li class="page-item" :class="{ 'disabled': state.page.last, 'active': !state.page.last }">
        <button class="page-link" @click="next()">Next</button>
      </li>
    </ul>

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
      page: {}
    });
    
    axios.get("/api/home")
      .then((res) => {
      state.posts = res.data.content;
      state.page = {
        'first': res.data.first,
        'last': res.data.last,
        'number': res.data.number,
      };
      console.log(res.data);
      console.log(state.page);
    })
    .catch(err => {
      console.error(err);
    });

    const prev = ()=>{
      const newPage = state.page.number - 1;
      axios.get(`/api/home?page=${newPage}`)
        .then((res) => {
        state.posts = res.data.content;
        state.page = {
          'first': res.data.first,
          'last': res.data.last,
          'number': res.data.number,
        };
        console.log(res.data);
        console.log(state.page);
      })
      .catch(err => {
        console.error(err);
      });
    }

    const next = ()=>{
      const newPage = state.page.number + 1;
      axios.get(`/api/home?page=${newPage}`)
        .then((res) => {
        state.posts = res.data.content;
        state.page = {
          'first': res.data.first,
          'last': res.data.last,
          'number': res.data.number,
        };
        console.log(res.data);
        console.log(state.page);
      })
      .catch(err => {
        console.error(err);
      });
    }

    return {state, prev, next};
  }
}
</script>


<style scoped>
  /* Add your styles here */
</style>
  