import axios from 'axios'
const url = process.env.VUE_APP_SERVER_URL + '/post'
export default {
    async getPosts(context) {
        await axios({
            url: url + '/getposts',
            method: 'GET',
        }).then((response) => {
            context.commit('post', response.data)
        }).catch((err) => {
            console.log(err);
        })
    },
    async getpost(context, payload) {
        if (payload) {
            localStorage.setItem('postId', payload)
            await axios({
                url: url + '/getpost',
                method: 'POST',
                data: {
                    postId: payload
                }
            }).then((response) => {
                context.commit('currentPost', response.data)
            }).catch((err) => {
                console.log(err);
            })
        } else if (localStorage.getItem('postId')) {
            await axios({
                url: url + '/getpost',
                method: 'POST',
                data: {
                    postId: localStorage.getItem('postId')
                }
            }).then((response) => {
                context.commit('currentPost', response.data)
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    clearPost(context) {
        context.commit('clearCache')
    }

}