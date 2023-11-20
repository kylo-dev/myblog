<template>

  <div class="container">
    

      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="state.posts.username" class="form-control" id="username" type="text" readonly>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="state.posts.email" class="form-control" id="email" type="email" readonly>
      </div>

      <div class="form-group">
        <label for="role">Role</label>
        <input v-model="state.posts.role" class="form-control" id="role" type="text" readonly>
      </div>

  </div>

</template>


<script>
import axios from 'axios';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';


export default {
  name : "UserDetail",

  setup() {
    const route = useRoute();
    const userId = route.params.id;

    const state = reactive({
      posts: []
    });

    axios.get(`/api/user/${userId}`)
    .then((res) => {
      state.posts = res.data;

      })
      .catch(err => {
        console.error(err);
      });

      return {userId, state}
  }

}
</script>

<style></style>