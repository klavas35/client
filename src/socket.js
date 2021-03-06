import { io } from "socket.io-client";
import store from "./store/index.js";
const URL = process.env.VUE_APP_SERVER_URL;
// const socket = io(URL,
//     {
//         autoConnect: true,
//     });
var socket = io(URL, {
  transports: ["websocket", "polling", "flashsocket"]
});
socket.on("updateHome", () => {
  store.dispatch("getPosts");
});
socket.on("updatePost", data => {
  if (data.postId === localStorage.getItem("postId")) {
    store.dispatch("commentUpdate", data);
  }
});
socket.on('facebookLogOut', () => {
  store.dispatch('logOutFromFacebook')
})
socket.on("updateHome", data => {
  store.dispatch("homePageUpdate", data);
});

export default socket;
