<template>
    <div class="container">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" 
                    v-model="state.form.username" class="form-control" placeholder="Enter Username">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" 
                v-model="state.form.password" class="form-control" placeholder="Enter Password">
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" 
                v-model="state.form.email" class="form-control" placeholder="Enter Email">
            </div>
        <button id="btn-save" class="btn btn-primary mx-4 mb-2" @click="submit()">회원가입</button>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import { reactive } from 'vue';

export default {
    name: 'Join',

    setup() {
        const state = reactive({
            form:{
                username: "",
                password: "",
                email: ""
            }
        });

        const submit = ()=>{
            axios.post("/api/user/join", state.form)
                .then(({data})=>{
                    if (data.status === 200 && data.data === 1) {
                        window.alert("회원가입이 완료되었습니다.");
                        router.push({path: "/auth/loginForm"});
                    }
                }).catch(()=>{
                    window.alert("다시 회원가입을 해주세요.");
                });
        }
        
        return {state, submit}
    }
}

</script>

<style></style>