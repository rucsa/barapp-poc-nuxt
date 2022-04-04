import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  key: 'tcDataStorage',
  storage: window.localStorage,
  reducer: state => ({ global: state.global })
})

export const state = () => ({
  darkTheme: true,
  ticketValue: null,
  sessionId: null,
  sessionName: null
})

export const mutations = {
  changeTheme (state) {
    state.darkTheme = !state.darkTheme
  },
  setTicketValue (state, value) {
    state.ticketValue = value
  },
  setSessionId (state, value) {
    state.sessionId = value
  },
  setSessionName (state, value) {
    state.sessionName = value
  }
}

export const actions = {
  fetchTicketValue ({ commit }) {
    this.$axios
      .get('/ticket-value')
      .then(response => response.data)
      .then((response) => {
        commit('setTicketValue', response.clovers)
      })
  },
  fetchSessionData ({ commit }) {
    this.$axios
      .get('/session/get-active')
      .then(response => response.data)
      .then((response) => {
        console.log(response.session)
        commit('setTicketValue', response.session.currentTicketValue)
        commit('setSessionId', response.session._id)
        commit('setSessionName', response.session.name)
      })
  }
}

export const getters = {
  isDarkTheme: (state) => {
    return state.darkTheme
  },
  getTicketValue: (state) => {
    return state.ticketValue
  },
  getSessionId: (state) => {
    return state.sessionId
  },
  getSessionName: (state) => {
    return state.sessionName
  }
}

export const plugins = [vuexLocal.plugin]
