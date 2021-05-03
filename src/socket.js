import {
    io
} from "socket.io-client";
import store from './store/index.js'
// const URL = "https://vue-serve-test.herokuapp.com";
const URL = "http://localhost:3000";
// const socket = io(URL, 
//     {
//         autoConnect: true,
//     });
var socket = io(URL, {
    transports: ['websocket', 'polling', 'flashsocket']
});
socket.on('updateHome', () => {
    console.log('@socket');
    store.dispatch('getPosts')
})
socket.on('updatePost', (data) => {
    if (data.postId === localStorage.getItem('postId')) {
        store.dispatch('commentUpdate', data)
    }
})
socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;