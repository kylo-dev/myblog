<template>
    <div class="container">
        <form class="m-4">
            <div class="form-group">
                <label for="title">Title</label>
                <input class="form-control" id="title" placeholder="Enter Title" type="text">
            </div>

            <div class="form-group">
                <label for="content">Content</label>
                <textarea class="form-control" rows="5" id="content"></textarea>
            </div>
        </form>
        <button class="btn btn-primary mx-4 mb-2" id="btn-board-save" type="submit">글쓰기 완료</button>
    </div>
</template>
  
<script>

export default {
  name: 'Write',

};
</script>

<style scoped>
</style>