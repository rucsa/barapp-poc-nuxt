<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-title> {{ itemId != null ? 'Edit Product' : 'Add Product' }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="item.denumire" label="Denumire" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="item.clovers" label="Cloveri" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <FabButton :right="true" icon-name="mdi-check" @clicked="addItem" />
    <v-dialog v-model="confirmSaveDialog">
      <ConfirmDialog :text="'Finished editing item?'" @cancel="confirmSaveDialog = false" @confirm="saveConfirmed" />
    </v-dialog>
  </v-container>
</template>
<script>

import midlayout from '@/middleware/layout.js'

export default {
  layout: midlayout,
  data () {
    return {
      confirmSaveDialog: false,
      item: {
        _id: null,
        denumire: null,
        clovers: null,
        mix: []
      }
    }
  },
  computed: {
    itemId () {
      return this.$route.path.split('/')[4]
    }
  },
  created () {
    if (this.itemId) {
      this.fetchItemData()
    }
  },
  methods: {
    async fetchItemData () {
      this.item = await this.$axios.get(`/product/get/${this.itemId}`).then((res) => { return res.data })
    },
    addItem () {
      this.confirmSaveDialog = true
    },
    saveConfirmed () {
      if (this.itemId) {
        // update
      } else {
        // create
      }
      this.confirmSaveDialog = false
      this.$router.push('/products')
    }
  }
}
</script>
