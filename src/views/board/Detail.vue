<template>
  <div class="container mt-2">
    <button class="btn btn-secondary" @click="goBack">돌아가기</button>
    <!-- 글 작성자만 수정 및 삭제 가능 -->
    <span v-if="state.posts.user_id == hostId">
        <a class="btn btn-warning" href="'/board/' + boardId + '/updateForm'">수정</a>
      <button class="btn btn-danger" @click="deleteBoard">삭제</button>
    </span>

    <br/> <br/>
    <div>
      글 번호: <span id="Id">{{boardId}}</span>
      작성자: <span>{{state.posts.user_id}}</span>
    </div>
    <br />
    <div>
      <h3>제목 : {{state.posts.title}}</h3>
    </div>
    <hr />
    <div class="form-group">
          <label for="content">내용</label>
          <textarea class="form-control" rows="5" id="content" v-html="state.posts.content" disabled></textarea>
    </div>
    <!-- <div>
      <div v-html="state.posts.content"></div>
    </div> -->
    <hr />
  </div>
</template>
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

<script>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
export default {
  name : "Detail",


  setup() {
    const route = useRoute();
    const state = reactive({
      posts: [],
    });
    const boardId = route.params.id;
    const hostId = sessionStorage.getItem("id");
    onMounted(() => {
      // URL에서 path parameter 값을 가져와서 데이터에 할당
      axios.get('/api/board/' + boardId)
        .then(({data}) => {
          console.log(hostId);
          console.log(data);
          state.posts = data;
        })
        .catch(err => {
          console.log(err);
        });
    });
    return { hostId,boardId, state };
  }
}
</script>

<style></style>