import { VAutocomplete } from 'vuetify/lib'
import { mapGetters } from 'vuex'
import FormProject from './FormProject'
export default {
  data() {
    return {
      headers: [
        {
          text: 'id',
          value: 'id',
        },
        {
          text: 'name',
          value: 'name',
        },
        {
          text: 'owner',
          value: 'owner',
        },
        {
          text: 'status',
          value: 'status',
          width: 120,
          render: (item) => {
            return this.$createElement(VAutocomplete, {
              props: {
                items: this.getProjectStatus,
                value: item.status,
              },
              on: {
                change: (val) => {
                  this.handleUpdateField('status', val, item)
                },
              },
            })
          },
          sortable: true,
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
      batchActions: [
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
    ...mapGetters(['getProjectStatus']),
    dataSource() {
      return (q) => {
        return this.$store.dispatch('fetchProject', q)
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
        component: FormProject,
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
        component: FormProject,
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
        this.$store.dispatch('deletePostCategory', item.id).then(() => {
          this.$refs.grid.fetchRecords()
        })
      }
    },
    handleUpdateField(field, val, item) {
      const data = {}
      data[field] = val
      this.$store.dispatch('updateProject', { id: item.id, data })
    },
  },
}
