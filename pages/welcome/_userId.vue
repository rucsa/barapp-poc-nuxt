<template>
  <v-container fluid class="d-flex justify-center">
    <v-card outlined max-width="800" min-width="600">
      <v-card-title class="d-flex justify-center text-h2 pa-10">
        Welcome
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6" class="d-flex justify-center">
            <p class="text-overline">
              username
            </p>
          </v-col>
          <v-col cols="6" class="d-flex justify-center">
            <p class="text-h5">
              {{ member.username }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex justify-center">
            <p class="text-overline">
              clovers
            </p>
          </v-col>
          <v-col cols="6" class="d-flex justify-center">
            <p class="text-h5">
              {{ member.availableClovers }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'member',
  data () {
    return {
      member: {
        _id: null,
        username: null,
        firstname: null,
        lastname: null,
        availableClovers: null,
        payedTicketThisSession: false
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
      const res = await this.$axios
        .get(`/profile/${this.memberId}`)
        .then((res) => { return res })
      this.member = res.data
    }
  }

}
</script>
