<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex justify-center">
        <p class="text-overline">
          {{ `Reset password for user` }}
        </p>
        <p class="text-button  secondary--text">
          {{ `${member.username} - ${memberName}` }}
        </p>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" class="mx-2" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="confirmPassword"
                label="New Password"
                :rules="required"
                :type="showPassCode ? 'text' : 'password'"
                append-icon="mdi-eye"
                @click:append-outer="showPassCode = !showPassCode"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newPassword"
                :rules="passwordConfirm"
                label="Confirm new password"
                :type="showPassCode ? 'text' : 'password'"
                append-icon="mdi-eye"
                @click:append-outer="showPassCode = !showPassCode"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn icon @click="awaitConfirmation">
          <v-icon color="secondary">
            mdi-key
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="showConfirmDialog">
      <ConfirmDialog
        :text="'Confirm password change for ' + memberName + '?'"
        @cancel="showConfirmDialog = false"
        @confirm="updatePassword"
      />
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      showConfirmDialog: false,
      showPassCode: false,
      confirmPassword: null,
      newPassword: null,
      member: {
        _id: null,
        firstname: null,
        lastname: null,
        password: null,
        availableClovers: null,
        payedTicketThisSession: false
      },
      required: [
        v => !!v || 'Required'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter'
      ],
      passwordConfirm: [
        v => !!v || 'Confirmation required',
        v => v === this.confirmPassword || 'Password does not match'

      ]
    }
  },
  computed: {
    idAdmin () {
      return this.$auth.state.user.accessLevel === 'ADMIN'
    },
    memberId () {
      return this.$route.path.split('/')[2]
    },
    memberName () {
      return this.member.lastname != null ? `${this.member.firstname} ${this.member.lastname}` : `${this.member.firstname}`
    }
  },
  created () {
    this.fetchMemberData()
  },
  methods: {
    async fetchMemberData () {
      this.$log.debug('Fetching member data')
      const res = await this.$axios
        .get(`/profile/${this.memberId}`)
        .then((res) => { return res })
      this.member = res.data
    },
    awaitConfirmation () {
      if (!this.$refs.form.validate()) { return }
      this.showConfirmDialog = true
    },
    updatePassword () {
      this.showConfirmDialog = false
      this.$log.debug('Functionality todo')
    }
  }
}
</script>
