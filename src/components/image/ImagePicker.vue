<template>
  <div>
    <template v-if="!value">
      <div class="image-holder">
        <v-icon size="24" @click="showDialog = true">mdi-plus</v-icon>
      </div>
    </template>
    <template v-else>
      <div class="image-holder">
        <v-hover v-slot="{ hover }">
          <v-img height="128" width="128" :src="value">
            <div v-if="hover" class="image-remove primary" style="height: 100%">
              <v-icon color="white" class="mr-1">mdi-eye</v-icon>
              <v-icon color="white" @click="handleDetachMedia">mdi-close</v-icon>
            </div>
          </v-img>
        </v-hover>
      </div>
    </template>
    <v-dialog v-model="showDialog">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Media Manager</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn v-show="selectedItems.length > 0" icon @click="handleApplyMedia(selectedItems)">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn icon @click="showDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-0">
          <media-manager v-model="selectedItems" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import MediaManager from '@/components/media/MediaManager'

export default {
  components: {
    MediaManager,
  },
  props: {
    value: String,
  },
  data() {
    return {
      selectedItems: [],
      showDialog: false,
    }
  },
  computed: {},
  methods: {
    handleApplyMedia(items) {
      const media = items[0]
      this.$emit('input', media.url)
      this.showDialog = false
    },
    handleDetachMedia() {
      this.$emit('input', null)
    },
  },
}
</script>

<style lang="scss">
.image-holder {
  display: flex;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  height: 128px;
  width: 128px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.image-remove {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
