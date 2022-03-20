<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-col
              label="email"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-col
              label="password"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <div @click="forgotPassword">
        <p class="pl-4 text-caption grey--text">
          Forgot password?
        </p>
      </div>
      <v-card-actions class="d-flex justify-end">
        <v-btn icon color="secondary" @click="login">
          <v-icon>mdi-location-enter</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  methods: {
    forgotPassword () {
      this.$router.push('/forgotPassword')
    },
    login () {
      // todo
      this.$router.push('/')
    }
  }
}
</script>
