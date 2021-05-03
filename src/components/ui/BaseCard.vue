<template>
  <div class="card" :class="form">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props:{
    form: {
      type:String,
      reqired:false,
      default:null
    }
  }
}
</script>
<style scoped>

.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0 auto;
  max-width: 40rem;
}
.homeForm{
  max-width: 85%;
  margin-top: 5%;
}
</style>