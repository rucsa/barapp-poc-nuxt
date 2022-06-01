<template>
  <v-container class="d-flex justify-center">
    <v-card elevation="0" max-width="500">
      <v-card-title class="d-flex justify-center">
        {{
          `${memberName} | ${
            member.availableClovers != null ? member.availableClovers : "Ice"
          }`
        }}
      </v-card-title>
      <v-card-text>
        <v-card outlined class="my-1">
          <v-row class="pa-1">
            <v-col
              v-for="item in products"
              :key="item._id"

              class="d-flex justify-center"
            >
              <v-btn
                width="111"
                min-height="70"
                :color="item.color"
                :class="item.textColor + '--text mx-2'"
                @click="addItem(item)"
              >
                {{ item.denumire }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-card outlined class="my-2">
          <v-row
            v-for="selected in selectedItems"
            :key="selected.name"
            class="pa-0 ma-0"
          >
            <v-col cols="6" class="pl-4">
              <v-row class="pt-3">
                <v-btn
                  class="pt-1"
                  icon
                  small
                  color="secondary"
                  @click="deleteSelectedItem(selected)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <p class="text-overline">
                  {{ selected.denumire }}
                </p>
              </v-row>
            </v-col>
            <v-spacer />
            <v-col cols="4" class="d-flex justify-center">
              <p class="text-h5">
                {{ selected.count }}
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="pl-8 d-flex justify-center">
              <p class="text-h5 pt-1">
                Total
              </p>
            </v-col>
            <v-spacer />
            <v-col cols="4" class="d-flex justify-center pr-8 py-1 ma-0">
              <p class="text-h5 secondary--text pt-3">
                {{ grandTotal }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </v-card>
    <FabButton @clicked="order" />
    <v-dialog v-model="confirmOrderDialog" width="600" persistent>
      <ConfirmDialog
        :text="'Confirm order of ' + grandTotal + ' for ' + memberName + '?'"
        @cancel="confirmOrderDialog = false"
        @confirm="confirm"
      />
    </v-dialog>
  </v-container>
</template>
<script>
import FabButton from '../../../components/FabButton.vue'
import midlayout from '@/middleware/layout.js'
export default {
  components: { FabButton },
  layout: midlayout,
  data () {
    return {
      confirmOrderDialog: false,
      member: {
        _id: null,
        firstname: 'Anonymous',
        lastname: null,
        availableClovers: null
      },
      products: [],
      selectedItems: []
    }
  },
  computed: {
    enoughFunds () {
      return this.member.availableClovers <= this.grandTotal
    },
    memberId () {
      return this.$route.path.split('/')[2]
    },
    memberName () {
      return this.member.lastname != null
        ? `${this.member.firstname} ${this.member.lastname}`
        : `${this.member.firstname}`
    },
    grandTotal () {
      let total = 0
      this.selectedItems.forEach((item) => {
        total = total + item.clovers * item.count
      })
      return total
    },
    sessionId () {
      return this.$store.getters.getSessionId
    }
  },
  created () {
    this.fetchProducts()
    if (this.memberId != null) {
      this.fetchMemberData()
    }
  },
  methods: {
    async fetchProducts () {
      this.products = await this.$axios.get('/products').then((res) => {
        return res.data.sort((a, b) => (a.denumire > b.denumire) ? 1 : -1)
      })
    },
    async fetchMemberData () {
      this.$log.debug('Fetching member data')
      const res = await this.$axios
        .get(`/profile/${this.memberId}`)
        .then((res) => {
          return res
        })
      this.member = res.data
    },
    addItem (item) {
      this.$log.debug(this.selectedItems)
      const existsAtIndex = this.selectedItems.findIndex(
        x => x._id === item._id
      )
      this.$log.debug(existsAtIndex)
      const newItem = item
      if (existsAtIndex === -1) {
        newItem.count = 1
        this.selectedItems.push(newItem)
      } else {
        const count = this.selectedItems[existsAtIndex].count
        newItem.count = count + 1
        this.selectedItems.splice(existsAtIndex, 1, newItem)
      }
    },
    deleteSelectedItem (selected) {
      const deleteIndex = this.selectedItems
        .map((x) => {
          return x._id
        })
        .indexOf(selected._id)
      this.selectedItems.splice(deleteIndex, 1)
    },
    order () {
      // if (this.grandTotal > 0 && this.enoughFunds === true) {
      //   this.confirmOrderDialog = true
      // }
      this.confirmOrderDialog = true
    },
    confirm () {
      this.$log.debug('confirm order todo')
      this.$axios
        .post(`/user/${this.memberId}/new-order`, {
          grandTotal: this.grandTotal,
          content: this.selectedItems,
          sessionId: this.sessionId
        })
        .then((res) => {
          console.log(res)
        })
      this.confirmOrderDialog = false
      this.$notify({
        group: 'success',
        text: `${this.grandTotal} clovers from ${this.memberName}`
      })
      this.$router.push('/')
    }
  }
}
</script>
