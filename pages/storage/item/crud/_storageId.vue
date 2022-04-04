<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-title>
        {{ itemId != null ? "Edit Storage Item" : "Create Storage Item" }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" class="mx-2" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="item.denumire"
                label="Item Name"
                :rules="titleRules"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="item.qty"
                label="Current number of units"
                :rules="numberRules"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="item.size"
                label="Ml. per Bottle"
                :rules="fullNumberRules"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="item.productCode"
                label="Internal Code"
                :disabled="itemId != null"
                :rules="itemId == null ? productCodeRules: []"
              />
            </v-col>
            <!-- <v-col cols="12">
            <v-text-field
              v-model="item.portion"
              label="Ml. per Portie Servire"
            />
          </v-col> -->
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <FabButton :right="true" icon-name="mdi-check" @clicked="addItem" />
    <v-dialog v-model="confirmSaveDialog">
      <ConfirmDialog
        :text="'Finished editing item?'"
        @cancel="confirmSaveDialog = false"
        @confirm="saveConfirmed"
      />
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
        size: null,
        qty: null,
        productCode: null
      },
      titleRules: [
        v => !!v || 'Required!',
        v =>
          /^[A-Za-z0-9\s]*\.?[A-Za-z0-9\s]*$/.test(v) || 'Only letters, digits and . allowed!'
      ],
      numberRules: [
        v => !!v || 'Required!',
        v => /^\d*\.?\d*$/.test(v) || 'Only digits and a single . allowed!'
      ],
      fullNumberRules: [
        v => !!v || 'Required!',
        v => /^\d*$/.test(v) || 'Only digits allowed!'
      ],
      productCodeRules: [v => v > 15 || 'Code already in use!']
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
      this.item = await this.$axios
        .get(`/storage/get/item/${this.itemId}`)
        .then((res) => {
          return res.data
        })
    },
    addItem () {
      if (!this.$refs.form.validate()) {
        return
      }
      this.confirmSaveDialog = true
    },
    async saveConfirmed () {
      if (this.itemId) {
        // update
        await this.$axios
          .post('/storage/update-item', { storageItem: this.item })
          .then((res) => {
            return res.data
          })
          .catch((error) => {
            this.$log.error(error)
          })
        this.$log.debug('Updated storage item')
      } else {
        // create
        this.$log.debug('Create storage item')
        await this.$axios
          .post('/storage/create-item', { storageItem: this.item })
          .then((res) => {
            return res.data
          })
          .catch((error) => {
            this.$log.error(error)
          })
      }
      this.confirmSaveDialog = false
      this.$router.push('/storage')
    }
  }
}
</script>
