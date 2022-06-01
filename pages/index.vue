<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-title>Incoming</v-card-title>
      <v-card-text>
        <v-list-item-content v-for="item in currentOrders" :key="item._id">
          <v-col cols="7">
            <v-list-item-title>{{ `${item.code}  ${item.username}` }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ item.contentString }}
            </v-list-item-subtitle>
          </v-col>
          <v-col v-if="item.status === 'Pending'" cols="5" class="d-flex justify-center">
            <v-btn class="black--text" color="amber lighten-2" width="120">
              Start Order
            </v-btn>
          </v-col>
          <v-col v-if="item.status === 'Prepared'" cols="5" class="d-flex justify-center">
            <v-btn class="black--text" color="orange darken-2" width="120">
              Prepared
            </v-btn>
          </v-col>
          <v-col v-if="item.status === 'Served'" cols="5" class="d-flex justify-center">
            <v-btn class="black--text" color="light-green lighten-1" width="120">
              Served
            </v-btn>
          </v-col>
        </v-list-item-content>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <FabButton icon-name="mdi-qrcode-scan" :right="false" @clicked="goToScanQR" />
          </v-col>
          <v-col cols="4">
            <FabButton icon-name="mdi-account-group" @clicked="goToViewTabs" />
          </v-col>
          <v-col cols="4">
            <FabButton :right="true" @clicked="goToNewOrder" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>

import FabButton from '../components/FabButton.vue'
import midlayout from '@/middleware/layout.js'

export default {
  components: { FabButton },
  layout: midlayout,
  auth: true,
  data () {
    return {
      currentOrders: [
        {
          _id: 1,
          code: 'ABC',
          username: 'vulpix',
          contentString: '2 x Gin',
          status: 'Pending'
        },
        {
          _id: 2,
          code: 'ABC',
          username: 'vulpix',
          contentString: '1 x Apa',
          status: 'Prepared'
        },
        {
          _id: 3,
          code: 'ABC',
          username: 'vulpix',
          contentString: '1 x Visi, 2 x Apa',
          status: 'Served'
        }
      ]
    }
  },
  computed: {
  },
  mounted () {
    // GUARD
    if (this.$auth.$state.user.accessLevel === 'MEMBER') {
      this.$router.push(`/members/${this.$auth.$state.user._id}`)
    }
  },
  created () {
    // this.fetchData()
  },
  methods: {
    async fetchData () {
      const res = await this.$axios.get('/pending-orders').then((res) => { return res })
      this.currentOrders = []
      res.data.forEach((order) => {
        console.log(order)
      })
    },
    // registerNewMember () {
    //   this.$log.debug('Register new member')
    //   this.$router.push('/register-simple')
    // },
    goToScanQR () {
      this.$router.push('/scanner')
    },
    goToNewOrder () {
      this.$router.push('/order')
    },
    goToViewTabs () {
      this.$router.push('/')
    }
  }
}
</script>
