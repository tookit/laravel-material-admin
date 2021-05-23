<template>
  <v-sheet class="overview">
    <image-picker v-model="avatar" class="overview-avatar" />
    <div class="overview-info">
      <v-list two-line class="pa-0">
        <v-list-item href="#">
          <v-list-item-content>
            <v-list-item-title>Michael Wang</v-list-item-title>
            <v-list-item-subtitle>admin</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-sheet>
</template>

<script>
import ImagePicker from '@/components/image/ImagePicker'

export default {
  components: {
    ImagePicker,
  },
  data() {
    return {
      avatar: 'https://avatars.githubusercontent.com/u/149564?s=60&v=4',
    }
  },
}
</script>

<style lang="sass" scoped>
.overview
  padding: 25px
  display: flex
  &-avatar
    display: flex
    margin-right: 25px
  &-info
    display: flex
    flex: 1 1 auto
</style>
