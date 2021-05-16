import { mapGetters } from 'vuex'
import FormPermission from './FormPermission'
import { VAutocomplete, VChip, VIcon } from 'vuetify/lib'
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
          value: 'name',
          sortable: true,
        },
        {
          text: 'Desc',
          value: 'description',
          sortable: true,
        },
        {
          text: 'Guard',
          value: 'guard_name',
          sortable: false,
        },
        {
          text: 'Resource',
          value: 'resource',
          sortable: false,
        },
        {
          text: 'Type',
          value: 'type',
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
          text: 'Edit Item',
          icon: 'mdi-pencil',
          click: this.handleEditItem,
          enable: (item) => item.type !== 'system',
        },
        {
          text: 'Delete Item',
          icon: 'mdi-delete',
          click: this.handleDeleteItem,
          enable: (item) => item.type !== 'system',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getUserFlags', 'getUserGenders', 'getPermissionTypes', 'getPermissionResources']),
    dataSource() {
      return (q) => {
        return this.$store.dispatch('fetchPermission', q)
      }
    },
    filterItems() {
      return [
        {
          element: VAutocomplete,
          cols: 4,
          props: {
            name: 'type',
            items: this.getPermissionTypes,
            itemText: 'text',
            itemValue: 'text',
          },
        },
        {
          element: VAutocomplete,
          cols: 4,
          props: {
            name: 'resource',
            items: this.getPermissionResources,
            itemText: 'text',
            itemValue: 'value',
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
        component: FormPermission,
        data: {
          item: null,
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
        this.$store.dispatch('deleteRole', item.id).then(() => {
          this.$refs.grid.fetchRecords()
        })
      }
    },
  },
  created() {
    this.$store.dispatch('fetchPermissionResources')
  },
}
