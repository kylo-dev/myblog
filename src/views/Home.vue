<template>
    <div class="container">
      <div>
        <table class="table table-bordered border-primary mt-4">
          <tr>
            <td>자료 없음</td>
          </tr>
        </table>
      </div>
      <!-- <div v-else v-for="board in boards.content" :key="board.id">
        <div class="card m-2">
          <div class="card-body">
            <h4 class="card-title">{{ board.title }}</h4>
            <router-link :to="{ name: 'BoardDetail', params: { id: board.id } }" class="btn btn-primary">상세보기</router-link>
          </div>
        </div>
      </div>
  
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
  export default {
    name: "Home",
    props: {
      boards: null, // Assuming boards is a prop passed to this component
    },
    methods: {
      isEmpty(content) {
        return content == null || content.length === 0;
      },
      getPaginationLink(page) {
        return `?page=${page}`;
      },
    },
  };
  </script>
  
  <style scoped>
    /* Add your styles here */
  </style>
  