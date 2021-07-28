import axios from "axios";
import store from "../..";
const localUrl = process.env.VUE_APP_SERVER_URL + "/users";
export default {
  async registerUser(context, payload) {
    const user = {
      userName: payload.name,
      userAge: payload.age,
      email: payload.email,
      password: payload.password,
      type: "testee"
    };
    const response = await axios({
      url: localUrl + "/register",
      method: "POST",
      data: user,
      withCredentials: true
    });
    const responseData = await JSON.stringify(response.data);
    store.dispatch("isLogged");
    if (response.data === "error") {
      const error = new Error(responseData || "something is wrong");
      console.log(error);
      throw error;
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
    await axios({
      url: localUrl + "/login",
      method: "POST",
      data: {
        userName: payload.userName,
        password: payload.password,
        type: "test"
      },
      withCredentials: true
    })
      .then(async response => {
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
  async jwtToken(context, payload) {
    axios({
      url: localUrl + "/jwtsign",
      method: "POST",
      data: {
        payload
      },
      withCredentials: true
    }).then(response => {
      if (response.data === "success") {
        context.commit("changeGoogleValidity", true);
      } else {
        context.commit("changeGoogleValidity", false);
      }
    });
  }
};
