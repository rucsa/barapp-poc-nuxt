<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col class="d-flex flex-column align-center">
            <p class="text-overline">
              Tickets
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex flex-column align-center">
            <p>No. of Tickers:</p>
            <p>Total Clovers:</p>
          </v-col>
          <v-col cols="6">
            <p>
              {{
                sessionStatus.tickets != null ? sessionStatus.tickets.count : ""
              }}
            </p>
            <p>
              {{
                sessionStatus.tickets != null ? sessionStatus.tickets.total : ""
              }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <p class="text-overline">
              Refills
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex flex-column align-center">
            <p>No. of Refills:</p>
            <p>Total Clovers:</p>
          </v-col>
          <v-col cols="6">
            <p>
              {{
                sessionStatus.refills != null ? sessionStatus.refills.count : ""
              }}
            </p>
            <p>
              {{
                sessionStatus.refills != null ? sessionStatus.refills.total : ""
              }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <p class="text-overline">
              Orders
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex flex-column align-center">
            <p>No. of Orders:</p>
            <p>Total Clovers:</p>
          </v-col>
          <v-col cols="6">
            <p>
              {{
                sessionStatus.orders != null ? sessionStatus.orders.count : ""
              }}
            </p>
            <p>
              {{
                sessionStatus.orders != null ? sessionStatus.orders.total : ""
              }}
            </p>
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
  data () {
    return {
      sessionStatus: {
        refills: null,
        tickets: null,
        orders: null
      }
    }
  },
  computed: {
    sessionId () {
      return this.$store.getters.getSessionId
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const status = await this.$axios
        .get(`/session/status/${this.sessionId}`)
        .then((res) => {
          return res.data
        })
        .catch(err => this.$log.error(err))
      this.sessionStatus = status
    }
  }
}
</script>
