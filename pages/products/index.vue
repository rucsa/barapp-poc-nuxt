<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex justify-center">
        Products
      </v-card-title>
      <v-card-text>
        <StorageTable :headers="productHeaders" :items="products" @edit="editProduct" />
      </v-card-text>
    </v-card>
    <FabButton v-if="$auth.state.user.accessLevel === 'ADMIN'" :right="true" @clicked="addProduct" />
  </v-container>
</template>
<script>
import midlayout from '@/middleware/layout.js'

export default {
  layout: midlayout,
  middleware: 'access',
  data () {
    return {
      loading: false,
      tab: null,
      products: [],
      productHeaders: [
        {
          text: 'Name',
          value: 'denumire',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Portions',
          value: 'currentQty',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Clovers',
          value: 'clovers',
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
    this.fetchProducts()
    if (this.$auth.state.user.accessLevel === 'STAFF' || this.$auth.state.user.accessLevel === 'SERGEANT') {
      this.productHeaders.splice(-1)
    }
  },
  methods: {
    async fetchProducts () {
      this.products = await this.$axios.get('/products').then((res) => {
        return res.data
      })
    },
    addProduct () {
      this.$router.push('/products/crud')
    },
    editProduct (item) {
      this.$router.push(`/products/crud/${item._id}`)
    }
  }
}
</script>
