<template>
  <v-container fluid class="d-flex justify-center">
    <v-card max-width="600" min-width="300">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="email" prepend-inner-icon="mdi-email-outline" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <!-- <v-btn icon color="secondary" @click="resetPassword">
          <v-icon>mdi-bird</v-icon>
        </v-btn> -->
        <v-btn plain :ripple="false" @click="resetPassword">
          <p class="pl-4 text-caption grey--text">
            Reset my password <span><v-icon color="secondary">
              mdi-bird
            </v-icon></span>
          </p>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import midlayout from '@/middleware/layout.js'

export default {
  layout: midlayout,
  auth: false,
  data () {
    return {
      email: null
    }
  },
  methods: {
    resetPassword () {
      this.$log.info('Change pwd functionatity todo')
    }
  }
}
</script>
