<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <v-card tile :loading="loading">
          <v-tabs v-model="defaultTab" class="border-bottom">
            <v-tab v-for="tab in tabs" :key="tab.value" :href="'#' + tab.value">
              {{ tab.text }}
            </v-tab>
            <v-spacer />
            <v-btn icon>
              <v-icon tag="a" @click="fetchProfile()">mdi-refresh</v-icon>
            </v-btn>
          </v-tabs>
          <v-tabs-items v-model="defaultTab">
            <template v-for="tab in tabs">
              <v-tab-item :key="tab.value" :value="tab.value">
                <component :is="tab.element" v-bind="tab.bind" />
              </v-tab-item>
            </template>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormProfile from './FormProfile'
export default {
  components: {
    FormProfile,
  },
  data() {
    return {
      defaultTab: 'profile',
      profile: null,
      loading: false,
    }
  },
  computed: {
    tabs() {
      return [
        {
          text: 'Profile',
          value: 'profile',
          element: FormProfile,
          bind: {
            showHeader: true,
            item: this.profile,
          },
        },
      ]
    },
  },
  created() {
    this.fetchProfile()
  },
  methods: {
    fetchProfile() {
      this.loading = true
      this.$store
        .dispatch('fetchProfile')
        .then((resp) => {
          this.loading = false
          this.profile = resp.data
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style></style>
