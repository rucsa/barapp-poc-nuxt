<template>
  <v-container fluid class="d-flex justify-center">
    <v-col class="d-flex flex-column align-center">
      <v-card :key="componentKey" outlined width="500">
        <v-card-title class="d-flex justify-center py-5 text-h4">
          {{ memberName }}
        </v-card-title>
        <v-card-subtitle class="d-flex justify-center">
          {{ member.username }}
        </v-card-subtitle>
        <v-card-text class="pt-10 pb-10">
          <v-form ref="form" lazy-validation>
            <v-row v-if="isFilling === false" class="d-flex justify-center">
              <v-col cols="6" class="d-flex justify-center">
                <p class="text-subtitle-1 pt-2 pl-2">
                  Ticket
                </p>
              </v-col>
              <v-col cols="6" class="d-flex justify-center">
                <v-icon
                  v-if="member.payedTicketThisSession === true"
                  color="green"
                  class="pb-2"
                >
                  mdi-check-circle-outline
                </v-icon>
                <v-menu v-else offset-y>
                  <!-- eslint-disable-next-line vue/no-unused-vars -->
                  <template #activator="{ on, attrs }">
                    <v-btn v-bind="attrs" color="secondary" v-on="on">
                      Pay ticket
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item-group v-model="ticketDonationMenu">
                      <v-list-item
                        v-for="(item, index) in ticketPaymentOptions"
                        :key="index"
                        @click="requestTicketPaymentDialog(item.title)"
                      >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
              <v-col cols="6" class="d-flex justify-center">
                <p class="text-subtitle-1 pt-2">
                  {{ isFilling === true ? "Add clovers" : "Available funds" }}
                </p>
              </v-col>
              <v-col cols="4" class="d-flex justify-center">
                <p v-if="isFilling === false" class="text-h4">
                  {{ member.availableClovers }}
                </p>
                <v-text-field
                  v-else
                  v-model="sumToFill"
                  label="Clovers"
                  class="pt-0"
                  :rules="fullNumber"
                />
              </v-col>
            </v-row>
            <v-row v-if="isFilling === true" class="d-flex justify-center">
              <v-col cols="9">
                <v-select
                  v-model="method"
                  :items="['@amadaovl', '@catalooonia', 'Cash']"
                  label="Method"
                  :rules="[rules.required]"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center py-4">
          <v-btn
            :color="
              !isFilling && member.availableClovers <= 0
                ? 'secondary'
                : $vuetify.theme.primary
            "
            @click="leftButtonPressed"
          >
            {{ isFilling === true ? "Cancel" : "Refill" }}
          </v-btn>
          <v-btn
            v-show="isFilling === true || member.availableClovers > 0"
            color="secondary"
            @click="actionButtonPressed"
          >
            {{ isFilling === true ? "Add Clovers" : "Order" }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="idAdmin === true" outlined class="mt-3">
        <v-card-text>
          <v-row class="d-flex justify-center">
            <v-col cols="6" class="d-flex justify-center">
              <v-text-field
                v-model="member.guestOf"
                label="Guest of"
                disabled
              />
            </v-col>
            <v-col cols="6" class="d-flex justify-space-around">
              <v-btn icon class="mt-3" @click="resetPassword">
                <v-icon> mdi-account-lock-open </v-icon>
              </v-btn>
              <!-- <v-btn icon class="mt-3" @click="closeAccount">
                <v-icon> mdi-account-cancel-outline </v-icon>
              </v-btn> -->
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-text-field
                v-model="lastUpdatedAt"
                label="Last order at"
                disabled
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-text-field
                v-model="member.createdBy"
                label="Created By"
                disabled
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-text-field v-model="createdAt" label="Created At" disabled />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-dialog v-model="ticketPaymentDialog" width="600" persistent>
      <ConfirmDialog
        :text="`Confirm ticket order of ${calculatedTicketText} for ${memberName}?`"
        @cancel="ticketPaymentDialog = false"
        @confirm="payTicket"
      />
    </v-dialog>
  </v-container>
</template>
<script>
import midlayout from '@/middleware/layout.js'

export default {
  layout: midlayout,
  data () {
    return {
      calculatedTicketValue: null,
      calculatedTicketText: null,
      ticketDonationMenu: null,
      ticketPaymentDialog: false,
      componentKey: 0,
      isFilling: false,
      sumToFill: null,
      method: null,
      ticketPaymentOptions: [
        {
          title: 'From Tab'
        },
        {
          title: 'Cash'
        },
        {
          title: 'Free'
        }
      ],
      member: {
        _id: null,
        firstname: null,
        lastname: null,
        availableClovers: null,
        payedTicketThisSession: false,
        guestOf: null,
        createdAt: null,
        lastUpdatedAt: null
      },
      fullNumber: [
        v => !!v || 'Required!',
        v => /^\d*$/.test(v) || 'Only digits allowed!'
      ],
      rules: {
        required: (value) => {
          return !!value || 'Required!'
        }
      }
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
    },
    ticketValue () {
      return this.$store.getters.getTicketValue
    },
    sessionId () {
      return this.$store.getters.getSessionId
    },
    createdAt () {
      if (this.member == null || this.member.createdAt == null) {
        return null
      }
      const date = this.member.createdAt.split('T')[0]
      const time = this.member.createdAt.split('T')[1].split('.')[0]
      return `${date} - ${time}`
    },
    lastUpdatedAt () {
      if (this.member == null || this.member.lastUpdatedAt == null) {
        return null
      }
      const date = this.member.lastUpdatedAt.split('T')[0]
      const time = this.member.lastUpdatedAt.split('T')[1].split('.')[0]
      return `${date} - ${time}`
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
    leftButtonPressed () {
      this.isFilling = !this.isFilling
      if (this.sumToFill != null) {
        this.sumToFill = null
      }
    },
    async actionButtonPressed () {
      if (this.isFilling === true && !this.$refs.form.validate()) {
        return
      }
      if (this.isFilling === true) {
        // REFILL
        this.$log.debug(
          `Refill with ${this.sumToFill} for ${this.memberName} `
        )
        const res = await this.$axios
          .post(`/user/${this.memberId}/refill`, {
            newClovers: this.sumToFill,
            method: this.method,
            sessionId: this.sessionId
          })
          .then((res) => {
            return res
          })
        this.$log.debug(res.data)
        this.componentKey += 1
        this.isFilling = false
        this.fetchMemberData()
        // GO TO ORDER
      } else {
        this.$router.push(`/order/${this.memberId}`)
      }
    },
    async payTicket () {
      const ticketPayment = await this.$axios
        .post(`/user/${this.memberId}/pay-ticket`, {
          ticketValue: this.calculatedTicketValue,
          donationMethod:
            this.calculatedTicketText === this.ticketValue
              ? 'From Tab'
              : this.calculatedTicketText
        })
        .then((res) => {
          return res
        })
        .catch((ex) => {
          this.$log.error(ex)
        })
      this.$log.debug(ticketPayment)
      this.ticketPaymentDialog = false
      this.$notify({
        group: 'success',
        text: `${this.ticketValue} clovers from ${this.memberName}`
      })
      this.fetchMemberData()
    },
    resetPassword () {
      this.$router.push(`/pass-reset/${this.memberId}`)
    },
    closeAccount () {
      this.$log.debug('Closing account functionality doto')
    },
    requestTicketPaymentDialog (option) {
      this.$log.debug(`Obtaining ticket for ${option}`)
      if (option === 'From Tab') {
        this.calculatedTicketValue = this.ticketValue
        this.calculatedTicketText = this.ticketValue
      } else if (option === 'Cash') {
        this.calculatedTicketText = 'CASH'
        this.calculatedTicketValue = 0
      } else if (option === 'Free') {
        this.calculatedTicketText = 'FREE'
        this.calculatedTicketValue = 0
      }
      this.ticketPaymentDialog = true
    }
  }
}
</script>
