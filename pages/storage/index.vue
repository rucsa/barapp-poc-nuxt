<template>
  <v-container fluid>
    <v-tabs v-model="tab" fixed-tabs dark>
      <v-tab> Products </v-tab>
      <v-tab> Storage </v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <StorageTable :headers="productHeaders" :items="products" @edit="editProduct" />
        </v-tab-item>
        <v-tab-item>
          <StorageTable :headers="storageHeaders" :items="storageItems" @edit="editStorage" />
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
    <FabButton v-if="tab === 0" :right="true" @clicked="addProduct" />
    <FabButton v-if="tab === 1" :right="true" @clicked="addItem" />
  </v-container>
</template>
<script>
export default {
  data () {
    return {

      loading: false,
      tab: null,
      products: [],
      storageItems: [],
      storageHeaders: [
        {
          text: 'Nume',
          value: 'denumire',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Cantitate',
          value: 'qty',
          sortable: false,
          align: 'center'
        },
        {
          text: 'Actions', value: 'actions', sortable: false
        }
      ],
      productHeaders: [
        {
          text: 'Nume',
          value: 'denumire',
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
    this.fetchStorageItems()
  },
  methods: {
    async fetchProducts () {
      this.products = await this.$axios.get('/products').then((res) => {
        return res.data
      })
    },
    async fetchStorageItems () {
      this.storageItems = await this.$axios.get('/storage/all').then((res) => {
        return res.data
      })
    },
    addProduct () {
      this.$router.push('/storage/product/crud')
    },
    editProduct (item) {
      this.$router.push(`/storage/product/crud/${item._id}`)
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
