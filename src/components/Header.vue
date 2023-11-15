<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
      <a class="navbar-brand" href="/">Gyeom blog</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav" v-if="!$store.state.account.id">
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
            <a class="nav-link" href="/user/updateForm">User Info</a>
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
import router from '@/router';
import store from '@/scripts/store';
import axios from 'axios';

  export default {
    name: 'Header',

    setup() {
      const logout = () =>{
        axios.post("/api/user/logout")
          .then(({data})=>{
            if(data.status === 200 && data.data === 1){
              store.commit('setAccount', 0);
              window.alert("로그아웃 되었습니다.")
              sessionStorage.removeItem("id");
              router.push({path: "/"});
            }
          }).catch(()=>{
            window.alert("로그아웃 오류 발생");
          });
      }
      return {logout}
    }
  };
</script>

<style>
.nav-link{
  cursor: pointer;
}
</style>
  