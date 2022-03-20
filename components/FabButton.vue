<template>
  <v-fab-transition>
    <v-btn
      color="secondary"
      fab
      dark
      fixed
      bottom
      :right="right"
      :style="'bottom: 40px;'"
      @click="buttonClicked"
    >
      <v-icon>{{ iconName }}</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script>
export default {
  props: {
    right: {
      type: Boolean,
      default: true
    },
    iconName: {
      type: String,
      default: 'mdi-plus'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    buttonClicked () {
      this.$emit('clicked')
    }
  }
}
</script>
<style scoped>
.v-btn {

}
</style>
