<template>
  <section v-if="!isLoading" class="container">
    <div class="posts" v-for="posts in post" :key="posts">
      <div class="user">--{{ posts.author.name }}</div>
      <div class="title">
        <h3>
          {{ posts.body.title }}
        </h3>
      </div>
      <div class="message">
        <p>
          {{ posts.body.message }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  emits: ["doneLoading"],
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    post() {
      return this.$store.getters["getPost"];
    },
    postId() {
      const post = this.$store.getters["getCurrentPostId"];
      return post;
    }
  },
  methods: {
    async getPost() {
      await this.$store.dispatch("getpost", this.postId).then(() => {
        this.isLoading = false;
        console.log('@getPost method.then');
        this.$emit("doneLoading");
      });
    }
  },
  async activated() {
    await this.getPost();
  }
};
</script>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  background-color: #f5f5dc;
  border-radius: 5%;
}
.user {
  justify-self: end;
  align-self: flex-end;
  margin: 2%;
}
.title {
  margin: 0 1%;
  color: #af2fff;
}
.message {
  margin: 1.5%;
}
p {
  font-weight: 700;
  line-height: 1.5;
}
</style>
