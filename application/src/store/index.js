import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
    currPage: 1,
    currPath: '/'
  },
  mutations: {
    setPage (state, page) {
      state.currPage = page
    },
    nextPage (state) {
      state.currPage++
    },
    prevPage (state) {
      if (state.currPage > 1) {
        state.currPage--
      } else {
        state.currPage = 1
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
