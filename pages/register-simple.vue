<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-title class="d-flex justify-center">
        Register
      </v-card-title>
      <v-card-text>
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
              <v-text-field v-model="newCatcher.username" :rules="usernameRules" label="Username" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="secondary" @click="registerNewUser">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import midlayout from '@/middleware/layout.js'

export default {
  layout: midlayout,
  middleware: 'access',
  data () {
    return {
      showCode: false,
      wrongCodeError: false,
      secredAccessCode: 'triptease',
      inputAccessCode: null,
      confirmPassword: null,
      newCatcher: {
        _id: null,
        username: null,
        firstname: null,
        lastname: null,
        guestOf: null,
        email: null,
        availableClovers: 0,
        accessLevel: 'MEMBER',
        payedTicketThisSession: false
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
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ]
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
        const newUserId = await this.$axios.post('/register-simple', { newUser: this.newCatcher }).then((res) => { return res.data }).catch((ex) => {
          this.$notify({ group: 'error', text: ex.response.data })
        })
        if (newUserId != null) {
          this.$router.push(`/profile/${newUserId.registerUser._id}`)
        }
      }
    }
  }
}
</script>
