<template>
  <base-card>
    <section>
      <form @submit.prevent="savePost">
        <p class="error" v-if="!postValidity">A post needs a title and a message check your post and retry if the issue continues try contacting us!</p>
        <div class="labels">
          <label for="postTitle">Title</label>
        </div>
        <div class="inputs">
          <input
            type="text"
            class="postArea"
            name="postTitle"
            v-model="postTitle"
            placeholder="Title of the post"
          />
        </div>
        <div class="labels">
          <label for="postMessage">Message</label>
        </div>
        <div class="inputs">
          <textarea
            class="postArea"
            v-model="postMessage"
            name="postMessage"
            cols=""
            rows="12"
            placeholder="Enter post message"
          ></textarea>
        </div>
        <div class="labels">
          <label for="submit"></label>
        </div>
        <div>
          <base-button>Submit</base-button>
        </div>
      </form>
    </section>
  </base-card>
</template>

<script>
export default {
  data() {
    return{
      postTitle:'',
      postMessage:'',
      postValidity:true
    }
  },
  methods: {
    async savePost() {
      if(this.postTitle !== '' || this.postMessage !== '') {
        this.postValidity= true
       const postContext = {
          title : this.postTitle,
          message:this.postMessage
        }
        await this.$store.dispatch('addPost', postContext)
        this.$router.push('/')
      }
      else {
        this.postValidity=false
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.labels {
  margin: 1.2%;
  padding: 1%;
  align-self: flex-start;
}
.inputs {
  margin: 1%;
  width: 90%;
  display: flex;
  justify-content: center;
}
.postArea{
  width: 90%;
}
.error{
  color: red;
}
section {
  margin-top: 15%;
  padding: 2%;
  background: #f0f0df;
  border: burlywood solid 1px;
}
</style>
