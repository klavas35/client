<template>
  <section>
    <base-login
      :title="'log in to this place'"
      :show="showDial"
      @close="showIt"
    ></base-login>
    <form id="form-register" @submit.prevent="">
      <div class="form-control">
        <label for="username">User Name :</label>
        <input type="text" name="username" autocomplete="current-username" @keydown.space.prevent v-model="user.name" />
      </div>
      <div class="form-control">
        <label for="password">Password :</label>
        <input type="password" name="password" @keydown.space.prevent autocomplete="current-password" v-model.trim="user.password" />
        <password-helper :password="user.password"></password-helper>
      </div>
      <div class="form-control">
        <label for="email">E-mail :</label>
        <input type="email" name="email" @keydown.space.prevent v-model.trim="user.email" />
      </div>
      <div class="form-control">
        <label for="age">Age :</label>
        <input type="number" name="age" v-model.trim.number="user.age" />
      </div>
      <div class="buttons">
        <base-button v-if="isVal" @click="saveUser">Register</base-button>
        <p>Please Fill all spaces</p>
        <base-button @click="showIt" mode="flat">Login instead</base-button>
      </div>
    </form>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseLogin from "../ui/BaseLogin.vue";
import PasswordHelper from "./PasswordHelper.vue";
// import bcryprjs from 'bcryptjs'

export default {
  components: { BaseLogin, PasswordHelper },
  setup() {
    const router = useRouter();
    const store = useStore();
    let isVal = false;
    const user = ref({
      name: "",
      password: "",
      email: "",
      age: 0,
    });
    const showDial = ref(false);
    const saveUser = async () => {
      PasswordHelper(user.value.password);
      const userData = {
        name: user.value.name,
        password: user.value.password,
        email: user.value.email,
        age: user.value.age,
      };
      await store
        .dispatch("registerUser", userData)
        .then(() => {
          router.push("/");
        })
        .catch(() => {
          // console.log(`THIS IS ERROR ${error}`);
          // router.push("/");
        });
    };
    const showIt = () => {
      console.log("AAAAAAAAAAAAAAAA");
      showDial.value = !showDial.value;
    };
    const isValid = computed(() => {
      const isValid = store.getters["isValid"];
      if (
        isValid.length &&
        isValid.hasUpper &&
        isValid.hasLow &&
        isValid.hasSpecial &&
        isValid.hasNum
      ) {
        isVal = true;
      }
      return isValid;
    });
    return {
      user,
      saveUser,
      showDial,
      showIt,
      isValid,
      isVal,
    };
  },
};
</script>

<style scoped>
.form-control {
  margin: 3rem 0;
}
#form-register {
  height: 100%;
  margin: 1rem auto;
  width: auto;
  background: #ddb892;
  padding: 30px;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  margin-bottom: auto;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.buttons {
  display: flex;
}
</style>
