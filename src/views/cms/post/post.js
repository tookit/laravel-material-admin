import { VAutocomplete, VImg } from 'vuetify/lib'
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
          text: 'Image',
          value: 'images',
          render: (item) => {
            return this.$createElement(VImg, {
              class: 'ma-2',
              props: {
                src: item.images ? item.images[0] : '',
                height: 50,
                width: 50,
              },
            })
          },
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
          text: 'Supplier',
          value: 'supplier.name',
          render: (item) => {
            return this.$createElement(
              'a',
              {
                domProps: {
                  target: '_blank',
                  href: item.supplier.url,
                },
              },
              item.supplier.name
            )
          },
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
    ...mapGetters(['getPlatformList', 'getSupplierCategory']),
    dataSource() {
      return (q) => {
        return this.$store.dispatch('fetchSupplierItemList', q)
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
