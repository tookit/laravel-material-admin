import FormCmsCategory from './FormCmsCategory'
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
          icon: 'mdi-trash',
          click: this.handleDeleteItem,
        },
      ],
    }
  },
  computed: {
    dataSource() {
      return (q) => {
        return this.$store.dispatch('fetchPostCategory', q)
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
        component: FormCmsCategory,
        data: {
          item: null,
        },
        on: {
          'form:cancel': () => {
            dialog.hide()
          },
        },
      })
      dialog.show()
    },
    handleEditItem(item) {
      const dialog = this.$root.$dialog
      dialog.loadComponent({
        component: FormCmsCategory,
        data: {
          item: item,
        },
        on: {
          'form:cancel': () => {
            dialog.hide()
          },
        },
      })
      dialog.show()
    },
    handleDeleteItem(item) {
      if (window.confirm('Are you sure to delete this ?')) {
        this.$store.dispatch('deletePostCategory', item.id)
      }
    },
  },
}
