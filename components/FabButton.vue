<template>
  <v-btn
    color="secondary"
    fab
    dark
    fixed
    bottom
    :style="'bottom: 40px;'"
    @click="buttonClicked"
  >
    <v-icon>{{ iconName }}</v-icon>
  </v-btn>
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
    },
    center: {
      type: Boolean,
      default: true
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
