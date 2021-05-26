import FormTask from './FormTask'
import { VAutocomplete } from 'vuetify/lib'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      headers: [
        {
          text: 'id',
          value: 'id',
        },
        {
          text: 'Project',
          value: 'project.name',
        },
        {
          text: 'name',
          value: 'name',
          width: 250,
        },
        {
          text: 'owner',
          value: 'owner',
        },
        {
          text: 'status',
          value: 'status',
          width: 150,
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
        return this.$store.dispatch('fetchTask', q)
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
        component: FormTask,
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
        component: FormTask,
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
      this.$store.dispatch('updateTask', { id: item.id, data })
    },
  },
}
