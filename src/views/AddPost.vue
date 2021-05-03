<template>
  <base-card>
  <form @submit.prevent="">
      <div>
      <label for="postTitle">Title</label>
      <input type="text" name="postTitle" v-model="postTitle" placeholder="Title of the post">
      </div>
      <div>
          <label for="postMessage">Message</label>
          <textarea name="postMessage" cols="30" rows="10" placeholder="Enter post message"></textarea>
      </div>
  </form>
  </base-card>
</template>

<script>
export default {

}
</script>

<style>

</style>