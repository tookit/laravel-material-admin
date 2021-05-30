<template>
  <div class="media_view__card">
    <v-container>
      <v-row>
        <template v-for="item in items">
          <v-col :key="item.basename" :cols="3">
            <v-card tile @click="handleSelectItem(item)">
              <template v-if="item.aggregate_type === 'image' && item.extension === 'png'">
                <v-img :src="item.url" height="150px"> </v-img>
              </template>
              <template v-else>
                <v-img height="150px">
                  <svg class="icon icon-64 center-align" aria-hidden="true">
                    <use :xlink:href="getIconByExt(item.extension)"></use>
                  </svg>
                </v-img>
              </template>
              <v-divider></v-divider>
              <v-card-actions class="pa-0">
                <v-list tile two-line class="flex pa-0">
                  <v-list-item class="">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.basename" />
                      <v-list-item-subtitle>
                        {{ item.type == 'file' ? computeSize(item.size) : '' }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-menu>
                        <template #activator="{ on: menu }">
                          <v-tooltip bottom>
                            <template #activator="{ on: tooltip }">
                              <v-btn icon v-on="onTooltip({ ...tooltip, ...menu })">
                                <v-icon>mdi-dots-vertical</v-icon>
                              </v-btn>
                            </template>
                            <span>Action</span>
                          </v-tooltip>
                        </template>
                        <v-list class="pa-0" dense>
                          <v-list-item v-for="action in actions" :key="action.text" @click.stop="action.click(item)">
                            <v-list-item-icon class="mr-2">
                              <v-icon small>{{ action.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ action.text }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card-actions>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TooltipMixin from '@/mixins/Tooltip'
import { mapGetters } from 'vuex'
export default {
  mixins: [TooltipMixin],
  props: {
    dataSource: {
      type: [Function, Array],
    },
  },
  data() {
    return {
      selectedItem: null,
      loadingItems: false,
      items: [],
      serverItemsLength: 100,
      icons: {
        txt: 'mdi-format-text',
        json: 'mdi-code-json',
        html: 'mdi-language-html5',
        png: 'mdi-image',
        svg: 'mdi-svg',
      },
      actions: [
        {
          text: 'Share',
          icon: 'mdi-heart',
          click: this.$emit('file:share'),
        },
        {
          text: 'Download',
          icon: 'mdi-download',
          click: this.$emit('file:download'),
        },
        {
          text: 'Delete',
          icon: 'mdi-delete',
          click: this.$emit('file:delete'),
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getIconByExt'])
  },
  created() {
    this.fetchRecords()
  },
  methods: {
    fetchRecords() {
      const params = {}
      this.loadingItems = true
      this.items = []
      this.dataSource
        .call(this, params)
        .then(({ data, meta }) => {
          this.items = data
          this.serverItemsLength = meta.total
          this.loadingItems = false
        })
        .catch(() => {
          this.loadingItems = false
        })
    },
    handleSelectItem() {},
    computeIcon(item) {
      return item.type === 'dir' ? 'mdi-folder' : this.computeFileIcon(item)
    },
    computeFileIcon(item) {
      return this.icons[item.extension] ?? 'mdi-file'
    },
  },
}
</script>

<style lang="sass" scoped>
.media_view__card
  display: flex
  .align-center
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>
