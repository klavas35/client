(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{f820:function(e,o,t){"use strict";t.r(o);var n=t("7a23");function a(e,o,t,a,c,i){return Object(n["t"])(),Object(n["h"])(n["a"],null,[Object(n["k"])("h2",null,Object(n["F"])(i.FBstatus),1),i.FBstatus?(Object(n["t"])(),Object(n["h"])("button",{key:1,onClick:o[2]||(o[2]=function(){return i.logOutFromFacebook&&i.logOutFromFacebook.apply(i,arguments)})},"LOGOUT FROM FACEBOOK")):(Object(n["t"])(),Object(n["h"])("button",{key:0,onClick:o[1]||(o[1]=function(){return i.loginWithFacebook&&i.loginWithFacebook.apply(i,arguments)})}," LOGIN WITH FACEBOOK "))],64)}var c=t("4360"),i={computed:{FBstatus:function(){return c["a"].getters["isFacebookLoggedIn"]}},methods:{loginWithFacebook:function(){FB.login((function(e){if(e.authResponse)return console.log("this is response : ".concat(JSON.stringify(e))),void FB.api("/me",{fields:"first_name, last_name, email"},(function(o){console.log("this is user ".concat(JSON.stringify(o)));var t={name:o.first_name,surname:o.last_name,email:o.email,facebookId:o.id,accessToken:e.authResponse.accessToken,type:"facebookRegister"};c["a"].dispatch("registerUser",t)}));console.log("login error")}),{scope:"public_profile,email",enable_profile_selecto:!0})},logOutFromFacebook:function(){c["a"].dispatch("logOutFromFacebook")}}};i.render=a;o["default"]=i}}]);
//# sourceMappingURL=about.18c2b458.js.map