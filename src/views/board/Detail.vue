<template>
  <div class="container mt-2">
    <button class="btn btn-secondary" @click="goBack">돌아가기</button>
    <!-- 글 작성자만 수정 및 삭제 가능 -->
    <div v-if="board.user.id === currentUser.id">
      <router-link :to="'/board/' + board.id + '/updateForm'" class="btn btn-warning">수정</router-link>
      <button class="btn btn-danger" @click="deleteBoard">삭제</button>
    </div>

    <br/> <br/>
    <div>
      글 번호: <span id="Id">{{ board.id }}</span>
      작성자: <span>{{ board.user.username }}</span>
    </div>
    <br />
    <div>
      <h3>{{ board.title }}</h3>
    </div>
    <hr />
    <div>
      <div v-html="board.content"></div>
    </div>
    <hr />

    <!-- 댓글 작성
    <div class="card">
      <form @submit.prevent="submitReply">
        <input type="hidden" id="userId" v-model="currentUser.id">
        <input type="hidden" id="boardId" v-model="board.id">
        <div class="card-body">
          <textarea v-model="replyContent" class="form-control" rows="1"></textarea>
        </div>
        <div class="card-footer">
          <button type="button" @click="submitReply" class="btn btn-primary">등록</button>
        </div>
      </form>
    </div>
    <br />

    댓글 리스트 
    <div class="card mb-2">
      <div class="card-header">댓글 리스트</div>
      <ul id="reply-box" class="list-group">
        <li v-for="reply in board.replies" :key="reply.id" class="list-group-item d-flex justify-content-between">
          <div>{{ reply.content }}</div>
          <div class="d-flex">
            <div class="font-italic">작성자: {{ reply.user.username }} &nbsp;</div>
            <button v-if="board.user.id === currentUser.id" @click="deleteReply(reply.id)" class="badge">삭제</button>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  name : "Detail",

  setup() {
    // 반응적인 상태 생성
    const state = reactive({
      boardId: null,
    });

    // // 컴포넌트가 마운트되었을 때 실행되는 로직
    // onMounted(() => {
    //   state.boardId = $route.params.id;
    // });
    return {
      state,
    };
  },
  
}
</script>

<style></style>