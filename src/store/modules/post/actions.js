import axios from "axios";
import store from '../..'
const url = process.env.VUE_APP_SERVER_URL + "/post";
export default {
  async getPosts(context) {
    await axios({
      url: url + "/getposts",
      method: "GET",
      withCredentials: true
    })
      .then(response => {
        context.commit("post", response.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  async getpost(context, payload) {
    if (payload) {
      localStorage.setItem("postId", payload);
      await axios({
        url: url + "/getpost",
        method: "POST",
        data: {
          postId: payload
        },
        withCredentials: true
      })
        .then(response => {
          context.commit("currentPost", response.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (localStorage.getItem("postId")) {
      await axios({
        url: url + "/getpost",
        method: "POST",
        data: {
          postId: localStorage.getItem("postId")
        }
      })
        .then(response => {
          context.commit("currentPost", response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  clearPost(context) {
    context.commit("clearCache");
  },
  async addPost(context, payload) {
    console.log(payload.message);
    axios({
      url: url + "/",
      method: "POST",
      data: {
        title: payload.title,
        message: payload.message,
        testStatus: true
      },
      withCredentials: true
    }).then(response => {
      console.log(response);
    });
  },
  homePageUpdate(context, payload) {
    if(payload !== 'regular update') {
      context.commit('updateHomePage', payload)
    }
    else {
      store.dispatch('getPosts')
    }
  }
};
