<template>
  <v-container>
    <v-card elevation="0">
      <v-card-title>{{ `${memberName} wants` }}</v-card-title>
      <v-card-text>
        <v-card outlined class="my-1">
          <v-row class="pa-2">
            <v-col v-for="item in options" :key="item.id">
              <v-btn @click="addItem(item)">
                {{ item.name }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-card outlined class="my-2">
          <v-row v-for="selected in selectedItems" :key="selected.name" class="pa-0 ma-0">
            <v-col cols="3" class="pa-0 ma-0">
              <p class="text-overline">
                {{ selected.name }}
              </p>
            </v-col>
            <v-spacer />
            <v-col cols="2">
              <v-btn icon>
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="1">
              <p class="text-overline">
                {{ selected.count }}
              </p>
            </v-col>
            <v-col cols="2">
              <v-btn icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <p class="text-overline">
                Total
              </p>
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <p class="text-overline">
                {{ grandTotal }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </v-card>
    <!-- <v-speed-dial
      v-model="fab"
      :absolute="true"
      :bottom="true"
      :right="true"
      direction="left"
      :open-on-hover="false"
      transition="slide-x-reverse-transition"
    >
      <template #activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial> -->
    <v-fab-transition>
      <v-btn
        color="pink"
        fab
        dark
        absolute
        bottom
        right
        @click="confirmOrderDialog = !confirmOrderDialog"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-dialog v-model="confirmOrderDialog" width="600" height="400" persistent>
      <v-card color="grey">
        <v-card-text class="d-flex justify-center font-weight-bold text-h6">
          {{ `Confirm order of 50 for member ${member.name}?` }}
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn @click="confirmOrderDialog = false">
            Cancel
          </v-btn><v-btn color="secondary" @click="confirm">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      confirmOrderDialog: false,
      member: {
        _id: null,
        firstname: null,
        lastname: null,
        availableClovers: null
      },
      options: [
        {
          id: 1,
          name: 'Apa',
          clovers: 10
        },
        {
          id: 2,
          name: 'Peroni',
          clovers: 10
        },
        {
          id: 3,
          name: 'Despe',
          clovers: 10
        },
        {
          id: 4,
          name: 'Shot',
          clovers: 10
        },
        {
          id: 5,
          name: 'Gin',
          clovers: 25
        },
        {
          id: 6,
          name: 'Cuba',
          clovers: 25
        }
      ],
      selectedItems: []
    }
  },
  computed: {
    memberId () {
      return this.$route.path.split('/')[2]
    },
    memberName () {
      return this.member.lastname != null ? `${this.member.firstname} ${this.member.lastname}` : `${this.member.firstname}`
    },
    grandTotal () {
      let total = 0
      this.selectedItems.forEach((item) => {
        total = total + (item.clovers * item.count)
      })
      return total
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
    addItem (item) {
      this.$log.debug(this.selectedItems)
      const existsAtIndex = this.selectedItems.findIndex(x => x.id === item.id)
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
    confirm () {
      this.$log.debug('confirm order todo')
      this.confirmOrderDialog = false
      this.$notify({ group: 'success', text: `${this.grandTotal} clovers from ${this.member.name}` })
      this.$router.push('/')
    }
  }
}
</script>
