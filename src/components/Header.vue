<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
      <a class="navbar-brand" href="/">Gyeom blog</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav" v-if="!isAuthenticated">
          <li class="nav-item">
            <a class="nav-link" href="/auth/loginForm">Log in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/auth/joinForm">Join us</a>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="isAuthenticated">
          <li class="nav-item">
            <a class="nav-link" href="/board/saveForm">Write</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/user/updateForm">User Info</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/logout">Log out</a>
          </li>
        </ul>
      </div>
    </nav>
    <br/>
  </template>
  
  <script>
  export default {
    name: 'Header',
    data() {
      return {
        isAuthenticated: false, // Set this value dynamically based on authentication status
      };
    },
    // Add methods or lifecycle hooks as needed
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  