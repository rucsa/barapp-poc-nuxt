<template>
  <v-container fluid>
    <v-card>
      <v-card-text><v-row><v-col><v-text-field v-model="email" label="email" /></v-col></v-row></v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn icon color="secondary" @click="resetPassword">
          <v-icon>mdi-bird</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      email: null
    }
  },
  methods: {
    resetPassword () {}
  }
}
</script>
