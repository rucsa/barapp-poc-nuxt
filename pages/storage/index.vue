<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex justify-center">
        Storage
      </v-card-title>
      <v-card-text>
        <StorageTable :headers="storageHeaders" :items="storageItems" @edit="editStorage" />
      </v-card-text>
    </v-card>
    <FabButton :right="true" @clicked="addItem" />
  </v-container>
</template>
<script>
import midlayout from '@/middleware/layout.js'

export default {
  layout: midlayout,

  data () {
    return {
      loading: false,
      tab: null,
      products: [],
      storageItems: [],
      storageHeaders: [
        {
          text: 'Name',
          value: 'denumire',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Quantity',
          value: 'qty',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Actions', value: 'actions', sortable: false, align: 'center'
        }
      ]
    }
  },
  created () {
    this.fetchStorageItems()
    if (this.$auth.state.user.accessLevel === 'STAFF' || this.$auth.state.user.accessLevel === 'SERGEANT') {
      this.storageHeaders.splice(-1)
    }
  },
  methods: {
    async fetchStorageItems () {
      this.storageItems = await this.$axios.get('/storage/all').then((res) => {
        return res.data
      })
    },
    editStorage (item) {
      this.$router.push(`/storage/item/crud/${item._id}`)
    },
    addItem () {
      this.$router.push('/storage/item/crud')
    }
  }
}
</script>
