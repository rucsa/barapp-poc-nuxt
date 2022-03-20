<template>
  <v-card color="white">
    <v-card-text class="d-flex justify-center font-weight-bold text-h6 black--text pa-4">
      {{ text }}
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn @click="cancelButtonPressed">
        Cancel
      </v-btn>
      <v-btn color="secondary" @click="agreeButtonPressed">
        Yes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    cancelButtonPressed () {
      this.$emit('cancel')
    },
    agreeButtonPressed () {
      this.$emit('confirm')
    }
  }
}
</script>
