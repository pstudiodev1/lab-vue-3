import { createStore } from "vuex";
import axios from "axios";
import { BASE_API_URL } from "../constants";

export default createStore({
  state: {
    profile: null,
  },
  mutations: {
    SET_USER_PROFILE(state, newProfile) {
      state.profile = newProfile;
    },
  },
  actions: {
    async getProfile({ commit }) {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(`${BASE_API_URL}/api/profile`, {
        headers: { Authorization: "Bearer " + token.access_token },
      });
      commit(
        "SET_USER_PROFILE",
        JSON.parse(JSON.stringify(response.data?.data?.user))
      );
    },
  },
  modules: {},
});
