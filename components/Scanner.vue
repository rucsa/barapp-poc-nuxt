<template>
  <v-container fluid class="d-flex justify-center">
    <v-card outlined max-width="300" min-height="300">
      <qrcode-stream :key="_uid" :track="paintOutline" @init="onInit">
        <div v-if="loading" class="loading-indicator">
          <div class="d-flex justify-center align-center pt-16">
            <v-progress-circular class="ma-16" indeterminate size="32" />
          </div>
        </div>
      </qrcode-stream>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onInit (promise) {
      this.loading = true
      try {
        await promise
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    paintOutline (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints
        ctx.strokeStyle = 'red'
        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }

      const userStatus = JSON.parse(detectedCodes[0].rawValue)
      this.$emit('onscan', userStatus)
    },
    logErrors (promise) {
      promise.catch(console.error)
    }
  }
}
</script>
<style scoped>
.loading-indicator {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
}
</style>
