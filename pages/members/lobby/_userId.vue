<template>
  <v-container>
    <v-overlay :opacity="1" :value="overlay">
      <v-progress-circular indeterminate size="64">
        Loading...
      </v-progress-circular>
    </v-overlay>
    <v-card class="pb-10">
      <v-card-text>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <p class="text-overline">
              {{ member.username }}
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
      <v-card-actions>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn v-if="member.availableClovers > 0">
              Support the artists
            </v-btn>
            <div v-else>
              <p class="text-body-1 text-center">
                To enter
              </p>
              <p class="text-body-1 text-center red--text">
                Ask a catcher <br>To make a refill for you
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'member',
  data () {
    return {
      overlay: true,
      member: {
        userId: null,
        availableClovers: null,
        checkedIn: null,
        firstname: null,
        lastname: null,
        username: null
      },
      redPill: false,
      encodedQr: null
    }
  },
  computed: {
    memberCheckedIn () {
      return this.member && this.member.checkedIn
    },
    memberId () {
      return this.$route.path.split('/')[2] || this.$auth.$state.user._id
    },
    memberName () {
      return this.member.lastname != null
        ? `${this.member.firstname} ${this.member.lastname}`
        : `${this.member.firstname}`
    }
  },
  async created () {
    await this.fetchMemberStatus()
    this.overlay = false
  },
  methods: {
    async fetchMemberStatus () {
      const res = await this.$axios.get('/member-status').then((res) => {
        return res
      })
      this.member = res.data.userStatus
      await this.getQr()
    },
    async getQr () {
      const res = await this.$axios.get('/member-qr').then((res) => {
        return res
      })
      this.encodedQr = res.data
    }
  }
}
</script>
