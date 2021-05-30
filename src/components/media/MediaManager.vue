<template>
  <v-sheet class="media">
    <v-toolbar tag="div" flat class="media-toolbar primary" dark>
      <v-toolbar-title> {{ title }}</v-toolbar-title>
    </v-toolbar>
    <div class="media-main">
      <media-drawer class="media-main__drawer" />
      <section class="media-main__content">
        <div class="flex">
          <v-toolbar flat dense class="border-bottom">
            <v-breadcrumbs :items="path" />
            <v-spacer />
            <v-btn icon>
              <v-icon>mdi-view-grid</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-view-list</v-icon>
            </v-btn>
          </v-toolbar>
          <template v-if="viewMode === 'list'">
            <media-view-list ref="list" :data-source="dataSource" />
          </template>
          <template v-else> </template>
        </div>
      </section>
    </div>
  </v-sheet>
</template>

<script>
import MediaDrawer from './MediaDrawer.vue'
import MediaViewList from './MediaViewList.vue'
export default {
  components: {
    MediaDrawer,
    MediaViewList,
  },
  data() {
    return {
      title: 'Media Drive',
      viewMode: 'list',
      path: ['/'],
    }
  },
  computed: {
    dataSource() {
      return (q) => {
        return this.$store.dispatch('fetchMedia', q)
      }
    },
  },
  created() {
    this.$store.dispatch('fetchMediaType')
  },
  methods: {
    handleRefresh() {
      this.$refs.list.fetchRecords()
    },
  },
}
</script>

<style lang="sass" scoped>
.media
  .border-bottom: 1px solid #eee
  &-toolbar
    margin-right: 0
    margin-left: 0
  &-main
    display: flex
    &__drawer
      border-right: 1px solid #eee
      min-height: 600px
    &__content
      display: flex
      flex-grow: 1
      &__toolbar
</style>
