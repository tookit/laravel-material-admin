import { VAutocomplete, VChip } from 'vuetify/lib'
import { mapGetters } from 'vuex'
import FormUser from './FormUser'
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
          text: 'username',
          value: 'username',
          sortable: false,
        },
        {
          text: 'email',
          value: 'email',
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
    ...mapGetters(['getPostCategory']),
    dataSource() {
      return (q) => {
        return this.$store.dispatch('fetchUser', q)
      }
    },
    filterItems() {
      return [
        {
          element: VAutocomplete,
          transform: (val) => parseInt(val),
          cols: 4,
          props: {
            name: 'category_id',
            items: this.getPostCategory,
            itemText: 'name',
            itemValue: 'id',
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
        component: FormUser,
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
        component: FormUser,
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
        this.$store.dispatch('deletePost', item.id).then(() => {
          this.$refs.grid.fetchRecords()
        })
      }
    },
  },
}
