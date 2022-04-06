<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-data-table
              :mobile-breakpoint="0"
              hide-default-footer
              :search="search"
              :headers="headers"
              :items="refills"
              item-key="_id"
              :options.sync="pagination"
              :sort-desc="true"
            >
              <template #top>
                <v-text-field
                  v-model="search"
                  label="Search"
                  class="mx-4"
                  prepend-inner-icon="mdi-magnify"
                />
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import midlayout from '@/middleware/layout.js'
export default {
  layout: midlayout,
  middleware: 'access',
  data () {
    return {
      search: '',
      pagination: {
        itemsPerPage: -1,
        sortBy: ['createdAt']
      },
      headers: [
        {
          text: 'Created At',
          value: 'createdAt',
          sortable: true,
          align: 'center'
        },
        {
          text: 'Created By',
          value: 'createdBy',
          align: 'center',
          sortable: true
        },
        {
          text: 'Clovers Added',
          value: 'refillWith',
          align: 'center',
          sortable: true
        },
        {
          text: 'Beneficiary',
          value: 'beneficiaryName',
          align: 'center',
          sortable: true
        },
        {
          text: 'Clovers Total',
          value: 'totalClovers',
          sortable: true,
          align: 'center'
        },
        {
          text: 'Method',
          value: 'donationMethod',
          sortable: true,
          align: 'center'
        }

      ],
      refills: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const res = await this.$axios.get('/refills').then((res) => { return res })
      this.refills = []
      res.data.forEach((ref) => {
        const newRef = ref
        const data = ref.createdAt.split('T')[0].split('-')
        const time = ref.createdAt.split('T')[1].split('.')[0]
        newRef.createdAt = `${data[2]}/${data[1]} ${time}`
        this.refills.push(newRef)
      })
      // this.refills = res.data
    }
  }
}
</script>
