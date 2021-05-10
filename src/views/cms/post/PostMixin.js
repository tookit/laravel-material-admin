import { VAutocomplete } from 'vuetify/lib'
import { mapGetters } from 'vuex'
import FormPost from './FormPost'
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
          width: 250,
          render: (item) => {
            return this.$createElement(
              'a',
              {
                domProps: { href: item.url, target: '_blank' },
              },
              item.name
            )
          },
        },
        {
          text: 'Category',
          value: 'category.name',
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
        return this.$store.dispatch('fetchPost', q)
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
        component: FormPost,
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
        component: FormPost,
        data: {
          item: item,
        },
        'form:cancel': () => {
          dialog.hide()
        },
        'form:success': () => {
          this.$refs.grid.fetchRecords()
          dialog.hide()
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
