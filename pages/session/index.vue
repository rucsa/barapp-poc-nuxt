<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-form ref="form" class="mx-2" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="sessionData.name" label="Event Name" :rules="titleRules" />
            </v-col>
            <v-col cols="12">
              <!-- eslint-disable-next-line vue/valid-v-on -->
              <v-text-field v-model="sessionData.currentTicketValue" :rules="fullNumberRules" label="Entry Donation" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="sessionData.createdBy" disabled label="Created By" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="createdAt" disabled label="Created At" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="isActive" disabled label="Active" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="expiresAt" disabled label="Active until" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn v-if="createSession === false" @click="buttonClicked">
          Close Session
        </v-btn>
        <v-btn color="secondary" @click="buttonClicked">
          {{ createSession === true ? 'Activate Session' : 'Apply Changes' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import midlayout from '@/middleware/layout.js'

export default {
  layout: midlayout,

  data () {
    return {
      sessionData: {
        _id: null,
        name: null,
        createdAt: null,
        expiresAt: null,
        createdBy: null,
        currentTicketValue: null,
        active: false
      },
      titleRules: [
        v => !!v || 'Required!',
        v => /^[a-zA-Z0-9_]*$/.test(v) || 'Only letters, digits and _ allowed!'
      ],
      fullNumberRules: [
        v => !!v || 'Required!',
        v => /^[0-9]*$/.test(v) || 'Only digits allowed!'
      ]
    }
  },
  computed: {
    createSession () {
      return this.sessionData._id == null
    },
    createdAt () {
      if (this.sessionData == null || this.sessionData.createdAt == null) { return null }
      const elements = this.sessionData.createdAt.split('T')
      const time = elements[1].substring(0, elements[1].length - 5)
      return elements[0] + ' ' + time
    },
    expiresAt () {
      if (this.sessionData == null || this.sessionData.expiresAt == null) { return null }
      const elements = this.sessionData.expiresAt.split('T')
      const time = elements[1].substring(0, elements[1].length - 5)
      return elements[0] + ' ' + time
    },
    isActive () {
      if (this.sessionData == null || this.sessionData.active == null) { return null }
      return this.sessionData.active === true ? 'Yes' : 'No'
    },
    sessionId () {
      return this.$store.getters.getSessionId
    }
  },
  created () {
    this.fetchSessionData()
  },
  methods: {
    async fetchSessionData () {
      const res = await this.$axios.get('/session/get-active').then((res) => { return res.data })
      if (res.session != null) {
        this.sessionData = res.session
        if (this.sessionId !== this.sessionData._id) { this.$store.dispatch('fetchSessionData') }
      }
    },
    async buttonClicked () {
      if (!this.$refs.form.validate()) { return }
      if (this.createSession === true) {
        const res = await this.$axios.post('/session/new', { sessionData: this.sessionData }).then((res) => { return res })
        this.sessionData = res.data
      } else {
        const res = await this.$axios.post('/session/update', { sessionData: this.sessionData }).then((res) => { return res })
        this.sessionData = res.data
        this.$notify({
          group: 'success',
          text: `Updated event ${this.sessionData.name}`
        })
      }
      this.$store.commit('setTicketValue', this.sessionData.currentTicketValue)
    }

  }
}
</script>
