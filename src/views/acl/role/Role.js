import { mapGetters } from 'vuex'
import FormRole from './FormRole'
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
          text: 'Guard',
          value: 'guard_name',
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
        },
        {
          text: 'Delete Item',
          icon: 'mdi-delete',
          click: this.handleDeleteItem,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getUserFlags', 'getUserGenders']),
    dataSource() {
      return (q) => {
        return this.$store.dispatch('fetchRole', q)
      }
    },
    filterItems() {
      return []
    },
  },
  watch: {},
  methods: {
    handleCreateItem() {
      const dialog = this.$root.$dialog
      dialog.loadComponent({
        component: FormRole,
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
        component: FormRole,
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
}
