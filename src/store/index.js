import {
  createStore
} from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
import testModule from "./modules/testModule/index.js";
import post from "./modules/post/index.js"
import comment from "./modules/comments/index.js"
const store = createStore({
  state: {
  },
  mutations,
  actions,
  getters,
  modules: {
    testMode: testModule,
    postMode: post,
    commentMode: comment
  }
});
export default store;