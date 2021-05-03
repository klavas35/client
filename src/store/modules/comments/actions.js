import axios from 'axios'
import router from '../../../router/index.js'
const url = process.env.VUE_APP_SERVER_URL + '/comment'
export default {
    async clearCrumbs(context) {
        context.commit('clearCache')
    },
    async getComments(context, payload) {
        if (payload) {
            localStorage.setItem('postId', payload)
            await axios({
                url: url + '/getcomments',
                method: 'POST',
                data: {
                    postId: payload
                }
            }).then((response) => {
                if (response.data !== 'body_error' || response.data !== 'error') {
                    
                    context.commit('getComments', response.data)
                } else {
                    const error = new Error(response.data || 'something went wrong')
                    console.log(error);
                    throw error
                }
            }).catch((err) => {
                console.log(err);
            })
        } else if (localStorage.getItem('postId')) {
            const postId = localStorage.getItem('postId')
            await axios({
                url: url + '/getcomments',
                method: 'POST',
                data: {
                    postId: postId
                }
            }).then((response) => {
                if (response.data !== 'body_error') {
                    context.commit('getComments', response.data)
                } else {
                    console.log('error handling');
                    const error = new Error(response || 'something went wrong')
                    throw error
                }
            }).catch((err) => {
                console.log(JSON.stringify(err));
            })
        } else {
            router.push('/')
        }
    },
    async saveComment(context, payload) {
        await axios({
            url: url + '/',
            method: 'POST',
            data: {
                Comment: payload,
                postId: localStorage.getItem('postId')
            },
            withCredentials: true
        })
    },
    commentUpdate(context, payload) {
        context.commit('updateComment', payload)
    },
    setPost(context, payload) {
        context.commit('setPost', payload)
    }
}