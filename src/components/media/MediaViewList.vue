<template>
  <page-list
    ref="grid"
    :headers="headers"
    :filter-items="filterItems"
    :actions="actions"
    :data-source="dataSource"
    search-field="name"
    @create="handleCreateItem"
    @input="(rows) => $emit('input', rows)"
  >
    <template #[`item.id`]="{ item }">
      <template v-if="item.aggregate_type === 'image'">
        <v-img class="ma-2" :src="item.url" height="50" width="50" /> 
      </template>
      <template v-else>
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="getIconByExt(item.extension)"></use>
        </svg>
      </template>
    </template>
  </page-list>
</template>

<script>
import PageList from '@/components/page/PageList'
import { VAutocomplete } from 'vuetify/lib'
import FormUpload from '@/components/form/FormUpload'
import { mapGetters } from 'vuex'
export default {
  components: {
    PageList,
  },
  props: {
    value: {
      type: Array,
    },
  },
  data() {
    return {
      headers: [
        {
          text: '',
          value: 'id',
        },
        {
          text: 'filename',
          value: 'basename',
          sortable: true,
        },
        {
          text: 'Disk',
          value: 'disk',
          sortable: true,
        },
        {
          text: 'Size',
          value: 'size',
          sortable: false,
        },
        {
          text: 'Created',
          value: 'created_at',
          sortable: true,
        },
        {
          text: 'Action',
          value: 'action',
          sortable: false,
        },
      ],
      actions: [
        {
          text: 'Delete Item',
          icon: 'mdi-delete',
          click: this.handleDeleteItem,
          enable: (item) => item.type !== 'system',
        },
      ],
      batchActions: [],
    }
  },
  computed: {
    ...mapGetters(['getMediaType', 'getIconByExt']),
    dataSource() {
      return (q) => {
        return this.$store.dispatch('fetchMedia', q)
      }
    },
    filterItems() {
      return [
        {
          element: VAutocomplete,
          cols: 4,
          props: {
            name: 'aggregate_type',
            items: this.getMediaType,
          },
        },
      ]
    },
  },
  watch: {},
  methods: {
    handleCreateItem() {
      const dialog = this.$root.$dialog
      dialog.loadComponent({
        component: FormUpload,
        data: {
          uploadUrl: '/media',
        },
        on: {
          'form:cancel': () => {
            dialog.hide()
          },
          'form:success': () => {
            this.$refs.grid.fetchRecords()
            dialog.hide()
          },
        },
      })
      dialog.show()
    },
    handleEditItem(item) {
      const dialog = this.$root.$dialog
      dialog.loadComponent({
        component: FormPermission,
        data: {
          item: item,
        },
        on: {
          'form:cancel': () => {
            dialog.hide()
          },
          'form:success': () => {
            this.$refs.grid.fetchRecords()
            dialog.hide()
          },
        },
      })
      dialog.show()
    },
    handleDeleteItem(item) {
      if (window.confirm('Are you sure to delete this ?')) {
        this.$store.dispatch('deleteMedia', item.id).then(() => {
          this.$refs.grid.fetchRecords()
        })
      }
    },
    handleImageClick(item) {
      console.log(item)
    },
  },
}
</script>
<style lang="sass" scoped>
.icon
  width: 36px
  height: 36px
  vertical-align: -0.15em
  fill: currentColor
  overflow: hidden
</style>
