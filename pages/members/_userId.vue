<template>
  <v-container fluid class="d-flex flex-column align-center">
    <v-overlay
      :opacity="1"
      :value="overlay"
    >
      <v-progress-circular indeterminate size="64">
        Loading...
      </v-progress-circular>
    </v-overlay>
    <v-card elevation="0" min-width="300">
      <v-card-title :class="`d-flex justify-center pa-10`">
        <p class=" text-overline ">
          Hey {{ memberName }},
        </p>
      </v-card-title>
      <v-card-text class="d-flex flex-column align-center">
        <!--  <v-row>
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
        </v-row> -->
        <p class="text-overline">
          Ask a Catcher to scan you!
        </p>
      </v-card-text>
    </v-card>
    <v-card
      v-if="encodedQr && encodedQr.qr"
      elevation="0"
      min-width="300"
    >
      <v-card-text class="d-flex justify-center align-center pt-8 pb-16">
        <img :src="encodedQr && encodedQr.qr ? `${encodedQr.qr}` : '#'">
      </v-card-text>
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
    if (this.member && this.member.checkedIn === true) {
      this.$route.push(`/members/room/${this.memberId}`)
    } else {
      await this.getQr()
      this.overlay = false
    }
  },
  methods: {
    async fetchMemberStatus () {
      const res = await this.$axios
        .get('/member-status')
        .then((res) => {
          return res
        })
      this.member = res.data.userStatus
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
