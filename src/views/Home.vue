<template>
  <base-card :form="'homeForm'">
    <section class="container" v-if="getThis !== null">
      <div class="posts" v-for="post in getPreview" :key="post">
          <div class="user"> --{{ post.author.name }}</div>
        <div class="title">
          <router-link :to="{name: 'comment', params: {postId:post._id}} " >
            {{ post.body.titleMethod() }}
          </router-link>
        </div>
          <div class="text">
          <div class="message">{{ post.body.messageMethod() }}</div>
        </div>
      </div>
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
      return this.$store.getters['getPreview']
    }
  },
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

</style>
