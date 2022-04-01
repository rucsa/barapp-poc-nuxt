<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-title>Tabs</v-card-title>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :mobile-breakpoint="0"
            hide-default-footer
            :headers="headers"
            :items="members"
            item-key="id"
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
              <v-icon small class="mr-2" @click.stop="refillmember(item)">
                mdi-safe
              </v-icon>
            </template>
            <template #no-data>
              <v-btn color="primary">
                No data
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <FabButton
      icon-name="mdi-account-plus"
      :right="false"
      @clicked="registerNewMember"
    />
    <FabButton :right="true" @clicked="newOrder" />
  </v-container>
</template>
<script>
import FabButton from './../../components/FabButton.vue'
import midlayout from '@/middleware/layout.js'

export default {
  components: { FabButton },
  layout: midlayout,
  data () {
    return {
      search: '',
      pagination: {
        itemsPerPage: -1,
        sortBy: ['lastChangedAt']
      },
      headers: [
        {
          text: 'Username',
          value: 'username',
          align: 'center',
          sortable: true
        },
        {
          text: 'Full Name',
          value: 'name',
          align: 'center',
          sortable: true
        },
        {
          text: 'Access',
          value: 'accessLevel',
          align: 'center',
          sortable: true
        },
        {
          text: 'Ticket',
          value: 'payedTicketThisSession',
          align: 'center',
          sortable: true
        },
        {
          text: 'Clovers',
          value: 'availableClovers',
          align: 'center',
          sortable: true
        }
      ],
      members: []
    }
  },
  computed: {
    memberId () {
      return this.$route.path.split('/')[2]
    },
    memberName () {
      return this.member.lastname != null
        ? `${this.member.firstname} ${this.member.lastname}`
        : `${this.member.firstname}`
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const res = await this.$axios.get('/users').then((res) => {
        return res
      })
      this.members = []
      res.data.forEach((member) => {
        const lastname = member.lastname == null ? '' : member.lastname
        member.name = member.firstname + ' ' + lastname
        this.members.push(member)
      })
    },
    rowClick (rowData) {
      if (rowData.availableClovers <= 0 || this.$route.path === '/admin') {
        this.$router.push(`/profile/${rowData._id}`)
      } else {
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
    }
  }
}
</script>
