<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
      <a class="navbar-brand" href="/">Gyeom blog</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav" v-if="!userId">
          <li class="nav-item">
            <a class="nav-link" href="/auth/loginForm">Log in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/auth/joinForm">Join us</a>
          </li>
        </ul>
        <ul class="navbar-nav" v-else>
          <li class="nav-item">
            <a class="nav-link" href="/board/saveForm">Write</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="'/auth/detail/' + userId">User Info</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">Log out</a>
          </li>
        </ul>
      </div>
    </nav>
    <br/>
</template>
  
<script>
import store from '@/scripts/store';
import axios from 'axios';

  export default {
    name: 'Header',

    setup() {
      const hostName = window.location.hostname;
      const hostNameServerUrl = 'http://' + hostName + ':8080';
      const userId = sessionStorage.getItem("id");

      const logout = () =>{
        axios.post(hostNameServerUrl + '/api/user/logout')
          .then(({data})=>{
            if(data.status === 200 && data.data === 1){
              store.commit('setAccount', 0);
              sessionStorage.removeItem("id");
              window.location.href = "/";
            }
          }).catch(()=>{
            window.alert("로그아웃 오류 발생");
          });
      }
      return {userId, logout, hostName, hostNameServerUrl}
    }
  };
</script>

<style>
.nav-link{
  cursor: pointer;
}
</style>
  