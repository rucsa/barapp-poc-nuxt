<template>
  <v-container fluid class="d-flex flex-column align-center">
    <v-card outlined max-width="800" min-width="300">
      <v-card-title class="d-flex justify-center text-h2 pa-10">
        {{ member.username }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <p class="text-overline">
              {{ memberName }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="d-flex justify-center">
            <p class="text-overline">
              available
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
    <v-card outlined max-width="800" min-width="300" class="mt-3" />
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
      return this.$route.path.split('/')[2] || this.$auth.$state.user._id
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
