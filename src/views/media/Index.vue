<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <media-manager show-header />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MediaManager from '@/components/media/MediaManager'
export default {
  components: {
    MediaManager,
  },
}
</script>

<style></style>
