<template>
  <div class="container mt-2">
    <button class="btn btn-secondary" @click="goBack">돌아가기</button>
    <!-- 글 작성자만 수정 및 삭제 가능 -->
    <span v-if="form.user_id == hostId">
      <button class="btn btn-warning" @click="updateBoard()">수정</button>
      <button class="btn btn-danger" @click="deleteBoard()">삭제</button>
    </span>

    <br/> <br/>
    <div>
      글 번호: <span id="Id">{{boardId}}</span>
      작성자: <span>{{form.user_id}}</span>
    </div>
    <br />
    <div>
      <!-- <h3>제목 : {{state.posts.title}}</h3> -->
      <input class="form-control" v-text="form.title" v-model="form.title"
           placeholder="Enter Title" type="text">
    </div>
    <hr />
    <div class="form-group">
          <div id="editor"></div>
    </div>
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
import router from '@/router';
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import axios from 'axios';
import { onMounted, reactive, ref} from 'vue';
import { useRoute } from 'vue-router';
export default {
  name : "Detail",


  setup() {
    const route = useRoute();
    const editor = ref();
    const boardId = route.params.id;
    const hostId = sessionStorage.getItem("id");

    const form = reactive({
      title: '',
      content: '',
      user_id: ''
    });

    onMounted(async () => {
      try {
        // URL에서 path parameter 값을 가져와서 데이터에 할당
        const { data } = await axios.get('/api/board/' + boardId);
        form.title = data.title;
        form.user_id = data.user_id;

        console.log(boardId);
        console.log(data);

        editor.value = new Editor({
          el: document.querySelector('#editor'),
          height: '500px',
          initialEditType: 'wysiwyg',
          initialValue: data.content,
          hooks: {
            async addImageBlobHook(blob, callback) {
              // 이미지 업로드 로직 커스텀
              try {
                const formData = new FormData();
                formData.append('image', blob);

                const response = await fetch('/api/tui-editor/image-upload', {
                  method: 'POST',
                  body: formData,
                });

                const filename = await response.text();
                console.log('서버에 저장된 파일명 : ', filename);

                const imageUrl = `/api/tui-editor/image-print?filename=${filename}`;
                callback(imageUrl, 'image alt attribute');

              } catch (error) {
                console.error('업로드 실패 : ', error);
              }
            },
          },
        });
      } catch (err) {
        console.error(err);
      }
    });
    
    const updateBoard = () =>{
      if(window.confirm("정말 수정하시겠습니까?")){
        form.content = editor.value.getMarkdown();

        console.log(form);

        axios.patch(`/api/board/update/${boardId}`, form)
        .then((res)=>{
          if(res.data.status === 500) {
                window.alert("서버 오류가 발생하였습니다. 다시 작성해주세요");
                window.location.reload();
                return;
          }
          window.alert("게시글이 수정되었습니다.")
          router.push({path: `/board/${boardId}`});
          }).catch(()=>{
            window.alert("다시 글을 수정해주세요.")
          });
        }
    };

    const deleteBoard = () =>{
      if(window.confirm("정말 삭제하시겠습니까?")){
        axios.delete(`/api/board/delete/${boardId}`)
        .then((res)=>{
          if(res.data.status === 400) {
              window.alert("서버 오류가 발생하였습니다. 다시 수행해 주세요");
              window.location.reload();
              return;
          }
          window.alert("게시글이 삭제되었습니다.")
          router.push({path: "/"});
        }).catch(()=>{
            window.alert("다시 수행해 주세요");
        });
      }
    }

    return { editor, hostId, boardId, form, updateBoard, deleteBoard }
  }
}
</script>

<style></style>