<template>
  <v-sheet class="media">
    <v-toolbar v-show="showHeader" tag="div" flat class="media-toolbar primary" dark>
      <v-toolbar-title> {{ title }}</v-toolbar-title>
    </v-toolbar>
    <div class="media-main">
      <media-drawer class="media-main__drawer" @type:change="handleTypeChange" />
      <section class="media-main__content">
        <div class="flex">
          <template v-if="viewMode === 'list'">
            <media-view-list ref="list" :data-source="dataSource" @input="(rows) => $emit('input', rows)" />
          </template>
          <template v-else>
            <media-view-card :data-source="dataSource" />
          </template>
        </div>
      </section>
    </div>
  </v-sheet>
</template>

<script>
import MediaDrawer from './MediaDrawer.vue'
import MediaViewCard from './MediaViewCard.vue'
import MediaViewList from './MediaViewList.vue'
export default {
  components: {
    MediaDrawer,
    MediaViewList,
    MediaViewCard,
  },
  props: {
    inDialog: Boolean,
    showHeader: Boolean,
    value: Array,
  },
  data() {
    return {
      title: 'Media Drive',
      viewMode: 'list',
      path: ['/'],
      selectedItems: [],
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
    handleTypeChange(type) {
      this.$router.push({
        path: this.$route.path,
        query: {
          aggregate_type: type,
          t: Date.now(),
        },
      })
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
      min-width: 228px
      border-right: 1px solid #eee
    &__content
      display: flex
      flex-grow: 1
      &__toolbar
</style>
