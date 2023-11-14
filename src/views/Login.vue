<template>
    <div class="container">
        <form action="/auth/loginProc" method="post" class="m-4">

            <div class="form-group">
                <label for="username">Username</label>
                <input class="form-control" id="username" name="username" placeholder="Enter Username" type="text">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input class="form-control" id="password" name="password" placeholder="Enter password" type="password">
            </div>

            <button class="btn btn-primary" id="btn-login" type="submit">로그인</button>
            <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1f0c8af976d2a64af21867e75e6198ea&redirect_uri=http://localhost:8082/auth/kakao/callback">
                <img th:src="@{/image/kakao_login.png}" height="38px">
            </a>
        </form>

    </div>
</template>

<script>

export default {
    name: 'Login',
}
</script>

<style>
</style>