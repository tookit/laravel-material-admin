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
          text: 'gender',
          value: 'gender',
          sortable: true,
        },
        {
          text: 'Flag',
          value: 'flag_label',
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
    }
  },
  computed: {
    ...mapGetters(['getUserFlags', 'getUserGenders']),
    dataSource() {
      return (q) => {
        return this.$store.dispatch('fetchUser', q)
      }
    },
    filterItems() {
      return [
        {
          element: VAutocomplete,
          cols: 4,
          props: {
            name: 'flag',
            items: this.getUserFlags,
            itemText: 'text',
            itemValue: 'text',
          },
        },
        {
          element: VAutocomplete,
          cols: 4,
          props: {
            name: 'gender',
            items: this.getUserGenders,
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
