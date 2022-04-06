<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex flex-column">
        <p class="text-overline">
          {{ `Reset password for user` }}
        </p>

        <p class="text-button secondary--text">
          {{ `${member.username} - ${memberName}` }}
        </p>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" class="mx-2" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="code" label="Code" :rules="required" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="confirmPassword"
                label="New Password"
                :rules="required"
                :type="showPass ? 'text' : 'password'"
                :append-icon="
                  showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                @click:append="showPass = !showPass"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newPassword"
                :rules="passwordConfirm"
                label="Confirm new password"
                :type="showPassConfirm ? 'text' : 'password'"
                :append-icon="
                  showPassConfirm ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                @click:append="showPassConfirm = !showPassConfirm"
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
import midlayout from '@/middleware/layout.js'

export default {
  layout: midlayout,
  middleware: 'access',
  data () {
    return {
      showConfirmDialog: false,
      showPass: false,
      showPassConfirm: false,
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
      required: [v => !!v || 'Required'],
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
          'Password must contain at least lowercase letter, one number, a special character and one uppercase letter'
      ],
      passwordConfirm: [
        v => !!v || 'Confirmation required',
        v => v === this.confirmPassword || 'Password does not match'
      ],
      code: null
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
      return this.member.lastname != null
        ? `${this.member.firstname} ${this.member.lastname}`
        : `${this.member.firstname}`
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
        .then((res) => {
          return res
        })
      this.member = res.data
    },
    awaitConfirmation () {
      if (!this.$refs.form.validate()) {
        return
      }
      this.showConfirmDialog = true
    },
    async updatePassword () {
      this.showConfirmDialog = false
      this.$log.debug('Functionality todo')
      const passChange = await this.$axios
        .post(`/user/${this.memberId}/change`, { newPass: this.newPassword, code: this.code })
        .then((res) => {
          this.confirmPassword = null
          this.newPassword = null
          this.code = null
          this.showPassConfirm = false
          this.showPass = false
          return res.data
        })
        .catch((ex) => {
          this.$notify({ group: 'error', text: ex.response.data })
        })
      if (passChange === true) {
        this.$notify({ group: 'success', text: `Password changed for user ${this.memberName}` })
      }
    }
  }
}
</script>
