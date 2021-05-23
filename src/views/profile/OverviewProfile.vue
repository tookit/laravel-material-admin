<template>
  <v-card class="overview">
    <v-toolbar flat>
      <v-toolbar-title>Profile</v-toolbar-title>
      <v-spacer />
      <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
    </v-toolbar>
    <v-card-text>
      <image-picker v-model="model.avatar" class="overview-avatar" />
    </v-card-text>
    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script>
import ImagePicker from '@/components/image/ImagePicker'

export default {
  components: {
    ImagePicker,
  },
  props: {
    profile: Object,
  },
  data() {
    return {
      model: {},
    }
  },
  watch: {
    profile: {
      handler(val) {
        if (val) this.model = val
      },
      immediate: true,
    },
  },
}
</script>

<style lang="sass" scoped>
.overview
  &-avatar
    display: flex
    margin-right: 25px
  &-info
    display: flex
</style>
