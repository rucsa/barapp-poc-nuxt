<template>
  <v-container fluid>
    <div v-if="scanSuccessful === false">
      <Scanner @onscan="onDecode" />
    </div>
    <v-card v-if="userStatus && scanSuccessful === true">
      <v-card-title class="d-flex justify-center">
        <h4>Scan successfull!</h4>
        <h5>Redirecting...</h5>
      </v-card-title>
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      userStatus: null,
      scanSuccessful: false
    }
  },
  methods: {
    onDecode (val) {
      console.log('Received val')
      console.log(val)
      this.scanSuccessful = true
      this.userStatus = val
      this.$router.push(`/profile/${val.userId}`)
    }
  }
}
</script>
