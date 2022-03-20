<template>
  <v-card elevation="0">
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :mobile-breakpoint="0"
        hide-default-footer
        :options.sync="pagination"
        item-key="_id"
        :search="search"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.actions="{ item }">
          <div class="d-flex justify-center">
            <v-icon
              small
              class="mr-2"
              @click.stop="editProduct(item)"
            >
              mdi-pencil
            </v-icon>
          </div>
        </template>
        <template #no-data>
          Missing data
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => {}
    },
    items: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      search: '',
      pagination: {
        itemsPerPage: -1,
        sortBy: ['denumire']
      }
    }
  },
  methods: {
    editProduct (item) {
      this.$emit('edit', item)
    }
  }
}
</script>
