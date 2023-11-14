<template>
  <div class="container">
    <form class="m-4">
      <input type="hidden" id="id" v-model="user.id">

      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="user.username" class="form-control" id="username" placeholder="Enter Username" type="text" readonly>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input :readonly="user.oauth !== null" v-model="user.password" class="form-control" id="password" placeholder="Enter password" type="password">
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input :readonly="user.oauth !== null" v-model="user.email" class="form-control" id="email" placeholder="Enter email" type="email">
      </div>
    </form>
    <button @click="updateUser" class="btn btn-primary mx-4 mb-2">회원 수정완료</button>
  </div>

</template>


<script></script>

<style></style>