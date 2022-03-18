<template>
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
</template>
<script>
export default {
  data () {
    return {
      search: '',
      pagination: {
        itemsPerPage: -1,
        sortBy: ['lastChangedAt']
      },
      headers: [
        {
          text: 'Cathcer',
          value: 'name'
        },
        {
          text: 'Clovers',
          value: 'availableClovers'
        },
        {
          text: 'Actions', value: 'actions', sortable: false
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
      return this.member.lastname != null ? `${this.member.firstname} ${this.member.lastname}` : `${this.member.firstname}`
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const res = await this.$axios.get('/users').then((res) => { return res })
      this.members = []
      res.data.forEach((member) => {
        const lastname = member.lastname == null ? '' : member.lastname
        member.name = member.firstname + ' ' + lastname
        this.members.push(member)
      })
    },
    rowClick (rowData) {
      this.$router.push(`/order/${rowData._id}`)
    },
    refillmember (item) {
      this.$router.push(`/profile/${item._id}`)
    }
  }
}
</script>
