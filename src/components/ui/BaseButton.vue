<template>
  <button v-if="navBar" class="navigate">
    <slot></slot>
  </button>
  <button v-else-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else-if="!navBar" :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
    navBar: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.3rem 1rem;
  font: inherit;
  background-color: #b07d62;
  border: 1px solid #b07d62;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:not(.homePage):hover,
a:active,
button:hover,
button:active {
  background-color: #7f5539;
  border-color: #7f5539;
}
#commentLink {
  background-color: transparent;
  color: red;
}
#commentLink:hover {
  background-color: red;
}
.flat {
  background-color: transparent;
  color: red;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #b07d62;
  color: #b07d62;
}

.flat:hover,
.flat:active {
  text-decoration: yellowgreen;
  background-color: red;
  color: white;
}

.outline:hover,
.outline:active {
  background-color: #b07d62;
  color: white;
  border-color: #b07d62;
}
.navigate {
  text-decoration: none;
  /* margin: 2.35% 0 0 0; */
  padding: 3%, 5%;

  display: flex;
  justify-self: flex-end;
}
</style>
