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
  />
</template>

<script>
import PageList from '@/components/page/PageList'
import { VAutocomplete, VImg } from 'vuetify/lib'
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
          text: 'id',
          value: 'id',
          sortable: true,
        },
        {
          text: 'filename',
          value: 'basename',
          sortable: false,
          render: (item) => {
            return this.$createElement(VImg, {
              class: 'ma-2',
              props: {
                small: true,
                src: item.url,
                height: 50,
                width: 50,
              },
              on: {
                click: () => {
                  this.handleImageClick(item)
                },
              },
            })
          },
        },
        {
          text: 'name',
          value: 'basename',
          sortable: true,
        },
        {
          text: 'Disk',
          value: 'disk',
          sortable: true,
        },
        {
          text: 'Type',
          value: 'aggregate_type',
          sortable: false,
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
    ...mapGetters(['getMediaType']),
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
