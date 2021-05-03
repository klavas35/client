<template>
  <base-card>
  <keep-alive>
    <registration-item></registration-item>
  </keep-alive>
  </base-card>
</template>

<script>
import RegistrationItem from "../components/registration/RegistrationItem.vue";
export default {
  components: {
    RegistrationItem,
  },
};
</script>

<style></style>
