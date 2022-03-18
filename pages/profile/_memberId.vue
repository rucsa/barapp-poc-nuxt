<template>
  <v-container fluid class="d-flex justify-center">
    <v-card :key="componentKey" outlined width="500">
      <v-card-title class="d-flex justify-center py-5 text-h4">
        {{ memberName }}
      </v-card-title>
      <v-card-text class="pt-10 pb-10">
        <v-row class="d-flex justify-center">
          <v-col cols="6" class="d-flex justify-center">
            <p class="text-subtitle-1 pt-2">
              {{ isFilling === true ? 'Add clovers': 'Available funds' }}
            </p>
          </v-col>
          <v-col cols="4" class="d-flex justify-center">
            <p v-if="isFilling === false" class="text-h4 pt-2">
              {{ member.availableClovers }}
            </p>
            <v-text-field v-else v-model="sumToFill" label="Clovers" class="pt-2">
              />
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-center py-4">
        <v-btn @click="leftButtonPressed">
          {{ isFilling === true ? 'Cancel': 'Alimenteaza' }}
        </v-btn>
        <v-btn color="secondary" @click="actionButtonPressed">
          {{ isFilling === true ? 'Add Cloveri': 'Comanda' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      componentKey: 0,
      isFilling: false,
      sumToFill: null,
      member: {
        _id: null,
        firstname: null,
        lastname: null,
        availableClovers: null
      }
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
    }
  }
}
</script>
