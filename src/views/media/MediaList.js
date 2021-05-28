import { mapGetters } from 'vuex'
import { VAutocomplete } from 'vuetify/lib'
import FormUpload from '@/components/form/FormUpload'
export default {
  data() {
    return {
      headers: [
        {
          text: 'id',
          value: 'id',
          sortable: true,
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
        // {
        //   text: 'Edit Item',
        //   icon: 'mdi-pencil',
        //   click: this.handleEditItem,
        //   enable: (item) => item.type !== 'system',
        // },
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
  },
  created() {
    this.$store.dispatch('fetchPermissionResources')
  },
}
