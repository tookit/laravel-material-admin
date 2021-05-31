<template>
  <v-navigation-drawer floating permanent>
    <v-list class="media-list pa-0">
      <v-subheader>Type</v-subheader>
      <v-list-item-group v-model="type">
        <template v-for="item in items">
          <v-list-item :key="item.text" :value="item.value">
            <v-list-item-icon v-if="item.icon">
              <svg class="c-icon" aria-hidden="true">
                <use :xlink:href="getIconByExt(item.icon)"></use>
              </svg>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      type: 'image',
      items: [
        {
          title: this.$t('image'),
          icon: 'jpg',
          value: 'image',
        },
        {
          title: this.$t('video'),
          icon: 'video',
          value: 'video',
        },

        {
          title: this.$t('document'),
          icon: 'doc',
          value: 'document',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getIconByExt']),
  },
  watch: {
    type: {
      handler(val) {
        if (val) {
          this.$emit('type:change', val)
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="sass" scoped>
.c-icon
  width: 36px
  height: 36px
  vertical-align: -0.15em
  fill: currentColor
  overflow: hidden
</style>
