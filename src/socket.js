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
socket.on("updateHome", data => {
  store.dispatch("homePageUpdate", data);
});
socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
