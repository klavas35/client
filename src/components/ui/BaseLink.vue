<template>
  <router-link :to="to" class="link">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
props: {
    to: {
      type: String,
      required: false,
      default: "/",
    },
}
}
</script>

<style scoped>
.link {
    text-decoration: none;
}
.link:hover {
    text-decoration: underline red;
}
</style>