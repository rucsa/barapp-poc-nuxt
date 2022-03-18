
export default ({ app, $axios }, inject) => {
  inject('call', {
    login: () => {
      return $axios.get('/public/geo/counties')
    }
  })
}
