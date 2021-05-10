import { VAutocomplete, VImg } from 'vuetify/lib'
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
          text: 'Sales',
          value: 'sales',
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
      ],
    }
  },
  computed: {
    dataSource() {
      return (q) => {
        return this.$store.dispatch('fetch', q)
      }
    },
    filterItems() {
      return [
        {
          element: VAutocomplete,
          transform: (val) => parseInt(val),
          cols: 4,
          props: {
            name: 'platform_id',
            items: this.getPlatformList,
            itemText: 'name',
            itemValue: 'id',
          },
        },
        {
          element: VAutocomplete,
          transform: (val) => parseInt(val),
          cols: 4,
          props: {
            name: 'category_id',
            items: this.getSupplierCategory,
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
        component: FormTask,
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
  },
}
