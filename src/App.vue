<template>
  <v-app dark>
    <router-view></router-view>
    <!-- theme setting -->
    <v-btn small fab dark fixed top="top" right="right" class="setting-fab" color="red" @click="openThemeSettings">
      <v-icon>mdi-silverware-variant</v-icon>
    </v-btn>
    <!-- <v-btn small fab dark fixed top="top" right="right" class="chat-fab" color="primary" @click="showDebugPanel">
      <v-icon>mdi-bug</v-icon>
    </v-btn> -->
    <!-- setting drawer -->
    <v-navigation-drawer v-model="rightDrawer" class="setting-drawer" temporary right hide-overlay fixed>
      <template v-if="showSetting">
        <theme-settings />
      </template>
    </v-navigation-drawer>
    <!-- global snackbar -->
    <v-snackbar v-model="snackbar.show" :timeout="3000" app top centered :color="snackbar.color">
      {{ snackbar.text }}
      <template #action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="$store.commit('HIDE_SNACKBAR')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- global dialog -->
    <global-dialog ref="dialog" />
  </v-app>
</template>

<script>
import ThemeSettings from '@/components/ThemeSettings'
import { mapGetters } from 'vuex'
import GlobalDialog from './components/dialog/GlobalDialog.vue'
export default {
  components: {
    ThemeSettings,
    GlobalDialog,
  },
  data() {
    return {
      rightDrawer: false,
      showSetting: true,
    }
  },
  computed: {
    ...mapGetters(['getSnackbar']),
    snackbar: {
      get() {
        return this.getSnackbar
      },
      set(val) {
        this.$store.commit('UPDATE_SNACKBAR', val)
      },
    },
  },
  mounted() {
    if (typeof window !== undefined && window._VMA === undefined) {
      window._VMA = this
    }
    this.$root.$dialog = this.$refs.dialog
  },
  created() {
    this.$on('AUTH_FAILED', () => {
      this.$store.commit('SHOW_SNACKBAR', { color: 'error', text: 'Auth Failed' })
      this.$router.push({
        path: '/auth/login',
        query: { redirect: this.$route.path },
      })
    })
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0)
      this.showSetting = true
      this.rightDrawer = !this.rightDrawer
    },
    openOnlineUser() {
      this.$vuetify.goTo(0)
      this.showSetting = false
      this.rightDrawer = !this.rightDrawer
    },
  },
}
</script>

<style lang="sass" scoped>
.setting-fab
  top: 50% !important
  right: 0
  border-radius: 0
.chat-fab
  top: calc(50% + 40px) !important
  right: 0
  border-radius: 0
</style>
