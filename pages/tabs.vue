<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-title>Active Tabs</v-card-title>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :mobile-breakpoint="0"
            hide-default-footer
            :headers="headers"
            :items="members"
            item-key="_id"
            :options.sync="pagination"
            :search="search"
            @click:row="rowClick"
          >
            <template #top>
              <v-text-field
                v-model="search"
                label="Search"
                class="mx-4"
                prepend-inner-icon="mdi-magnify"
              />
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click.stop="refillmember(item)"
              >
                mdi-safe
              </v-icon>
            </template>
            <template #no-data>
              <v-btn
                color="primary"
              >
                No data
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <FabButton icon-name="mdi-qrcode-scan" :right="false" @clicked="scanQR" />
          </v-col>
          <v-col cols="4">
            <FabButton icon-name="mdi-bullseye" :right="true" @clicked="viewOrders" />
          </v-col>
          <v-col cols="4">
            <FabButton :right="true" @clicked="newOrder" />
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
      search: '',
      pagination: {
        itemsPerPage: -1,
        sortBy: ['lastChangedAt']
      },
      headers: [
        {
          text: 'Catcher',
          value: 'name',
          align: 'center',
          sortable: true
        },
        {
          text: 'Clovers',
          value: 'availableClovers',
          align: 'center',
          sortable: true
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          align: 'center'
        }
      ],
      members: []
    }
  },
  computed: {
  },
  mounted () {
    if (this.$auth.$state.user.accessLevel === 'MEMBER') {
      this.$router.push(`/members/${this.$auth.$state.user._id}`)
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    scanQR () {
      this.$router.push('/scanner')
    },
    async fetchData () {
      const res = await this.$axios.get('/users').then((res) => { return res })
      this.members = []
      res.data.forEach((member) => {
        if (member.username !== this.$auth.$state.user.username) {
          const lastname = member.lastname == null ? '' : member.lastname
          member.name = member.firstname + ' ' + lastname
          this.members.push(member)
        }
      })
    },
    rowClick (rowData) {
      if (rowData.availableClovers <= 0) { this.$router.push(`/profile/${rowData._id}`) } else {
        this.$router.push(`/order/${rowData._id}`)
      }
    },
    refillmember (item) {
      this.$router.push(`/profile/${item._id}`)
    },
    registerNewMember () {
      this.$log.debug('Register new member')
      this.$router.push('/register-simple')
    },
    newOrder () {
      this.$router.push('/order')
    },
    viewOrders () {
      this.$router.push('/')
    }
  }
}
</script>
