<template>
  <v-sheet class="media">
    <v-toolbar tag="div" flat class="media-toolbar primary" dark>
      <v-toolbar-title> {{ title }}</v-toolbar-title>
    </v-toolbar>
    <div class="media-content">
      <media-drawer class="media-drawer" />
      <section class="media-content flex">
        <v-toolbar flat dense class="media-content__toolbar">
          <v-breadcrumbs :items="path" />
          <v-spacer />
          <v-btn icon>
            <v-icon>mdi-view-grid</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-view-list</v-icon>
          </v-btn>
        </v-toolbar>
        <template v-if="viewMode === 'list'"> </template>
        <template v-else> </template>
      </section>
    </div>
  </v-sheet>
</template>

<script>
import MediaDrawer from './MediaDrawer.vue'
export default {
  components: {
    MediaDrawer,
  },
  data() {
    return {
      title: 'Media Drive',
      viewMode: 'list',
      path: ['/'],
    }
  },
}
</script>

<style lang="sass" scoped>
.media
  &-toolbar
    border-bottom:  1px solid #eee
    margin-right: 0
    margin-left: 0
  &-drawer
    min-height: 500px
    border-right: 1px solid #eee
  &-content
    display: flex
    flex-grow: 1
    &__toolbar
      border-bottom:  1px solid #eee
</style>
