<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialogTransitation">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot>
            <form @submit.prevent="">
              <div class="contain-input">
                <div>
                  <p v-if="errorHandle">
                    username and password cannot be empty
                  </p>
                  <label for="username">Username:</label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="username"
                    autocomplete="username"
                    v-model.trim="user.name"
                    class="inputText"
                  />
                </div>
                <div>
                  <label for="password">Password:</label>
                  <input
                    type="password"
                    autocomplete="current-password"
                    name="password"
                    placeholder="password"
                    v-model.trim="user.password"
                    class="inputText"
                  />
                </div>
              </div>
              <div class="contain">
                <base-button @click="login" class="log-Button"
                  >Login</base-button
                >
              </div>
            </form>
          </slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button @click="tryClose">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();
    const user = ref({
      name: "",
      password: "",
    });
    const errorHandle = ref(false);
    const login = async () => {
      if (user.value.name !== "" && user.value.password !== "") {
        errorHandle.value = false;
        await store
          .dispatch("login", {
            userName: user.value.name,
            password: user.value.password,
          })
          .then(() => {
            emit("close");
            router
          })
          .catch(() => {
            // router.push("/");
          });
      } else {
        errorHandle.value = true;
        return;
      }
    };
    return {
      user,
      login,
      errorHandle,
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: #ddb892;
}
p {
  color: red;
  padding: 0;
  margin: 0;
}
header {
  background-color: #7f5539;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 0.3rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
.dialogTransitation-enter-from,
.dialogTransitation-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
.dialogTransitation-enter-to,
.dialogTransitation-leave-from {
  opacity: 1;
  transform: scale(1);
}
.dialogTransitation-enter-active {
  transition: all 0.3s ease-out;
}
.dialogTransitation-leave-active {
  transition: all 0.3s ease-in;
}
form {
  display: flex;
  flex-flow: row;
}
.contain-input {
  display: flex;
  flex-flow: column;
  width: 75%;
}
.contain-input div,
.contain-input div label,
.contain-input div input {
  font-size: 18px;
  margin: 0.3rem 0.6rem;
  height: 50%;
  width: 90%;
  align-self: center;
}
.contain {
  margin-top: 30px;
  align-self: center;
}
.log-Button {
  padding: 1.55rem 2.5rem;
}
.inputText {
  background-color: #ede0d4;
}
@media (max-width: 540px) {
  .log-Button {
    padding: 0.5rem 1rem;
  }
}
</style>
