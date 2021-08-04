import axios from "axios";
import store from "../..";
import jwt from "jsonwebtoken";
const localUrl = process.env.VUE_APP_SERVER_URL + "/users";
export default {
  async registerUser(context, payload) {
    if (payload.type === "regularRegister") {
      const user = {
        userName: payload.name,
        userAge: payload.age,
        email: payload.email,
        password: payload.password,
        type: payload.type
      };
      JWTSign(user, 'register');
      return;
    }
    if (payload.type === "googleRegister") {
      const googleUser = {
        name: payload.name,
        surname: payload.surname,
        email: payload.email,
        googleId: payload.gId,
        idToken: payload.idToken,
        type: payload.type
      };
      JWTSign(googleUser, 'register');
      return;
    }
  },
  async isLogged(context) {
    await axios({
      url: localUrl + "/checkauth",
      method: "POST",
      withCredentials: true
    }).then(response => {
      if (response.data !== "error") {
        context.commit("autoLog", true);
      } else {
        context.commit("autoLog", false);
      }
    });
  },
  async logOut() {
    axios({
      url: localUrl + "/logOut",
      method: "POST",
      withCredentials: true
    }).then(data => {
      if (data !== "error") {
        store.dispatch("isLogged");
      }
    });
  },
  async login(context, payload) {
    await JWTSign(payload, 'login');
  },
  passworValidation(context, payload) {
    context.commit("validator", payload);
  },
  doesUserExists(context, payload) {
    axios({
      url: localUrl + "/doesUserExists",
      method: "POST",
      data: {
        userName: payload
      },
      withCredentials: true
    })
      .then(response => {
        context.commit("userValidity", response.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
};


async function JWTSign(user, type) {
  
  jwt.sign(
    { user: user },
    process.env.VUE_APP_JWT_SECRET,
    async (err, token) => {
      if (err) {
        console.log(err);
        return
      } if(type === 'register') {
        await registerFunction(token);
        return
      } if (type === 'login') {
        await login(token)
      }
    }
  );
}

async function registerFunction(token) {
  const response = await axios({
    url: localUrl + "/register",
    method: "POST",
    data: {
      token: token
    },
    withCredentials: true
  });
  const responseData = await JSON.stringify(response.data);
  store.dispatch("isLogged");
  if (response.data === "error") {
    const error = new Error(responseData || "something is wrong");
    console.log(error);
    throw error;
  }
}
async function login(token) {
  await axios({
    url: localUrl + "/login",
    method: "POST",
    data: {
      token:token
    },
    withCredentials: true
  })
    .then(async (response) => {
      await store.dispatch("isLogged");
      if (response.data === "error") {
        const error = new Error(
          JSON.stringify(response.data) || "something is wrong"
        );
        console.log(error);
        throw error;
      }
    })
    .catch(error => console.log(error));
}
