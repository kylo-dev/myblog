<template>
    <div class="container mb-3">
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

    </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import store from "@/scripts/store";

export default {
    name: 'Login',

    setup() {
        const hostName = window.location.hostname;
        const hostNameServerUrl = 'http://' + hostName + ':8080';
        const state = reactive({
            form:{
                username: "",
                password: ""
            }
        });

        const submit = () =>{
            axios.post(hostNameServerUrl + '/api/user/login', state.form)
            .then((res)=>{
                if (res.data.status === 500 && res.data.data === '404 NOT_FOUND') {
                    window.alert("로그인 정보가 존재하지 않습니다.");
                    window.location.reload();
                    return;
                }
                store.commit('setAccount', res.data);
                sessionStorage.setItem("id", res.data);
                window.alert("로그인 되었습니다.");
                window.location.href = "/";
            }).catch(() => {
                window.alert("로그인 정보가 존재하지 않습니다.");
            });
        }
        return {state, submit, hostName, hostNameServerUrl}
    }
}
</script>

<style>
</style>