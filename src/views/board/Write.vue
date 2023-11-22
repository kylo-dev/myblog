<template>
    <div class="container">
            <div class="form-group">
                <label for="title">Title</label>
                <input class="form-control" id="title" 
                       v-model="state.form.title" placeholder="Enter Title" type="text">
            </div>

            <div class="form-group">
                <div id="editor"></div>
            </div>
        <button class="btn btn-primary mb-2" id="btn-board-save" @click="submit()">글쓰기 완료</button>
    </div>
</template>
  
<script>
import router from '@/router';
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import axios from 'axios';
import { reactive, ref, onMounted } from 'vue';

export default {
  name: 'Write',
  
    setup() {
        const hostName = window.location.hostname;
        const hostNameServerUrl = 'http://' + hostName + ':8080';
        const editor = ref(null);
        const state = reactive({
            form:{
                title: '',
                content: '',
                user_id: sessionStorage.getItem("id")
            }
        });

        const submit = () => {
            if(editor.value){
                state.form.content = editor.value.getMarkdown();
            }

            axios.post(hostNameServerUrl + '/api/board/write', state.form)
            .then((res)=>{
                if(res.data.status === 500) {
                    window.alert("서버 오류가 발생하였습니다. 다시 작성해주세요");
                    window.location.reload();
                    return;
                }
                window.alert("게시글이 작성되었습니다.")
                router.push({path: "/"});
            }).catch(()=>{
                window.alert("다시 글을 작성해주세요.")
            });
        }
        onMounted(()=>{
            editor.value = new Editor({
            el: document.querySelector('#editor'),
            height: '500px',
            initialEditType: 'wysiwyg',
            hooks: {
            async addImageBlobHook(blob, callback) { // 이미지 업로드 로직 커스텀
                try {
                    const formData = new FormData();
                    formData.append('image', blob);

                    // 2. FileApiController - uploadEditorImage 메서드 호출
                    const response = await fetch(hostNameServerUrl + '/api/tui-editor/image-upload', {
                        method : 'POST',
                        body : formData,
                    });

                    // 3. 컨트롤러에서 전달받은 디스크에 저장된 파일명
                    const filename = await response.text();
                    console.log('서버에 저장된 파일명 : ', filename);

                    // 4. addImageBlobHook의 callback 함수를 통해, 디스크에 저장된 이미지를 에디터에 렌더링
                    const imageUrl = hostNameServerUrl + `/api/tui-editor/image-print?filename=${filename}`;
                    callback(imageUrl, 'image alt attribute');

                } catch (error) {
                    console.error('업로드 실패 : ', error);
                }
            }
        }
            });
        });
        return {editor, state, submit, hostName, hostNameServerUrl}
    },
};
</script>

<style scoped>
</style>