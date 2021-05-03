export default {
    getComments(state, payload) {
      const postId = localStorage.getItem('postId')
      const postComments = []
      for (const comment of payload) {
          const comments = {
              body: {
                  username: comment.userName,
                  comment: comment.comment,
                  commentId: comment._id
              },
              postId: postId
          }
          postComments.push(comments)
      }
      state.comments = postComments
    },
    updateComment(state, payload) {
        
        const comment = {
            body: {
                username: payload.body.username,
                comment: payload.body.message,
                commentId: payload.body._id
            },
            postId: payload.postId
        }
        state.comments.push(comment)
    },
    setPost(state, payload) {
        state.currentPostId = payload
    }
}