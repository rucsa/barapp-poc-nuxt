<template>
  <div />
</template>

<script>
export default {
  layout: 'member',
  created () {
    this.$log.info('Logging out')
    this.$auth.logout()
    try {
      this.$router.push('/')
    } catch (ex) {
      this.$log.error(ex)
    }
  }
}
</script>
