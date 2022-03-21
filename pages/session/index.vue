<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="sessionData.name" label="Nume" />
          </v-col>
          <v-col cols="12">
            <!-- eslint-disable-next-line vue/valid-v-on -->
            <v-text-field v-model="sessionData.currentEntranceFee" label="Entry Fee" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="sessionData.createdBy" label="Creat De" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="createdAt" disabled label="Creat la" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="isActive" disabled label="Activ" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="expiresAt" disabled label="Valabil pana la" />
          </v-col>
        </v-row>
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
        currentEntranceFee: null,
        active: false
      }
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
      return elements[0] + ' @' + time
    },
    expiresAt () {
      if (this.sessionData == null || this.sessionData.expiresAt == null) { return null }
      const elements = this.sessionData.expiresAt.split('T')
      const time = elements[1].substring(0, elements[1].length - 5)
      return elements[0] + ' @' + time
    },
    isActive () {
      if (this.sessionData == null || this.sessionData.active == null) { return null }
      return this.sessionData.active === true ? 'Activ' : 'Inactiv'
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
      }
    },
    async buttonClicked () {
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
      this.$log.debug('Update fee todo')
    }

  }
}
</script>
