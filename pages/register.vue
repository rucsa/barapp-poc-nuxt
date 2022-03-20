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
              <v-text-field v-model="newCatcher.firstname" :rules="nameRules" label="Firstname" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newCatcher.lastname" :rules="nameRules" label="Lastname" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newCatcher.guestOf" :rules="nameRules" label="Guest Of" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newCatcher.email" :rules="emailRules" label="Email" />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="newCatcher.accessLevel"
                :items="roles"
                label="Access Level"
                outlined
                item-text="text"
                item-value="value"
              />
            </v-col>
            <v-col v-if="newCatcher.accessLevel !== 'MEMBER'" cols="12">
              <v-text-field
                v-model="inputAccessCode"
                :rules="required"
                label="Access Code"
                :type="showCode ? 'text' : 'password'"
                append-icon="mdi-eye"
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
        <v-btn color="secondary" @click="registerNewUser">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      showCode: false,
      wrongCodeError: false,
      secredAccessCode: 'triptease',
      inputAccessCode: null,
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
      }

      ],
      newCatcher: {
        _id: null,
        firstname: null,
        lastname: null,
        guestOf: null,
        email: null,
        availableClovers: 0,
        accessLevel: 'MEMBER'
      },
      nameRules: [
        v => !!v || 'Required!',
        v => /^[a-zA-Z0-9]*$/.test(v) || 'Only letters and digits allowed!'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ],
      required: [
        v => !!v || 'Code is required'
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
        if (this.newCatcher.accessLevel !== 'MEMBER') {
          if (this.inputAccessCode !== this.secredAccessCode) {
            this.wrongCodeError = true
            return
          }
        }
        const newUserId = await this.$axios.post('/new-user', { newUserData: this.newCatcher }).then((res) => { return res.data })
        this.$router.push(`/profile/${newUserId}`)
      }
    }
  }
}
</script>
