<template>
  <v-container fluid class="d-flex justify-center">
    <v-card :key="componentKey" outlined width="500">
      <v-card-title class="d-flex justify-center py-5 text-h4">
        {{ memberName }}
      </v-card-title>
      <v-card-text class="pt-10 pb-10">
        <v-row class="d-flex justify-center">
          <v-col cols="6" class="d-flex justify-center">
            <p class="text-subtitle-1 pt-2 pl-2">
              Ticket
            </p>
          </v-col>
          <v-col cols="6" class="d-flex justify-center">
            <v-icon v-if="member.payedTicketThisSession === true" color="green" class="pb-2">
              mdi-check-circle-outline
            </v-icon>
            <v-btn v-else color="secondary" @click="ticketPaymentDialog = true">
              Pay ticket
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="6" class="d-flex justify-center">
            <p class="text-subtitle-1 pt-2">
              {{ isFilling === true ? 'Add clovers': 'Available funds' }}
            </p>
          </v-col>
          <v-col cols="4" class="d-flex justify-center">
            <p v-if="isFilling === false" class="text-h4">
              {{ member.availableClovers }}
            </p>
            <v-text-field v-else v-model="sumToFill" label="Clovers" class="pt-0" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-center py-4">
        <v-btn :color="!isFilling && member.availableClovers <= 0 ? 'secondary' : $vuetify.theme.primary" @click="leftButtonPressed">
          {{ isFilling === true ? 'Cancel': 'Refill' }}
        </v-btn>
        <v-btn v-show="isFilling === true || member.availableClovers > 0" color="secondary" @click="actionButtonPressed">
          {{ isFilling === true ? 'Add Clovers': 'Order' }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="ticketPaymentDialog" width="600" persistent>
      <ConfirmDialog
        :text="'Confirm order of ' + ticketPrice + ' for ' + memberName + '?'"
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
      ticketPaymentDialog: false,
      componentKey: 0,
      isFilling: false,
      sumToFill: null,
      member: {
        _id: null,
        firstname: null,
        lastname: null,
        availableClovers: null,
        payedTicketThisSession: false
      },
      ticketPrice: 30
    }
  },
  computed: {
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
    leftButtonPressed () {
      this.isFilling = !this.isFilling
      if (this.sumToFill != null) { this.sumToFill = null }
    },
    async actionButtonPressed () {
      if (this.isFilling === true) {
        this.$log.debug(`Alimenteaza pentru memberul  todo ${this.sumToFill}`)
        const res = await this.$axios.post(`/user/${this.memberId}/refill`, { newClovers: this.sumToFill }).then((res) => { return res })
        this.$log.debug(res.data)
        this.componentKey += 1
        this.isFilling = false
        this.fetchMemberData()
      } else {
        this.$router.push(`/order/${this.memberId}`)
      }
    },
    async payTicket () {
      const ticketPayment = await this.$axios.get(`/user/${this.memberId}/pay-ticket`).then((res) => { return res }).catch((ex) => { this.$log.error(ex) })
      this.$log.debug(ticketPayment)
      this.ticketPaymentDialog = false
      this.$notify({
        group: 'success',
        text: `${this.ticketPrice} clovers from ${this.memberName}`
      })
      this.fetchMemberData()
    }
  }
}
</script>
