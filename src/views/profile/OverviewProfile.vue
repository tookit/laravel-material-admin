<template>
  <v-sheet class="overview">
    <image-picker v-model="model.avatar" class="overview-avatar" />
    <div class="overview-info">
      <v-list two-line class="overview-info__list pa-0">
        <v-list-item href="#">
          <v-list-item-content class="pt-0">
            <v-list-item-title> {{ model.username }} </v-list-item-title>
            <v-list-item-subtitle>Username</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="#">
          <v-list-item-content>
            <v-list-item-title>{{ model.gender }}</v-list-item-title>
            <v-list-item-subtitle>Gender</v-list-item-subtitle>
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
  padding: 25px
  display: flex
  &-avatar
    display: flex
    margin-right: 25px
  &-info
    display: flex
    flex: 1 1 auto
</style>
