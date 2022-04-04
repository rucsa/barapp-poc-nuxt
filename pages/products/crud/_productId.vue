<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-title> {{ itemId != null ? 'Edit Product' : 'Add Product' }}</v-card-title>
      <v-card-text>
        <v-form ref="form" class="mx-2" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="item.denumire" label="Product Name" :rules="titleRules" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="item.clovers" label="Cloveri" :rules="fullNumberRules" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="item.color" label="Button Color" :rules="metadataRules" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="item.textColor" label="Text Color" :rules="metadataRules" />
            </v-col>
          </v-row>
        </v-form>
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
        color: null,
        textColor: null,
        mix: []
      },
      titleRules: [
        v => !!v || 'Required!',
        v => /^[A-Za-z0-9\s_]*$/.test(v) || 'Only letters, digits and _ allowed!'
      ],
      metadataRules: [
        v => /^[A-Za-z0-9\s-]*$/.test(v) || 'Only letters, digits and - allowed!'
      ],
      fullNumberRules: [
        v => !!v || 'Required!',
        v => /^\d*$/.test(v) || 'Only digits allowed!'
      ]
    }
  },
  computed: {
    itemId () {
      return this.$route.path.split('/')[3]
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
      if (!this.$refs.form.validate()) { return }
      this.confirmSaveDialog = true
    },
    async saveConfirmed () {
      if (this.itemId) {
        this.$log.info(`Updating product ${this.item.denumire}`)
        const updated = await this.$axios.post(`/product/edit/${this.itemId}`, { itemData: this.item }).then((res) => { return res.data }).catch((err) => {
          this.$log.error(err)
          this.$notify({ group: 'error', text: 'Failed to update product' })
        })
        if (updated) {
          this.$notify({ group: 'success', text: 'Product updated' })
        }
      } else {
        this.$log.info(`Creating product ${this.item.denumire}`)
        const created = await this.$axios.post('/product/create', { itemData: this.item }).then((res) => { return res.data }).catch((err) => {
          this.$log.info('Caugth error')
          this.$notify({ group: 'error', text: 'Failed to update product' })
          this.$log.error(err)
        })
        if (created) {
          this.$notify({ group: 'success', text: `Created product ${created.denumire}` })
        }
      }
      this.confirmSaveDialog = false
      this.$router.push('/products')
    }
  }
}
</script>
