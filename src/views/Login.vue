<template>
    <div class="container">
        <div class="form-group">
            <label for="username">Username</label>
            <input class="form-control" id="username"
                    v-model="state.form.username" placeholder="Enter Username" type="text">
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" id="password"
                    v-model="state.form.password" placeholder="Enter password" type="password">
        </div>

        <button class="btn btn-primary" id="btn-login" @click="submit()">로그인</button>
        <!-- <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1f0c8af976d2a64af21867e75e6198ea&redirect_uri=http://localhost:8082/auth/kakao/callback">
            <img th:src="@{/image/kakao_login.png}" height="38px">
        </a> -->
    </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import router from "@/router/index";
import store from "@/scripts/store";

export default {
    name: 'Login',

    setup() {
        const state = reactive({
            form:{
                username: "",
                password: ""
            }
        });

        const submit = () =>{
            axios.post("/api/user/login/test", state.form)
            .then((res)=>{
                if (res.data.status === 500 && res.data.data === '404 NOT_FOUND') {
                    window.alert("로그인 정보가 존재하지 않습니다.");
                    window.location.reload();
                    return;
                }
                store.commit('setAccount', res.data);
                console.log(res.data);
                sessionStorage.setItem("id", res.data);
                window.alert("로그인 되었습니다.");
                router.push({path: "/"});
            }).catch(() => {
                window.alert("로그인 정보가 존재하지 않습니다.");
            });
        }
        return {state, submit}
    }
}
</script>

<style>
</style>