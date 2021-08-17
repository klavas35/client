/* eslint-disable */
import event from 'events'
import store from '../store';
const newEvent = new event()
window.fbAsyncInit = function() {
    FB.init({
        appId: process.env.VUE_APP_FACEBOOK_APP_ID,
        cookies:true,
        autoLogAppEvents:true,
        xfbml: true,
        version:'v11.0'
    });
    newEvent.emit('fbLoad');
}
newEvent.on('fbLoad', function(){
    FB.getLoginStatus((response) => {
        if(response.status === 'connected') {
            FB.api('/me', (user) => {
                store.dispatch('facebookUserLoggedIn', user)
            } )
        }
    })
})