<template>
  <section class="contain">
    <base-spinner v-show="isLoading || !doneLoading"></base-spinner>
    <div class="checkIfLoaded" v-show="!isLoading">
      <base-post @doneLoading="postLoaded"></base-post>
      <div class="body" v-if="!isLoading">
        <transition-group tag="ui" name="comment">
          <div v-for="com in comments" :key="com">
            <div class="commentor" v-show="com.commentorName !== null">
              <h3>
                {{ com.body.username }}
              </h3>
              <div class="comment" v-show="com.commentText !== null">
                <p>
                  {{ com.body.comment }}
                </p>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="commentAdd" v-if="isLogged">
          <form class="addComment" @submit.prevent="saveComment">
            <label for="commentAdd">Comment!</label>
            <div class="addCommentBody">
              <textarea
                v-model="commentToBe"
                class="commentBox"
                name="commentAdd"
                id="commentAdd"
                cols=""
                rows="4"
                placeholder="Your comment..."
              ></textarea>
              <base-button class="log-Button">submit</base-button>
            </div>
          </form>
        </div>
        <base-button class="commentLogin" @click="startLogin" v-else
          >Log in to Comment</base-button
        >
        <base-login :show="clickedLogin" @close="startLogin"></base-login>
      </div>
    </div>
  </section>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import socket from "../socket";
export default {
  props: ["postId"],
  data() {
    return {
      clickedLogin: false,
      isLoading: true,
      commentToBe: "",
      doneLoading: false
    };
  },
  async activated() {
    await this.$store.dispatch("setPost", this.postId);
    await this.getComments();
  },
  async deactivated() {
    // await this.$store.dispatch("clearCrumbs");
    this.isLoading = true;
    this.doneLoading = false;
    // await this.$store.dispatch("clearPost");
  },
  methods: {
    postLoaded() {
      console.log("@postLoaded");
      this.doneLoading = true;
    },
    startLogin() {
      this.clickedLogin = !this.clickedLogin;
    },
    async saveComment() {
      if (this.commentToBe !== "") {
        await this.$store.dispatch("saveComment", this.commentToBe);
        this.commentToBe = "";
      }
    }
  },
  computed: {
    comments() {
      return this.$store.getters["getComments"];
    },
    isLogged() {
      return this.$store.getters["getAuth"];
    }
  },
  watch: {
    doneLoading: async function() {
      if (this.doneLoading) {
        await this.$store.dispatch("getComments", this.postId).then(() => {
          console.log("@isLoading change");
          this.isLoading = false;
        });
      }
    }
  }
};
</script>
<style scoped>
.contain {
  width: 90%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
}
.body {
  display: flex;
  flex-direction: column;
  width: 98%;
  align-self: center;
  margin: 0.4%;
}
.commentor {
  width: 100%;
  margin: 0.04%;
  background-color: #f0f0df;
  border: burlywood solid 1px;
}
.comment {
  margin: 1% 0% 0% 1.5%;
  background-color: #f0ffdf;
}
.comment p {
  font-size: 19px;
}
.commentor h3 {
  margin-left: 1%;
}
.commentAdd {
  width: 99%;
  align-self: center;
  margin: 0.04%;
  background-color: #f0f0df;
  border: burlywood solid 1px;
}
.addComment {
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  margin-left: 1%;
}
.addCommentBody {
  display: flex;
  margin-left: 2%;
}
.commentBox {
  width: 90%;
  border-radius: 2%;
}
.addCommentBody button {
  padding: 0%;
}
.log-Button {
  margin: 1%;
  padding: 1.5rem 2.5rem;
}
.commentLogin {
  margin-top: 1%;
  width: 50%;
  align-self: center;
}
.comment-enter-to,
.comment-leave-from {
  opacity: 1;
}
.comment-enter-from,
.comment-leave-to {
  transform: scale(0.7) translateX(-340);
  opacity: 0.3;
}
.comment-enter-active,
.comment-leave-active {
  transition: 0.2s ease-in;
}
</style>
