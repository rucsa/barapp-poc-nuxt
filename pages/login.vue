<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-form ref="form" class="mx-2" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="username" label="username" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                label="password"
                :rules="[rules.required]"
                :type="showpass ? 'text' : 'password'"
                :append-icon="
                  showpass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                @click:append="showpass = !showpass"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <div @click="forgotPassword">
        <p class="pl-4 text-caption grey--text">
          Forgot password?
        </p>
      </div>
      <v-card-actions class="d-flex justify-end">
        <span class="subtitle-2" style="color: red">{{ loginError }}</span>
        <v-spacer />
        <v-btn icon color="secondary" @click="login">
          <v-icon>mdi-location-enter</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'member',
  auth: false,
  data () {
    return {
      username: null,
      password: null,
      showpass: false,
      loginError: null,
      rules: {
        required: (value) => {
          return !!value || 'Required!'
        }
      }
    }
  },
  methods: {
    forgotPassword () {
      this.$router.push('/forgotPassword')
    },
    login () {
      if (this.$refs.form.validate()) {
        this.$auth
          .loginWith('local', {
            data: {
              username: this.username,
              password: this.password
            }
          })
          .then((res) => {
            this.$notify({ group: 'success', text: 'You are in!' })
            this.$log.info('Sucessfully logged in')
            if (this.$auth.state.user.accessLevel === 'MEMBER') {
              this.$router.push(`/welcome/${this.$auth.state.user._id}`)
            } else {
              this.$router.push('/')
            }
          })
          .catch((ex) => {
            this.loading = false
            this.$log.error('%cCould not login ', 'color: #f00')
            this.$log.debug(`${ex.response.status} status code`)
            if (ex.response.status === 401) {
              this.loginError = 'Invalid account!'
            } else if (ex.response.status === 500) {
              this.loginError = 'Server error!'
            } else if (ex.response.status === 400) {
              this.loginError = 'Invalid credentials!'
            } else {
              this.loginError = 'Unknown error!'
            }
          })
      }
    }
  }
}

</script>
