<template>
  <v-card outlined min-width="300" class="d-flex justify-center mt-3">
    <v-list>
      <v-list-item v-for="event in eventList" :key="event.name">
        <v-card outlined width="200" :to="`/event/${20}`">
          <v-card-text>
            <v-row>
              <v-col cols="4">
                Some event image
              </v-col>
              <v-col cols="8">
                <p>{{ event.name }} - <span>{{ event.date }}</span></p>
                <p>{{ event.desc }}</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  layout: 'member',
  data () {
    return {
      eventList: [
        {
          name: 'TripWaves',
          img: 'image_me',
          date: Date.now().toLocaleString(),
          desc: 'Ajxsc'
        },
        {
          name: 'TripRoom',
          img: 'image_me',
          date: '06-03-2022',
          desc: 'Ajxsc'
        }
      ]
    }
  }
}</script>
