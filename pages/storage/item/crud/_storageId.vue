<template>
  <v-container fluid>
    <v-card outlined>
      <v-card-title> {{ itemId != null ? 'Edit Storage Item' : 'Create Storage Item' }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="item.denumire" label="Denumire" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="item.size" label="Ml. per Sticla" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="item.portion" label="Ml. per Portie Servire" />
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
export default {
  data () {
    return {
      confirmSaveDialog: false,
      item: {
        denumire: null,
        size: null,
        portion: null
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
      this.item = await this.$axios.get(`/storage/get/item/${this.itemId}`).then((res) => { return res.data })
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
      this.$router.push('/storage')
    }
  }
}
</script>
