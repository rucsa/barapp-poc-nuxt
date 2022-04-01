<template>
  <v-container fluid class="d-flex justify-center">
    <v-card outlined max-width="600">
      <v-card-title class="d-flex justify-center mt-5">
        Register
      </v-card-title>
      <v-card-text class="px-5 mt-5">
        <v-form ref="form" class="mx-2" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="newCatcher.firstname" :rules="nameRules" label="First Name" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newCatcher.lastname" :rules="nameRules" label="Last Name" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newCatcher.guestOf" :rules="guestNameRules" label="Guest Of" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newCatcher.email" :rules="emailRules" label="Email" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newCatcher.phone" :rules="phoneRules" label="Phone Number" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newCatcher.username" :rules="usernameRules" label="Username" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="confirmPassword"
                label="Password"
                :type="showPassCode ? 'text' : 'password'"
                :append-icon="
                  showPassCode ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                @click:append="showPassCode = !showPassCode"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newCatcher.password"
                :rules="passwordConfirm"
                label="Confirm password"
                :type="showPassCodeConfirm ? 'text' : 'password'"
                :append-icon="
                  showPassCodeConfirm ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                @click:append="showPassCodeConfirm = !showPassCodeConfirm"
              />
            </v-col>

            <v-col v-if="isLogged === true" cols="12">
              <v-select
                v-model="newCatcher.accessLevel"
                :items="roles"
                label="Access Level"
                outlined
                item-text="text"
                item-value="value"
              />
            </v-col>
            <v-col v-if=" newCatcher.accessLevel !== 'MEMBER'" cols="12">
              <v-text-field
                v-model="inputAccessCode"
                :rules="required"
                label="Access Code"
                :type="showCode ? 'text' : 'password'"
                :append-icon="
                  showCode ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                @click:append-outer="showCode = !showCode"
              />
              <p v-if="wrongCodeError" class="red--text">
                Wrong code!
              </p>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="secondary" width="100" class="py-5 mt-3 mb-5" @click="registerNewUser">
          SEND
        </v-btn>
      </v-card-actions>
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
      showCode: false,
      showPassCode: false,
      showPassCodeConfirm: false,
      wrongCodeError: false,
      secredAccessCode: 'triptease',
      inputAccessCode: null,
      confirmPassword: null,
      roles: [{
        text: 'Tripper',
        value: 'MEMBER'
      },
      {
        text: 'DJ',
        value: 'DJ'
      },
      {
        text: 'Staff',
        value: 'STAFF'
      },
      {
        text: 'Sergeant',
        value: 'SERGEANT'
      }

      ],
      newCatcher: {
        _id: null,
        phone: '+407',
        username: null,
        firstname: null,
        lastname: null,
        guestOf: null,
        email: null,
        availableClovers: 0,
        accessLevel: 'MEMBER'
      },
      guestNameRules: [
        v => !!v || 'Required!',
        v => /^[A-Za-z]+[A-Za-z\s]*$/.test(v) || 'Invalid name!',
        v => /^[A-Za-z\s]*$/.test(v) || 'Only letters and space allowed!'
      ],
      nameRules: [
        v => !!v || 'Required!',
        v => /^[a-zA-Z]*$/.test(v) || 'Only letters allowed!'
      ],
      usernameRules: [
        v => !!v || 'Required!',
        v => /^[a-zA-Z0-9_]*$/.test(v) || 'Only letters, digits and _ allowed!'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter'
      ],
      emailRules: [
        // v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ],
      required: [
        v => !!v || 'Code is required'
      ],
      passwordConfirm: [
        v => !!v || 'Confirmation required',
        v => v === this.confirmPassword || 'Password does not match'
      ],
      phoneRules: [
        v => !!v || 'Required',
        v => /^\+\d{11}$/.test(v) || 'Invalid format! For example +40744112233'
      ]
    }
  },
  computed: {
    isLogged () {
      return this.$auth.state.loggedIn
    },
    idAdmin () {
      return this.$auth.state.user.accessLevel === 'ADMIN'
    }
  },
  watch: {
    inputAccessCode: {
      deep: true,
      handler () {
        this.wrongCodeError = false
      }
    }
  },
  methods: {
    async registerNewUser () {
      if (this.$refs.form.validate()) {
        if (this.newCatcher.accessLevel !== 'MEMBER') {
          if (this.inputAccessCode !== this.secredAccessCode) {
            this.wrongCodeError = true
            return
          }
        }
        if (this.isLogged === false) {
          this.newCatcher.accessLevel = 'MEMBER' // same in backend
        }
        const newUserId = await this.$axios.post('/register', { newUser: this.newCatcher }).then((res) => { return res.data })
        if (this.isLogged === false) {
          this.route.push('/')
        }
        this.$router.push(`/profile/${newUserId.userId}`)
      }
    }
  }
}
</script>
