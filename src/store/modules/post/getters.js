export default {
    getThis(state) {
        return state.posts
    },
    getPost(state) {
        return state.currentPost
    },
    getPreview(state) {
        return state.previewPosts
    }
}