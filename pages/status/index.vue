<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col class="d-flex flex-column align-center">
            <p class="text-subtitle-1">
              Users
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex flex-column align-end">
            <p>Admins:</p>
            <p>Staff:</p>
            <p>Members:</p>
          </v-col>
          <v-col cols="6">
            <p>
              {{
                sessionStatus.users != null ? sessionStatus.users.admins : ""
              }}
            </p>
            <p>
              {{
                sessionStatus.users != null ? sessionStatus.users.staff : ""
              }}
            </p>
            <p>
              {{
                sessionStatus.users != null ? sessionStatus.users.members : ""
              }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex flex-column align-center">
            <p class="text-subtitle-1">
              Tickets
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex flex-column align-end">
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
            <p class="text-subtitle-1">
              Refills
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex flex-column align-end">
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
            <p class="text-subtitle-1">
              Orders
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex flex-column align-end">
            <p>No. of Orders:</p>
            <p>Anonymous Orders:</p>
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
                sessionStatus.orders != null
                  ? sessionStatus.orders.anonymous
                  : ""
              }}
            </p>
            <p>
              {{
                sessionStatus.orders != null ? sessionStatus.orders.total : ""
              }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <p class="text-subtitle-1">
              Freezer Status
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex flex-column align-end">
            <p>Virtual Tickets:</p>
            <p>Virtual Orders:</p>
            <p>Ice Cubes Tickets:</p>
            <p>Ice Cubes Orders:</p>
          </v-col>
          <v-col cols="6">
            <p>
              {{
                sessionStatus.freezer != null
                  ? sessionStatus.freezer.ticketVirtuals
                  : ""
              }}
            </p>
            <p>
              {{
                sessionStatus.freezer != null ? sessionStatus.freezer.orderVirtuals : ""
              }}
            </p>
            <p>
              {{
                sessionStatus.freezer != null
                  ? sessionStatus.freezer.ticketCubes
                  : ""
              }}
            </p>
            <p>
              {{
                sessionStatus.freezer != null ? sessionStatus.freezer.orderCubes : ""
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
  middleware: 'access',
  data () {
    return {
      sessionStatus: {
        refills: null,
        tickets: null,
        orders: null,
        freezer: null,
        users: null
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
