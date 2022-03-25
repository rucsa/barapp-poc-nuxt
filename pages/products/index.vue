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

  data () {
    return {
      loading: false,
      tab: null,
      products: [],
      productHeaders: [
        {
          text: 'Nume',
          value: 'denumire',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Cantitate',
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
          text: 'Actions', value: 'actions', sortable: false
        }
      ]
    }
  },
  created () {
    this.fetchProducts()
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
