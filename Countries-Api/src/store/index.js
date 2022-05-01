import { createStore } from 'vuex'

export default createStore({
  state: {
    countries: [],
  },

  mutations: {
    setCountries(state, countries) {
      state.countries = countries
    },
  },
  actions: {
    fetchAllCountries(context) {
      return fetch('https://restcountries.com/v3.1/region/europe')
        .then((response) => response.json())
        .then((data) => {
          context.commit('setCountries', data)
        })
    },
  },
  getters: {
    countries(state) {
      return state.countries
    },
  },
})
