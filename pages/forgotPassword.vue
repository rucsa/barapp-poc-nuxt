<template>
  <v-container fluid class="d-flex flex-column align-center">
    <v-card max-width="600" min-width="300">
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                prepend-inner-icon="mdi-email-outline"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <!-- <v-btn icon color="secondary" @click="requestPasswordChange">
          <v-icon>mdi-bird</v-icon>
        </v-btn> -->
        <v-btn plain :ripple="false" @click="requestPasswordChange">
          <p class="pl-4 text-caption grey--text">
            Reset my password
            <span><v-icon color="secondary"> mdi-bird </v-icon></span>
          </p>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-if="requestCode != null" class="ma-3" max-width="600" min-width="300">
      <v-card-text class="d-flex flex-column align-center">
        <v-row>
          <v-col cols="12">
            <p>Your request to change your password was registered! With this code</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="text-h4">
              {{ requestCode }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p>Go to any TC member and they will change it for you!</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import midlayout from '@/middleware/layout.js'

export default {
  layout: midlayout,
  auth: false,
  data () {
    return {
      requestCode: null,
      email: null,
      emailRules: [
        v =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    async requestPasswordChange () {
      if (!this.$refs.form.validate()) {
        return
      }
      this.$log.info('Change pwd functionatity todo')
      const changeRequest = await this.$axios
        .post('/user/request-change', { email: this.email })
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          this.$log.error(error)
        })
      this.requestCode = changeRequest
      this.email = null
    }
  }
}
</script>
