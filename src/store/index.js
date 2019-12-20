import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'

const syncStateCart = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem('cartList', JSON.stringify(state.cartList))
  })
}

const syncStateUser = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem('user', JSON.stringify(state.user))
  })
}

const syncStateData = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem('data', JSON.stringify(state.data))
  })
}

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters,
  plugins: [syncStateCart, syncStateUser, syncStateData]
})
