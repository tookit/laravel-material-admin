<template>
  <v-container>
    <v-row>
      <v-col>
        <overview />
      </v-col>
      <v-col :cols="12">
        <v-card tile>
          <v-tabs v-model="defaultTab" class="border-bottom">
            <v-tab v-for="tab in tabs" :key="tab.value" :href="'#' + tab.value">
              {{ tab.text }}
            </v-tab>
            <v-spacer />
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
import { mapGetters } from 'vuex'
import Overview from './Overview'
import FormProfile from './FormProfile'
export default {
  components: {
    Overview,
    FormProfile,
  },
  data() {
    return {
      defaultTab: 'overview',
    }
  },
  computed: {
    tabs() {
      return [
        {
          text: 'Overview',
          value: 'overview',
          element: FormProfile,
          bind: {
            id: this.id,
            showHeader: true,
          },
        },
      ]
    },
  },
}
</script>

<style></style>
