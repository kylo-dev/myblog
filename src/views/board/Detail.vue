<template>
  <div class="container mt-2">
    <div class="form-row float-right">
      <button class="btn btn-secondary" @click="goBack">돌아가기</button>
      <!-- 글 작성자만 수정 및 삭제 가능 -->
      <span v-if="form.user_id == hostId">
        <button class="btn btn-warning" @click="updateBoard()">수정</button>
        <button class="btn btn-danger" @click="deleteBoard()">삭제</button>
      </span>
    </div>

    
    <p class="lead fw-bold">
      <strong>[No: {{boardId}} &nbsp; 작성자: {{form.username}}]     </strong>
    </p>
    
    <hr />
    <div class="mb-3">
      <h3>Title</h3>
      <input class="form-control" v-text="form.title" v-model="form.title"
           placeholder="Enter Title" type="text"
           :disabled="form.user_id !== hostId">
    </div>
    
    <h3>Content</h3>
    <div class="form-group">
      <div id="editor"></div>
    </div>

    <div class="form-group">
      <div id="viewer"></div>
    </div>
    <hr />
  </div>

  <!-- 댓글 작성 -->
    <div class="card align-center" style="width: 65%; margin: 0 auto;">
        <div class="card-body">
          <textarea class="form-control" rows="1" v-model="reply.content" placeholder="댓글을 입력하세요"></textarea>
        </div>

        <div class="card-footer">
          <button type="button" @click="submitReply" class="btn btn-primary float-right">등록</button>
        </div>
    </div>
    <br />

    <!-- 댓글 리스트 -->
    <div class="card mb-4" style="width: 65%; margin: 0 auto;">
      <div class="card-header">댓글 리스트</div>
      <ul id="reply-box" class="list-group">
        <li v-for="reply in form.replies" :key="reply.id" class="list-group-item d-flex justify-content-between">
          <div>{{ reply.content }}</div>
          <div class="d-flex">
            <div class="font-italic">작성자: {{ reply.username }} &nbsp;</div>
            <button v-if="reply.userId == hostId" @click="deleteReply(reply.replyId)" class="badge">삭제</button>
          </div>
        </li>
      </ul>
    </div>

</template>

<script>
import router from '@/router';
import Editor from '@toast-ui/editor'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor.css'
import axios from 'axios';
import { onMounted, reactive, ref} from 'vue';
import { useRoute } from 'vue-router';
export default {
  name : "Detail",

  setup() {
    const route = useRoute();
    const editor = ref();
    const viewer = ref();
    const boardId = route.params.id;
    const hostId = sessionStorage.getItem("id");

    const form = reactive({
      board_id: '',
      title: '',
      content: '',
      user_id: '',
      username: '',
      replies: {},
    });

    const reply = reactive({
      userId: hostId,
      boardId: boardId,
      content: ''
    })

    onMounted(async () => {
      try {
        // URL에서 path parameter 값을 가져와서 데이터에 할당
        const { data } = await axios.get(`/api/board/${boardId}/reply`);
        form.title = data.title;
        form.user_id = data.user_id;
        form.username = data.username;
        form.content = data.content;
        form.replies = data.replies;

        console.log(hostId);
        console.log(data);
        console.log(form);

        if(data.user_id == hostId){
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
      }else{
        viewer.value = new Viewer({
              el: document.querySelector('#viewer'),
              height: '500px',
              initialEditType: 'wysiwyg',
              initialValue: data.content,
          });
      }
      } catch (err) {
        console.error(err);
      }
    });
    
    const goBack = () =>{
      router.go(-1);
    }

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
          router.go(0);
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
    };

    const submitReply = () =>{
      if (reply.userId === null){
        window.alert("로그인 이후에 댓글을 작성할 수 있습니다.");
        return;
      }
      axios.post(`/api/board/${boardId}/reply`, reply)
      .then((res)=>{
        if(res.data.status === 500) {
                window.alert("서버 오류가 발생하였습니다. 다시 작성해주세요");
                window.location.reload();
                return;
          }
          window.alert("댓글이 작성되었습니다.")
          router.go(0);
          }).catch(()=>{
            window.alert("다시 댓글을 작성해 주세요.")
          });
      };

      const deleteReply = (replyId) => {
        axios.delete(`/api/board/${boardId}/reply/${replyId}`)
        .then((res)=>{
        if(res.data.status === 500) {
                window.alert("서버 오류가 발생하였습니다. 다시 수행해주세요");
                window.location.reload();
                return;
          }
          window.alert("댓글이 삭제되었습니다.")
          router.go(0);
          }).catch(()=>{
            window.alert("다시 삭제해 주세요.")
          });
      }
    

    return { editor, viewer, hostId, boardId, form, reply, updateBoard, deleteBoard, goBack, submitReply, deleteReply }
  }
}
</script>

<style>

</style>