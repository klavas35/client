<template>
  <the-header></the-header>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
  setup() {},
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      this.$store.dispatch("isLogged");
      this.$store.dispatch("getPosts");
    },
  },
};
</script>

<style>
body {
  margin: 0;
  margin-bottom: 3%;
  background: #e6ccb2;
}
</style>
