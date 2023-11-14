<template>
  <div class="container">
    <form class="m-4">
      <input type="hidden" id="id" v-model="board.id">
      <div class="form-group">
        <label for="title">Title</label>
        <input class="form-control" id="title" placeholder="Enter Title" type="text" v-model="board.title">
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <textarea class="form-control summernote" rows="5" id="content" v-model="board.content"></textarea>
      </div>
    </form>
    <button @click="updateBoard" class="btn btn-primary mx-4 mb-2" type="button">글수정 완료</button>
  </div>
</template>

<script></script>

<style>
</style>