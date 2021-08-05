<template>
  <section>
    <base-login
      :title="'log in to this place'"
      :show="showDial"
      @close="showIt"
    ></base-login>
    <form id="form-register" @submit.prevent="">
      <h2>{{ getValidity }}</h2>
      <div class="form-control">
        <label for="username">User Name :</label>
        <input
          type="text"
          name="username"
          autocomplete="current-username"
          @keydown.space.prevent
          v-model="user.name"
        />
        <p class="userIsNotValid" v-if="!validUserName && !timedValid">
          username already exists please pick another username!
        </p>
        <p class="userIsValid" v-if="validUserName && timedValid">
          Username is useable!
        </p>
      </div>
      <div class="form-control">
        <label for="password">Password :</label>
        <input
          type="password"
          name="password"
          @keydown.space.prevent
          autocomplete="current-password"
          v-model.trim="user.password"
        />
        <password-helper
          @validationComplation="validate"
          :password="user.password"
        ></password-helper>
      </div>
      <div class="form-control">
        <label for="email">E-mail :</label>
        <input
          type="email"
          name="email"
          @keydown.space.prevent
          v-model.trim="user.email"
        />
      </div>
      <div class="form-control">
        <label for="age">Age :</label>
        <input type="number" name="age" v-model.trim.number="user.age" />
      </div>
      <div class="buttons">
        <base-button v-if="isVal && validUserName" @click="saveUser"
          >Register</base-button
        >
        <base-button v-else>Please Fill all spaces {{ isVal }}</base-button>
        <base-button @click="showIt" mode="flat">Login instead</base-button>
        <img
          class="googleLogin"
          src="https://icon-library.com/images/google-login-icon/google-login-icon-24.jpg"
          @click="saveUserWithGoogle"
          alt=""
        />
      </div>
    </form>
  </section>
</template>

<script>
import _ from "lodash";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseLogin from "../ui/BaseLogin.vue";
import PasswordHelper from "./PasswordHelper.vue";
// import bcryprjs from 'bcryptjs'
import store from "../../store";
export default {
  components: { BaseLogin, PasswordHelper },
  setup() {
    const router = useRouter();
    const store = useStore();
    const isVal = ref(false);
    const validUserName = ref(false);
    const timedValid = ref(true);
    const user = ref({
      name: "",
      password: "",
      email: "",
      age: 0
    });
    const showDial = ref(false);
    const saveUser = async () => {
      const userData = {
        name: user.value.name,
        password: user.value.password,
        email: user.value.email,
        age: user.value.age,
        type: "regulerRegister"
      };
      if (isVal.value && validUserName.value) {
        await store
          .dispatch("registerUser", userData)
          .then(() => {
            router.push("/");
          })
          .catch(() => {
            // router.push("/");
          });
      }
    };
    
    const showIt = () => {
      showDial.value = !showDial.value;
    };
    const validate = () => {
      isVal.value = true;
    };
    const getValidity = computed(() => {
      const isUserNameValid = store.getters["validUser"];
      return isUserNameValid;
    });
    watch(
      user.value,
      _.debounce(async function(curVal) {
        timedValid.value = false;
        await store.dispatch("doesUserExists", curVal.name);
      }, 2500)
    );
    watch(getValidity, curVal => {
      if (curVal) {
        return;
      } else {
        timedValid.value = true;
        validUserName.value = true;
      }
    });

    return {
      user,
      saveUser,
      showDial,
      showIt,
      validate,
      isVal,
      validUserName,
      timedValid,
      getValidity,
    };
  },
  methods:{
     async saveUserWithGoogle() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }

        const user = {
          everything : googleUser.getBasicProfile(),
          name: googleUser.getBasicProfile().ET,
          surname: googleUser.getBasicProfile().GR,
          gId: googleUser.getBasicProfile().$R,
          email: googleUser.getBasicProfile().zt,
          idToken: googleUser.getAuthResponse().id_token,
          type: "googleRegister"
        };
        store.dispatch("registerUser", user);
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    }
  }
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
  align-content: center;
  justify-content: center;
  margin-left: 1%;
}
.userIsNotValid {
  color: red;
}
.userIsValid {
  color: green;
}
.googleLogin {
  height: 35px;
  margin: 3%;
  cursor: pointer;
}
</style>
