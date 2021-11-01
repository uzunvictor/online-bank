import axios from 'axios'

export default {
  namespaced: true, // action's names will be locally and dont't globaly
  state () {
    return {
      token: localStorage.getItem("jwt-token"),
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('jwt-token', token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem("jwt-token")

    }
  },
  actions: {
    async login( payload){
      //commit('setToken', 'TEST-TOKEN')
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`;
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true });
        console.log(payload, process.env.VUE_APP_FB_KEY);
        console.log('data',data);
      } catch (e) {
        console.dir(e.response.data.error.message)
        throw new Error ()
      }
      
    } 
  },
  getters: {
    token (state) {
      return state.token
    },
    isAuthenticated (_, getters) {
      return !!getters.token // return boolean value
    }
  },
}