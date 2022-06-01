<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-btn
        icon
        color="secondary"
        @click.stop="backButtonPressed"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="homeButtonPressed"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title>
        <v-btn plain to="/" class="mt-4 pt-1" :ripple="false">
          <p class="text-h6">
            {{ title }}
          </p>
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-menu v-model="settingsDialog" nudge-bottom="50">
        <template #activator="{ on, attrs }">
          <v-btn
            color="secondary"
            dark
            v-bind="attrs"
            icon
            x-large

            v-on="on"
            @click.stop="settingsDialog = !settingsDialog"
          >
            <v-icon>mdi-chart-bubble</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.to"
          >
            <v-list-item-title class="px-2">
              <span class="px-2"><v-icon>{{ item.icon }}</v-icon></span>{{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <notifications
          group="success"
          position="top right"
        >
          <template slot="body" slot-scope="props">
            <v-card
              :rounded="false"
              elevation="4"
              color="green"
              class="mt-1 d-flex justify-center"
              width="310"
              height="50"
            >
              <p class="text-subtitle-2 px-2 pt-1 font-weight-bold">
                <span><v-icon class="ma-2 pb-1">mdi-check-circle-outline</v-icon></span>{{ props.item.text }}
              </p>
            </v-card>
          <!-- eslint-disable-next-line vue/html-self-closing
            <NotificationWidget :data="props"></NotificationWidget> -->
          </template>
        </notifications>
        <notifications
          group="error"
          position="top right"
        >
          <template slot="body" slot-scope="props">
            <v-card
              :rounded="false"
              elevation="4"
              color="red"
              class="mt-1 d-flex justify-center"
              width="310"
              height="50"
            >
              <p class="text-subtitle-2 px-2 pt-1 font-weight-bold">
                <span><v-icon class="ma-2 pb-1">mdi-close-circle-outline</v-icon></span>{{ props.item.text }}
              </p>
            </v-card>
          <!-- eslint-disable-next-line vue/html-self-closing
            <NotificationWidget :data="props"></NotificationWidget> -->
          </template>
        </notifications>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      height="100"
      :absolute="false"
      app
      class="d-flex align-end justify-center"
    >
      <!-- <div>
        <span>&copy; {{ new Date().getFullYear() }}  Devix Developments</span>
      </div> -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      settingsDialog: false,
      items: [
        {
          icon: 'mdi-account-group',
          title: 'Accounts',
          to: '/admin'
        },
        {
          icon: 'mdi-liquor',
          title: 'Box Status',
          to: '/products'
        },
        {
          icon: 'mdi-format-color-fill',
          title: 'Refills',
          to: '/refills'
        },
        {
          icon: 'mdi-account-cowboy-hat',
          title: 'Register Account',
          to: '/register'
        },
        {
          icon: 'mdi-alien-outline',
          title: 'Session',
          to: '/session'
        },
        {
          icon: 'mdi-list-status',
          title: 'Session Status',
          to: '/status'
        },
        {
          icon: 'mdi-database',
          title: 'Storage',
          to: '/storage'
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: '/logout'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'TripCatchers'
    }
  },
  created () {
    this.$store.dispatch('fetchSessionData')
  },
  methods: {
    homeButtonPressed () {
      this.$router.push('/')
    },
    backButtonPressed () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>

</style>
