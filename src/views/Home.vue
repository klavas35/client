<template>
  <base-card :form="'homeForm'">
    <section class="container" v-if="getThis !== null">
      <transition-group tag="postMagick" name="posts">
        <div class="posts" v-for="post in getPreview" :key="post._id">
          <div class="user">--{{ post.author.name }} + {{ post.date }}</div>
          <div class="title">
            <router-link
              :to="{ name: 'comment', params: { postId: post._id } }"
            >
              {{ post.body.titleMethod() }}
            </router-link>
          </div>
          <div class="text">
            <div class="message">{{ post.body.messageMethod() }}</div>
          </div>
        </div>
      </transition-group>
    </section>
  </base-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import socket from "../socket";
export default {
  computed: {
    getThis() {
      const getThis = this.$store.getters["getThis"];
      return getThis;
    },
    getPreview() {
      return this.$store.getters["getPreview"];
    },
    listing() {
      if (this.getPreview != undefined) {
        let localListing = JSON.parse(JSON.stringify(this.getPreview));
        return localListing.sort();
      }
      else return 2
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  background-color: beige;
  flex-direction: column;
}
.posts {
  display: flex;
  flex-direction: column;
  margin: 0.3%;
  padding: 2%;
  border: burlywood solid 1px;
}
.title {
  color: blue;
}
.message {
  color: brown;
}
.body {
  display: flex;
  justify-content: space-between;
}
.user {
  position: relative;
  align-self: flex-end;
}
.posts-enter-to,
.posts-leave-from {
  opacity: 1;
}
.posts-enter-from,
.posts-leave-to {
  opacity: 0.3;
}
.posts-enter-active,
.posts-leave-active {
  transition: 0.2s ease-in;
}
</style>
