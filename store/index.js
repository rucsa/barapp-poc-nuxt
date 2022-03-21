import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  key: 'tcDataStorage',
  storage: window.localStorage,
  reducer: state => ({ global: state.global })
})

export const state = () => ({
  darkTheme: true
})

export const mutations = {
  changeTheme (state) {
    state.darkTheme = !state.darkTheme
  }
}

export const getters = {
  isDarkTheme: (state) => {
    return state.darkTheme
  }
}

export const plugins = [vuexLocal.plugin]
